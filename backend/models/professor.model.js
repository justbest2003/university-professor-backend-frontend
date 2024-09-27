const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Define DB Schema
const Professor = sequelize.define("professor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Assuming that each professor has a unique email address
  },
});

Professor.sync({ force: false })
  .then(() => {
    console.log("Table Created or Already Exists");
  })
  .catch((error) => {
    console.log("Error Creating Table:", error);
  });

module.exports = Professor;
