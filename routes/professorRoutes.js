const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, autorizar("professor"), professorController.obterTodosProfessores);
router.post("", autenticar, autorizar("professor"), professorController.criarProfessor);
router.delete("/:id", autenticar, autorizar("professor"), professorController.deletarProfessor);
router.put("/:id", autenticar, autorizar("professor"), professorController.editarProfessor);

module.exports = router;