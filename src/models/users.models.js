const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const Users = db.define('users', {
   id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
   },
   username: {
      type: DataTypes.STRING(20),
      allowNull: false
   },
   email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
         isEmail: true
      }
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false
   },
   isConfirmed: {
      type: DataTypes.BOOLEAN,
      field: "is_confirmed",
      defaultValue: false
   }
}, {
   hooks: {
      beforeCreate: (user, options) => {
         const { password } = user;
         const hash = bcrypt.hashSync(password, 10);
         user.password = hash;
      }
   }
});

module.exports = Users;