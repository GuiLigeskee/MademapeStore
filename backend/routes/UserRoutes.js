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
const adminAuth = require("../middlewares/adminAuth");
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// routes
router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, adminAuth, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
  "/update",
  authGuard,
  adminAuth,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", adminAuth, getUserById);

module.exports = router;
