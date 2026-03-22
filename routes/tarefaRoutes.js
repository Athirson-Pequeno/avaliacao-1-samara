const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, tarefaController.obterTodasTarefas);
router.post("", autenticar, autorizar("professor"), tarefaController.criarTarefa);
router.delete("/:id", autenticar, autorizar("professor"), tarefaController.deletarTarefa);
router.put("/:id", autenticar, autorizar("professor"), tarefaController.editarTarefa);

module.exports = router;