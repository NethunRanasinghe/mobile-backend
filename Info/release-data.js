// controllers/userController.js
const User = require("../model/user");
const bcrypt = require("bcrypt");


// User registration
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Here you might set a session or a JWT token for the user
    // For now, just return the user object
    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update user information
const updateUser = async (req, res) => {
  const { id, username, email } = req.body; // Assuming you're sending the user ID for updating

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// User logout (for simplicity, we will just send a success message)
const logout = (req, res) => {
  // Here you might destroy the user's session or token
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { signup, login, updateUser, changePassword, logout };
