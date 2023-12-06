const easyVereinApi = require("../easyVerein/api");
const discordBot = require("../discord/bot");
const eventManager = require("../lib/eventManager");

/**
 * Handler for 'discord:command:updateroles' event
 */
eventManager.on("discord:command:updateroles", async (interaction) => {
  await interaction.reply("Initiating role update...");
  try {
    const members = await easyVereinApi.getMembers();
    discordBot.updateDiscordUserRoles(transformMembersToDiscordFormat(members));
    await interaction.followUp("Roles updated successfully.");
  } catch (error) {
    console.error("Error during 'discord:updateroles':", error);
    await interaction.followUp("Failed to update roles.");
  }
});

/**
 * Handler for 'discord:command:healthcheck' event
 */
eventManager.on("discord:command:healthcheck", async (interaction) => {
  console.log("I'm alive and kicking");
  await interaction.reply("I'm alive and kicking!");
});

function transformMembersToDiscordFormat(members) {
  console.log("transformMembersToDiscordFormat");
  return members;
  // Transformation logic
}