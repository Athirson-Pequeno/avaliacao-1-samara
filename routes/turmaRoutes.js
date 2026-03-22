const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, turmaController.obterTodasTurmas);
router.post("", autenticar, autorizar("professor"), turmaController.criarTurma);
router.delete("/:id", autenticar, autorizar("professor"), turmaController.deletarTurma);
router.put("/:id", autenticar, autorizar("professor"), turmaController.editarTurma);

module.exports = router;