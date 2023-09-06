const express = require("express");
const router = express.Router();

// Controllers
const getUserById = require("../controllers/UserController");
const getUserButtons = require("../controllers/ButtonsController");

// Middlewares
const {imageUpload} = require("../middlewares/imageUpload");

// Routes
router.get("/buttons/:id", getUserButtons);
router.get("/:id", imageUpload.single("profileImage"), getUserById);

module.exports = router;