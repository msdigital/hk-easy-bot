const commandConfig = require("./commands.json");
const eventManager = require("../../lib/eventManager");

/**
 * Asynchronously retrieves the list of command configurations.
 * This function returns the command configuration defined in commands.json.
 * @returns {Promise<Object>} A promise that resolves to the command configuration.
 */
exports.getCommands = async function () {
  return commandConfig;
};

/**
 * Processes a specific command based on the interaction.
 * @param {Interaction} interaction - The interaction to process.
 */
exports.processCommand = async function (interaction) {
  const { commandName } = interaction;

  // Check if the command exists in the command configuration
  const commandExists = commandConfig.some((cmd) => cmd.name === commandName);

  if (commandExists) {
    console.log(`discord:command:${commandName}`);
    // Emit an event using the command name, prefixed with a module identifier
    eventManager.emit(`discord:command:${commandName}`, interaction);
  } else {
    // Handle unknown command
    await interaction.reply("Ohaa, das habe ich nicht verstanden!");
  }
};
