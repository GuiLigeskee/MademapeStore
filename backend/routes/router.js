const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/button", require("./ButtonsRoutes"));
router.use("/api/page", require("./UserPageRouter"));

module.exports = router;
