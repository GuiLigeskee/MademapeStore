const Page = require("../models/UserPage");

// Função para atualizar a foto de fundo e a cor do título da página do usuário
const updateUserPage = async (req, res) => {
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
};

module.exports = updateUserPage;
