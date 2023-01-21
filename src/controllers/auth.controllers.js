const AuthServices = require('../services/auth.services');

const register = async (req, res) => {
   try {
      const user = req.body;
      const result = await AuthServices.register(user);

      //reglas de negocio
      if (result) {
         res.status(201).json({ message: "User created" })
      } else {
         res.status(400).json({ message: "Something wrong" });
      }

   } catch (error) {
      res.status(400).json(error.message);
   }
}

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const result = "";
      //valido que tenga mail y password con un ternario
      !email
         ? res.status(400).json({
            error: "missing data..",
            message: "not email provided"
         })
         : (!password
            ? res.status(400).json({
               error: "missing data..",
               message: "not password provide"
            })
            : (
               result = await AuthServices.login({ email, password })
            ))

      if (result.isValid) {
         const { username, email, id } = result.user;
         const userData = { username, email, id };
         const token = AuthServices.genToken(userData);
         result.user.token = token;
         res.json(result.user);
      }

   } catch (error) {
      res.status(400).json({ message: "Something wrong.." });
   }
}


module.exports = {
   register,
   login
}