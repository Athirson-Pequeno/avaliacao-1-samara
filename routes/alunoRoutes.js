const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, autorizar("professor"), alunoController.obterTodosAlunos);
router.post("", autenticar, autorizar("professor"), alunoController.criarAluno);
router.delete("/:id", autenticar, autorizar("professor"), alunoController.deletarAluno);
router.put("/:id", autenticar, autorizar("professor"), alunoController.editarAluno);

module.exports = router;