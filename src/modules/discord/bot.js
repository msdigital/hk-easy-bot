const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commandHandlers = require("./commandHandlers");
const roleHandlers = require("./roleHandlers");
const eventManager = require("../../lib/eventManager");

// Initialize the Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Correct intent to fetch guild members
  ],
});
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

/**
 * Event listener for when the bot is ready.
 * Logs the bot's connection status and registers application commands.
 */
client.once("ready", async () => {
  client.user.setActivity({ name: "mit sich selbst!", type: "PLAYING" });
  console.log("Connection established as " + client.user.tag);

  try {
    eventManager.emit('discord:bot:ready');
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
 * Registers application commands when the bot is ready.
 */
eventManager.on("discord:bot:ready", async () => {
  try {
    const commands = await commandHandlers.getCommands();
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_GUILD_ID), { body: commands });
    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error("Error registering application commands:", error);
  }
});

// Export the login function for starting the bot
exports.login = async function () {
  await client.login(process.env.DISCORD_TOKEN);
};

// Export updateDiscordUserRoles function if needed elsewhere
exports.updateDiscordUserRoles = async function (users) {
  console.log("updateDiscordUserRoles");
  await roleHandlers.updateRoles(client, users);
};
