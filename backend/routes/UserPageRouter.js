const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Buttons = require("../models/Buttons");
const Page = require("../models/UserPage");

// controllers
const UserPageController = require("../controllers/UserPageController");

// Routes

// Rota de montar a userpage
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Obtém o ID do usuário da URL

    // Primeiro, recupere as informações do usuário
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Em seguida, recupere todos os botões pertencentes a esse usuário
    const buttons = await Buttons.find({ userId }); // Certifique-se de que userId seja uma string válida

    userPage = new Page({ userId });

    // Agora você pode enviar as informações do usuário e seus botões como resposta
    res.status(200).json({ user, buttons });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar informações do usuário e botões" });
  }
});

// Rota para atualizar a página do usuário
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { backgroundImage, nameColor } = req.body;

    // Verifique se a página do usuário existe, com base no userId
    let userPage = await Page.findOne({ userId });

    // Se a página do usuário não existir, crie uma nova
    if (!userPage) {
      userPage = new Page({ userId });
    }

    // Atualize as informações da página do usuário
    if (backgroundImage) {
      userPage.backgroundImage = backgroundImage;
    }

    if (nameColor) {
      userPage.nameColor = nameColor;
    }

    // Salve a página do usuário
    await userPage.save();

    res
      .status(200)
      .json({ message: "Página do usuário atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a página do usuário" });
  }
});

module.exports = router;
