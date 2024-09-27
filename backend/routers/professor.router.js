const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professor.controller");
const { authJwt } = require("../middlewares");

// POST : http://localhost:5000/api/v1/professors/
// Create a professor
router.post(
  "/",
  // [authJwt.verifyToken, authJwt.isAdminOrMod],
  professorController.create
);

// Get All professors
router.get("/", professorController.getAll);

// Get a professor by ID
router.get("/:id", [authJwt.verifyToken], professorController.getById);

// Update a professor by ID
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  professorController.update
);

// Delete a professor by ID
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  professorController.delete
);

module.exports = router;
