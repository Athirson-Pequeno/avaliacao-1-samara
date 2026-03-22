const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, disciplinaController.obterTodasDisciplinas);
router.post("", autenticar, autorizar("professor"), disciplinaController.criarDisciplina);
router.delete("/:id", autenticar, autorizar("professor"), disciplinaController.deletarDisciplina);
router.put("/:id", autenticar, autorizar("professor"), disciplinaController.editarDisciplina);

module.exports = router;