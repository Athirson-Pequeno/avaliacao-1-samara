const jwt = require('jsonwebtoken')

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido!' })
  }
}

const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({ message: 'Acesso negado!' })
    }
    next()
  }
}

module.exports = { autenticar, autorizar }