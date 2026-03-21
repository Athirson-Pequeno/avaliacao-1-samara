const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController.js");

router.get("", professorController.obterTodosProfessores);
router.post("", professorController.criarProfessor);
router.delete("/:id", professorController.deletarProfessor);
router.put("/:id", professorController.editarProfessor);

module.exports = router;