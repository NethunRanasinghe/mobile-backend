// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db"); // Adjust path as necessary
const userRoutes = require("./routes/userRoutes"); // Import user routes
const clubRoutes = require("./routes/clubdetails");
const councilRoutes = require("./routes/councildetails");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes); // Use user routes
// Use club routes
app.use("/v1/api/club", clubRoutes);
app.use("/v1/api/district", councilRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
