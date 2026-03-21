const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController.js");

router.get("", turmaController.obterTodasTurmas);
router.post("", turmaController.criarTurma);
router.delete("/:id", turmaController.deletarTurma);
router.put("/:id", turmaController.editarTurma);

module.exports = router;