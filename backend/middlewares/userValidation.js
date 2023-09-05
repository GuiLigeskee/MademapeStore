const {body} = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({min: 6})
            .withMessage("A senha precisa ter no mínimo 6 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error("As senhas precisam ser iguais.");
                }
                return true;
            }),    
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
    ];
};

const userUpdateValidation = () => {
    return [
        body("password")
            .optional()
            .isLength({ min: 6 })
            .withMessage("A senha precisa de no mínimo 6 caracteres."),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}