const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController.js");

router.get("", disciplinaController.obterTodasDisciplinas);
router.post("", disciplinaController.criarDisciplina);
router.delete("/:id", disciplinaController.deletarDisciplina);
router.put("/:id", disciplinaController.editarDisciplina);

module.exports = router;