// AdminController.js
const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const adminPass = process.env.ADMINS_PASSWORD;

// Função para listar todos os usuários
const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

const adminRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifique se já existe um administrador com o mesmo nome de usuário
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(422).json({ error: "Nome de usuário já em uso." });
    }

    // Crie um hash da senha
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Verifique se a senha fornecida coincide com a senha predefinida
    const passwordMatch = bcrypt.compare(password, adminPass);

    if (!passwordMatch) {
      return res.status(422).json({ error: "Senha inválida." });
    }

    // Crie um novo administrador
    const newAdmin = await Admin.create({
      username,
      password: passwordHash,
    });

    // Crie um token JWT para o administrador recém-registrado
    const token = jwt.sign({ id: newAdmin._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o administrador." });
  }
};

// Função para fazer login de um administrador
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifique se o administrador existe no banco de dados
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ error: "Administrador não encontrado." });
    }

    // Verifique se a senha fornecida coincide com a senha predefinida
    const passwordMatch = bcrypt.compare(password, adminPass);

    if (!passwordMatch) {
      return res.status(422).json({ error: "Senha inválida." });
    }

    // Crie um token JWT para o administrador
    const token = jwt.sign({ id: admin._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login do administrador." });
  }
};

module.exports = {
  listUsers,
  adminLogin,
  adminRegister,
};
