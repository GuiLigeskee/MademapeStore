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
const authGuard = require("../middlewares/authGuard");
const {imageUpload} = require("../middlewares/imageUpload");

// routes
router.post("/register",userCreateValidation(), validate, register);
router.post("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
    "/",
    authGuard,
    userUpdateValidation(),
    validate,
    imageUpload.single("profileImage"),
    update,
);
router.get("/:id", getUserById)

module.exports = router;