const express = require("express");
const router = express.Router();

// controllers
const {
  insertButton,
  deleteButton,
  getUserButtons,
  updateButton,
  counterClicks,
  getCurrentButton,
} = require("../controllers/ButtonsController");

// Middleware
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const {
  buttonInsertValidation,
  buttonUpdateValidation,
} = require("../middlewares/buttonValidation");

// Routes
router.get("/details/:id", getCurrentButton);

router.get("/user/:id", getUserButtons);
router.post(
  "/create",
  authGuard,
  buttonInsertValidation(),
  validate,
  insertButton
);
router.delete("/:id", authGuard, deleteButton);
router.put("/:id", authGuard, buttonUpdateValidation(), validate, updateButton);
router.put("/clicks/:id", counterClicks);

module.exports = router;
