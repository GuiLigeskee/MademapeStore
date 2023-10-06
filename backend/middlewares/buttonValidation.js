const { body } = require("express-validator");

const buttonInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título deve ser uma string"),
    body("colorTitle")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do título"),
    body("backgroundColor")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do botão"),
    body("format")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha o formato do botão"),
    body("icon")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha um ícone para o botão"),
    body("url")
      .not()
      .equals("undefined")
      .withMessage("A URL é obrigatória")
      .isString()
      .withMessage("A URL deve ser uma string"),
  ];
};

const buttonUpdateValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório"),
    body("colorTitle")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do título"),
    body("backgroundColor")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do botão"),
    body("format")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha o formato do botão"),
    body("icon")
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha um ícone para o botão"),
    body("url")
      .not()
      .equals("undefined")
      .withMessage("A URL é obrigatória")
      .isString()
      .withMessage("A URL é obrigatória"),
  ];
};

module.exports = {
  buttonInsertValidation,
  buttonUpdateValidation,
};
