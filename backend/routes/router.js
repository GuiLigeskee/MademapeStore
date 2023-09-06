const express = require("express");
const router = express();

// test route
router.get("/", (req, res) => {
    res.send("API working!")
})

router.use("/api/users", require("./UserRoutes"));
router.use("/api/button", require("./ButtonsRoutes"));
router.use("/api/userRoutes", require("./UserRoutes"));

module.exports = router;