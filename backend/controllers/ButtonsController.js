const Buttons = require("../models/Button");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertButton = async (req, res) => {
  const { style, color, title, url, acessos, userId, username } = req.body;

  if (!style && !color) {
    res.status(422).json({
      errors: ["É necessário fornecer um estilo e uma cor para criar um botão."],
    });
    return;
  }

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Criar o botão com a contagem inicial de cliques como 0
  const newButton = await Buttons.create({
    style,
    color,
    title,
    url,
    acessos,
    userId: user._id,
    username: user.name,
    clicks: 0,
  });

  // Se o botão foi criado com sucesso, retorne os dados
  if (!newButton) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newButton);
};

// Remover um botão do banco de dados
const deleteButton = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const button = await Buttons.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Verificar se o botão pertence ao usuário
  if (!button.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  await Buttons.findByIdAndDelete(button._id);

  res
    .status(200)
    .json({ id: button._id, message: "Botão excluído com sucesso." });
};

// Obter botões do usuário
const getUserButtons = async (req, res) => {
  const { id } = req.params;

  const buttons = await Buttons.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(buttons);
};

// Obter botão por id
const getButtonById = async (req, res) => {
  const { id } = req.params;

  const button = await Buttons.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  res.status(200).json(button);
};

// Atualizar um botão
const updateButton = async (req, res) => {
  const { id } = req.params;
  const { style, title, url, acessos } = req.body;

  const reqUser = req.user;

  const button = await Buttons.findById(id);

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Verificar se o botão pertence ao usuário
  if (!button.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (style) {
    button.style = style;
  }

  if (color) {
    button.color = color;
  }

  if (icon) {
    button.icon = icon;
  }

  if (title) {
    button.title = title;
  }

  if (url) {
    button.url = url;
  }

  if (acessos) {
    button.acessos = acessos;
  }

  await button.save();

  res.status(200).json({ button, message: "Botão atualizado com sucesso!" });
};

const clickButton = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const button = await Buttons.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Incrementar a contagem de cliques
  button.clicks += 1;

  await button.save();

  res.status(200).json({ clicks: button.clicks });
};

const changeButtonColor = async (req, res) => {
  const { id } = req.params;
  const { color } = req.body;

  const reqUser = req.user;

  const button = await Buttons.findById(id);

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Verificar se o botão pertence ao usuário
  if (!button.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (color) {
    button.color = color;
  }

  await button.save();

  res.status(200).json({ button, message: "Cor de fundo do botão atualizada com sucesso!" });
};

const changeButtonStyle = async (req, res) => {
  const { id } = req.params;
  const { style } = req.body;

  const reqUser = req.user;

  const button = await Buttons.findById(id);

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Verificar se o botão pertence ao usuário
  if (!button.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (style) {
    button.style = style;
  }

  await button.save();

  res.status(200).json({ button, message: "Estilo do botão atualizado com sucesso!" });
};

const changeButtonIcon = async (req, res) => {
  const { id } = req.params;
  const { icon } = req.body;

  const reqUser = req.user;

  const button = await Buttons.findById(id);

  // Verificar se o botão existe
  if (!button) {
    res.status(404).json({ errors: ["Botão não encontrado!"] });
    return;
  }

  // Verificar se o botão pertence ao usuário
  if (!button.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (icon) {
    button.icon = icon;
  }

  await button.save();

  res.status(200).json({ button, message: "Estilo do botão atualizado com sucesso!" });
};




module.exports = {
  insertButton,
  deleteButton,
  getUserButtons,
  getButtonById,
  updateButton,
  clickButton,
  changeButtonColor,
  changeButtonStyle,
  changeButtonIcon
}
