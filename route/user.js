// routes/userRoutes.js
const express = require("express");
const { signup, login,changePassword, logout } = require("../controller/user");
const router = express.Router();

// User routes
router.post("/signup", signup);
router.post("/login", login);
router.put("/update", updateUser); // Update user information
router.put("/change-password", changePassword); // Change password
router.post("/logout", logout); // Logout user

module.exports = router;
