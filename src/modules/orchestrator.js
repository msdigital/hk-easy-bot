const easyVereinApi = require("./easyVerein/api");
const discordBot = require("./discord/bot");
const eventManager = require("../lib/eventManager");

exports.init = async function () {
  await discordBot.login();

  /**
   * Handler for 'discord:command:updateroles' event
   */
  eventManager.on("discord:command:updateroles", async (interaction) => {
    await interaction.reply("Initiating role update...");
    try {
      const members = await easyVereinApi.getMembers();
      const transformedMembers = transformMembersToDiscordFormat(members);
      await discordBot.updateDiscordUserRoles(transformedMembers);
      await interaction.editReply("Roles updated successfully.");
    } catch (error) {
      console.error("Error during 'discord:command:updateroles':", error);
      await interaction.editReply("Failed to update roles.");
    }
  });

  /**
   * Handler for 'discord:command:healthcheck' event
   */
  eventManager.on("discord:command:healthcheck", async (interaction) => {
    await interaction.reply("I'm alive and kicking!");
  });
}

/**
 * Transforms members to the format needed for Discord role updates.
 * @param {Array} members - An array of Member instances.
 * @returns {Object[]} - An array of transformed members for Discord.
 */
function transformMembersToDiscordFormat(members) {
  console.log("Transforming members to Discord format");
  return members.map(member => ({
    discordTag: member.discordTag,
    roles: member.groups.map(group => group.short)
  }));
}
