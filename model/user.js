const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path according to your setup

// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure username is unique
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate that the value is an email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database (optional)
// User.sync({ alter: true }) // Use this in development to update the table

module.exports = User;
