const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role:  { type: String, enum: ["aluno", "professor"], default: "aluno" }
});

module.exports = mongoose.model("Usuario", usuarioSchema);