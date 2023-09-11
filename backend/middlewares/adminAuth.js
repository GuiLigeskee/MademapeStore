const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Middleware para autenticação e autorização
const adminAuthMiddleware = (req, res, next) => {
  // Obtenha o token do cabeçalho da solicitação
  const token = req.header("x-auth-token");

  // Verifique se o token não está presente
  if (!token) {
    return res.status(401).json({ error: "Token de autenticação ausente." });
  }

  try {
    // Verifique e decodifique o token
    const decoded = jwt.verify(token, jwtSecret);

    // Adicione o usuário ou administrador decodificado à solicitação
    req.user = decoded;

    // Verifique se o usuário é o mesmo ou é um administrador
    if (req.params.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso não autorizado." });
    }

    next(); // Continue para a próxima função de middleware ou rota
  } catch (error) {
    res.status(401).json({ error: "Token de autenticação inválido." });
  }
};

module.exports = adminAuthMiddleware;
