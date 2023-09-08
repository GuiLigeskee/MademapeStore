const { body } = require("express-validator");

const buttonInsertValidation = () => {
  return [
    body("title").isString().withMessage("O título é obrigatório"),
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
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do botão")
      .isString()
      .withMessage("A url é obrigatória"),
  ];
};

const buttonUpdateValidation = () => {
  return [
    body("title").optional().isString().withMessage("O título é obrigatório"),
    body("colorTitle")
      .optional()
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do título"),
    body("backgroundColor")
      .optional()
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do botão"),
    body("format")
      .optional()
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha o formato do botão"),
    body("icon")
      .optional()
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha um ícone para o botão"),
    body("url")
      .optional()
      .not()
      .equals(undefined)
      .withMessage("Por favor, escolha a cor do botão")
      .isString()
      .withMessage("A url é obrigatória"),
  ];
};

module.exports = {
  buttonInsertValidation,
  buttonUpdateValidation,
};
