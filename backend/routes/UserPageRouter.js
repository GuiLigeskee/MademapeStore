const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Buttons = require("../models/Buttons");

// Routes
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

    // Agora você pode enviar as informações do usuário e seus botões como resposta
    res.status(200).json({ user, buttons });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar informações do usuário e botões" });
  }
});

module.exports = router;
