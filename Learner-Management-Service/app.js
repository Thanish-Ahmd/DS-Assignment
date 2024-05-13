const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Parse JSON request bodies
app.use(express.json());

// Set up your routes


const PORT = process.env.PORT || 8085;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});