const express = require("express");
const router = express.Router();

// controllers
const {
  insertButton,
  deleteButton,
  getUserButtons,
  updateButton,
  counterClicks,
} = require("../controllers/ButtonsController");

// Middleware
const adminAuth = require("../middlewares/adminAuth");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const {
  buttonInsertValidation,
  buttonUpdateValidation,
} = require("../middlewares/buttonValidation");

// Routes
router.get("/:id", adminAuth, getUserButtons);
router.post(
  "/",
  authGuard,
  adminAuth,
  buttonInsertValidation(),
  validate,
  insertButton
);
router.delete("/:id", authGuard, adminAuth, deleteButton);
router.put(
  "/:id",
  authGuard,
  adminAuth,
  buttonUpdateValidation(),
  validate,
  updateButton
);
router.put("/clicks/:id", authGuard, counterClicks);

module.exports = router;
