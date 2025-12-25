const router = require("express").Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const { getMe, updateMe } = require("../controllers/user.controller");

router.get("/me", jwtAuthMiddleware, getMe);
router.put("/me", jwtAuthMiddleware, updateMe);

module.exports = router;
