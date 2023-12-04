const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commandHandlers = require("./commandHandlers");
const roleHandlers = require("./roleHandlers");

// Initialize the Discord client with necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

/**
 * Event listener for when the bot is ready.
 * Logs the bot's connection status and registers application commands.
 */
client.once("ready", async () => {
  client.user.setActivity({ name: "mit sich selbst!", type: "PLAYING" });
  console.log("Connection established as " + client.user.tag);

  try {
    await roleHandlers.updateRoles(); // Call to update roles when bot starts
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_GUILD_ID), { body: await commandHandlers.getCommands() });
    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
});

/**
 * Event listener for when an interaction is created.
 * Delegates the interaction to the commandHandlers module.
 */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    await commandHandlers.processCommand(interaction);
  } catch (error) {
    console.error("Error processing interaction:", error);
  }
});

/**
 * Login function to be exported and used externally.
 * Initiates the login process for the Discord client.
 */
exports.login = function () {
  client.login(process.env.DISCORD_TOKEN);
};
