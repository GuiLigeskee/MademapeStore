const express = require("express");
const router = express.Router();

// Controllers
const {
  listUsers,
  adminLogin,
  adminRegister,
} = require("../controllers/AdminController");

// Middlewares
const authGuard = require("../middlewares/authGuard");

// routes
router.get("/users", listUsers);
router.post("/login", adminLogin);
router.post("/register", adminRegister);

module.exports = router;
