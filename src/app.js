// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express"); // Express framework for building the web server
const orchestrator = require('./modules/orchestrator');
const process = require("process");

// Initialize the Express server
const app = express();

// Express Middleware setup
// Define a route handler for the root URL to check if the server is running
app.get("/", (req, res) => {
  // Send a response indicating the bot is running
  res.send("Discord Bot is running");
});

// Start the Express server
// Use the PORT environment variable, or default to 3000 if it's not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log the port the server is running on
  console.log(`Server running on port ${PORT}`);

  // Initialize the orchestrator to handle bot commands and events
  orchestrator.init();

  // Graceful shutdown on SIGINT
  process.on("SIGINT", () => {
    console.info("Interrupted");
    process.exit(0);
  });
});
