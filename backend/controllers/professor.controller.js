const { where } = require("sequelize");
const Professor = require("../models/professor.model");

// Create and Save a new Professor
exports.create = async (req, res) => {
  const { name, imageUrl, department, position, email } = req.body;

  // Validate Data
  if (!name || !department || !position || !email) {
    return res.status(400).send({
      message: "Name, Department, Position, and Email cannot be empty!",
    });
  }

  try {
    const existingProfessor = await Professor.findOne({ where: { email: email } });
    if (existingProfessor) {
      return res.status(400).send({
        message: "Professor with this email already exists!",
      });
    }

    // Create a Professor
    const newProfessor = {
      name: name,
      imageUrl: imageUrl,
      department: department,
      position: position,
      email: email,
    };
    const professor = await Professor.create(newProfessor);
    res.send(professor);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the professor.",
    });
  }
};

// Get all Professors
exports.getAll = async (req, res) => {
  try {
    const professors = await Professor.findAll();
    res.send(professors);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving professors.",
    });
  }
};

// Get Professor by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).send({
        message: "Professor not found with id " + id,
      });
    }
    res.send(professor);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving the professor.",
    });
  }
};

// Update a Professor
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Professor.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      res.send({
        message: "Professor was updated successfully.",
      });
    } else {
      res.send({
        message:
          "Cannot update Professor with id=" + id + ". Maybe Professor was not found or req.body is empty!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while updating the professor.",
    });
  }
};

// Delete a Professor
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Professor.destroy({ where: { id: id } });
    if (deleted) {
      res.send({
        message: "Professor was deleted successfully.",
      });
    } else {
      res.send({
        message: "Cannot delete Professor with id=" + id + ".",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while deleting the professor.",
    });
  }
};
