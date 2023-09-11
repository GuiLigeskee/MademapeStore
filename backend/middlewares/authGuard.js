// authMiddleware.js
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User"); // Substitua pelo modelo real de usuário
const Admin = require("../models/Admin"); // Substitua pelo modelo real de administrador

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Verifique se header tem um token
  if (!token)
    return res.status(401).json({ error: "Token de autenticação ausente." });

  // Tentar autenticar um usuário comum
  try {
    const verifiedUser = jwt.verify(token, jwtSecret);
    const user = await User.findById(verifiedUser.id).select("-password");

    if (user) {
      req.user = user; // Use o usuário autenticado (usuário comum)
      return next();
    }
  } catch (err) {
    // Se a autenticação do usuário comum falhar, continue para a autenticação do administrador
  }

  // Tentar autenticar um administrador
  try {
    const verifiedAdmin = jwt.verify(token, jwtSecret);
    const admin = await Admin.findById(verifiedAdmin.id);

    if (admin) {
      req.user = admin; // Use o administrador autenticado
      return next();
    }
  } catch (err) {
    // Se a autenticação do administrador falhar, retorne um erro de acesso não autorizado
    return res.status(403).json({ error: "Acesso não autorizado." });
  }

  // Se nenhuma autenticação for bem-sucedida, retorne um erro de acesso não autorizado
  return res.status(403).json({ error: "Acesso não autorizado." });
};

module.exports = authGuard;
