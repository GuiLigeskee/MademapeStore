const multer = require("multer");
const path = require("path");

// Configuração do armazenamento para o background image
const backgroundImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Escolha o diretório de destino onde deseja salvar os background images
    const destinationFolder = "uploads/backgrounds/";
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo como a data atual + extensão original
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname);
  },
});

// Middleware Multer para o background image
const backgroundImageUpload = multer({
  storage: backgroundImageStorage,
  fileFilter(req, file, cb) {
    // Verifica se o arquivo é uma imagem com extensão .png ou .jpg
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas imagens PNG ou JPG."));
    }
    cb(null, true);
  },
});

module.exports = { backgroundImageUpload };
