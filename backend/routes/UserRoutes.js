const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
} = require("../middlewares/userValidation");

// routes
router.post("/register",userCreateValidation(), validate, register);
router.post("/profile", getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
    "/",
    userUpdateValidation(),
    validate,
    update,
);
router.get("/:id", getUserById)

module.exports = router;