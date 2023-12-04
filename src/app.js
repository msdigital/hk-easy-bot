// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express"); // Express framework for building the web server
const discordBot = require("./modules/discord/bot");

// Initialize the Express server
const app = express();

// Express Middleware setup
// Define a route handler for the root URL to check if the server is running
app.get("/", (req, res) => {
  // Send a response indicating the bot is running
  res.send("Discord Bot is running");
});

// Log in to Discord with the bot token from environment variables
discordBot.login();

// Start the Express server
// Use the PORT environment variable, or default to 3000 if it's not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log the port the server is running on
  console.log(`Server running on port ${PORT}`);
});
