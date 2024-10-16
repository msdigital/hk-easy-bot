const Member = require("./../../models/member");
const roleMappings = require("./roleMappings.json");

/**
 * Processes and updates roles for a list of members.
 * @param {Client} client - The Discord client instance.
 * @param {Member[]} members - An array of Member instances to process roles for.
 */
exports.updateRoles = async function (client, members) {
  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
  console.log('Caching started');
  
  await guild.members.fetch();
  console.log('Caching done');

  for (const member of members) {
    if (!member.groups || member.groups.length === 0) continue;

    const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short]).filter((id) => id);
    mappedRoles.push(roleMappings.defaultRole); // Always include the default role
    console.log(member.name);

    if (mappedRoles.length > 0 && member.discordTag != null) {
      console.log("- Discord:", member.discordTag);
      console.log("- Roles:", mappedRoles);
      
      const dcMember = guild.members.cache.find(m => m.user.tag === member.discordTag);
      if (dcMember) {
        // Update roles for the Discord member
        try {
          await dcMember.roles.set(mappedRoles);
          console.log(`Updated roles for ${member.name} (${member.discordTag}):`, mappedRoles);
        } catch (error) {
          console.error(`Failed to update roles for ${member.name}:`, error);
        }
      } else {
        console.log("- Discord member not found.");
      }
    } else {
      console.log("- No matching roles or Discord tag is null.");
    }
  }
};

/**
 * Processes and updates roles for a single member.
 * @param {Member} member The member whose roles need to be updated.
 */
async function processMemberRoles(member) {
  if (!member.groups || member.groups.length === 0) return;

  const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short]).filter((id) => id);
  mappedRoles.push(roleMappings.defaultRole); // Always include the default role
  console.log(member.name);

  if (mappedRoles.length > 0 && member.discordTag != null) {
    console.log("- Discord:", member.discordTag);
    console.log("- Roles:", mappedRoles);
    // Logic to update roles can be implemented here if needed.
  } else {
    console.log("- No matching roles");
  }
}
