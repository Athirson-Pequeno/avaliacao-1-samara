const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

router.get("", autenticar, perfilController.obterTodosPerfis);
router.post("", autenticar, autorizar("aluno"), perfilController.criarPerfil);
router.delete("/:id", autenticar, autorizar("professor"), perfilController.deletarPerfil);
router.put("/:id", autenticar, autorizar("aluno"), perfilController.editarPerfil);

module.exports = router;