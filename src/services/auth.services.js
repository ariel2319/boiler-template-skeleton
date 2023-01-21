const Users = require('../models/users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthServices {

   static async register(user) {
      try {
         const result = await Users.create(user);
         return result;
      } catch (error) {
         throw error;
      }
   }

   static async login(credentials) {
      try {
         const { email, password } = credentials;
         const user = await Users.findOne({ where: { email } });
         //validar el pass
         if (user) {
            const isValid = bcrypt.compareSync(password, user.password);
            return isValid ? { isValid, user } : { isValid }
         }
         return { isValid: false }
      } catch (error) {
         throw error;
      }
   }

   //recibe info del usuario que queremos guardar en el token
   static  genToken(data) {
      try {
         const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "10m",
            algorithm: "HS512"
         });
         return token;
      } catch (error) {
         throw error;
      }
   }
}

module.exports = AuthServices;