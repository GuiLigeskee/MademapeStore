const Buttons = require("../models/Buttons");
const User = require("../models/User");
const mongoose = require("mongoose");

// insert a button
const insertButton = async (req, res) => {
  const {title, colorTitle, backgroundColor, format, icon, url, clicks} = req.body;
  
  console.log(body);

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  console.log(user.name);

  // create button
  const newButton = await Buttons.create({
    title,
    colorTitle,
    backgroundColor,
    format,
    icon,
    url,
    clicks,
    userId: user._id,
    userName: user.name
  });

  // If user was photo sucessfully, return data.
  if(!newButton) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."]
    });
    return
  }

  res.status(201).json(newButton);
}

// Remove a Button from the DB
const deleteButton = async (req, res) => {
  const {id} = req.params;

  const reqUser = req.user;

  const button = await Buttons.findById(new mongoose.Types.ObjectId(id));

  // check if button exists
  if(!button) {
    res.status(422).json({errors: "Botão não encontrado"});
    return;
  }

  // check if photo belongs to user
  if(!deleteButton.userId.equals(reqUser._id)) {
    res.status(422).json({errors: "Ocorreu um erro, tente novamente mais tarde."})
    return;
  }

  await Buttons.findByIdAndDelete(button._id);

  res.status(200).json({id: button._id, message: "Foto excluída com sucesso!"});
};

// Get user buttons
const getUserButtons = async (req, res) => {
  const {id} = req.params;

  const buttons = await Buttons.find({userId: id})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(buttons);
}

// get Button by Id
const getButtonById = async (req, res) => {
  const {id} = req.params;

  const button = await Buttons.findById(new mongoose.Types.ObjectId(id));

  // check if button exists
  if(!button) {
    res.status(404).json({errors: ["Foto não encontrada."]});
    return;
  }

  res.status(200).json(button);
}

// Update a button
const updateButton = async (req, res) => {
  const {id} = req.params;
  const {title, colorTitle, backgroundColor, format, icon, url, clicks} = req.body;

  const reqUser = req.user;

  const button = await Buttons.findById(id);

  // check if button exists
  if(!button) {
    res.status(404).json({errors: ["Botão não encontrado."]});
    return;
  }

  // check if button belongs to user
  if(!button.userId.equals(reqUser._id)) {
    res.status(422).json({errors: ["Ocorreu um erro, tente novamente mais tarde"]});
    return;
  }

  if(title) {
    button.title = title;
  };

  if(colorTitle) {
    button.colorTitle = colorTitle;
  };

  if(backgroundColor) {
    button.backgroundColor = backgroundColor;
  };
  
  if(icon) {
    button.icon = icon;
  }

  if(format) {
    button.format = format;
  }

  if(url) {
    button.url = url;
  }

  await button.save();

  res.status(200).json({button, message: "Botão atualizado com sucesso!"});
}

// Counter clicks in button
const counterClicks = async (req, res) => {
  const {id} = req.params;
  const reqUser = req.user;
  
  const button = await Buttons.findById(id);

  // Put user in array of likes
  button.clicks.push(reqUser._id);

  await button.save();

  res.status(200).json({buttonId: id, userId: reqUser._id, message: "Botão clicado"});
};

module.exports = {
  insertButton,
  deleteButton,
  getUserButtons,
  getButtonById,
  updateButton,
  counterClicks,
}