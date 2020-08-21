const { DataTypes } = require("sequelize");
const studentDb = require("../config/studentDb");
const { hash } = require("../utils/hash");

const Admin = studentDb.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hash(value));
    }
  }
});

module.exports = Admin;
