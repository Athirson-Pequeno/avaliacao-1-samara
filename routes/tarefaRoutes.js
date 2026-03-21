const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController.js");

router.get("", tarefaController.obterTodasTarefas);
router.post("", tarefaController.criarTarefa);
router.delete("/:id", tarefaController.deletarTarefa);
router.put("/:id", tarefaController.editarTarefa);

module.exports = router;
