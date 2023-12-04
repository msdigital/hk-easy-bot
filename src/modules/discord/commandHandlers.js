const commandConfig = require("./commands.json");
const roleHandlers = require("./roleHandlers");

/**
 * Asynchronously retrieves the list of command configurations.
 * This function returns the command configuration defined in commands.json.
 *
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
  const command = commandConfig.find((cmd) => cmd.name === commandName);

  switch (commandName) {
    case "updateroles":
      await commandUpdateRoles(interaction);
      break;
    case "healthcheck":
      await commandHealtchcheck(interaction);
      break;
    default:
      await interaction.reply("Ohaa, das habe ich nicht verstanden!");
      break;
  }
};

/**
 * Handler for the 'updateroles' command.
 * @param {Interaction} interaction The interaction object from Discord.js.
 */
async function commandUpdateRoles(interaction) {
  await interaction.reply("Updating roles...");
  await roleHandlers.updateRoles();
}

/**
 * Handler for the 'healthcheck' command.
 * @param {Interaction} interaction The interaction object from Discord.js.
 */
async function commandHealtchcheck(interaction) {
  await interaction.reply("I'm alive and kicking!");
}
