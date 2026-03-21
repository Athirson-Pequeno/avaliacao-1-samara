const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ---- REGISTRO ----

const registrar = async (req, res) => {
  const { nome, email, senha, confirmsenha, role } = req.body;

  // Verifica se as senhas coincidem
  if (senha !== confirmsenha) {
    return res.status(400).json({ message: "As senhas não coincidem!" });
  }

  // Verifica se o email já está cadastrado
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ message: "Email já cadastrado!" });
  }

  // Criptografa a senha
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = new Usuario({
    nome,
    email,
    senha: senhaCriptografada,
    role
  });

  await novoUsuario.save();

  res.status(201).json({ message: "Usuário registrado com sucesso!" });
};


// ---- LOGIN ----

const login = async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o usuário existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  // Verifica se a senha está correta
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(400).json({ message: "Senha incorreta!" });
  }

  //token JWT
  const token = jwt.sign(
    { id: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login realizado com sucesso!",
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  });
};

module.exports = { registrar, login };