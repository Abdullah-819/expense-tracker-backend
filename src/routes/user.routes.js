const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  changeName,
  changePassword,
} = require("../controllers/user.controller");

// Protected routes
router.use(authMiddleware);

router.put("/change-name", changeName);
router.put("/change-password", changePassword);

module.exports = router;
