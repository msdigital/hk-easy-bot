const Member = require("./../../models/member");
const roleMappings = require("./roleMappings.json");

/**
 * Processes and updates roles for a list of members.
 * @param {Member[]} members - An array of Member instances to process roles for.
 */
exports.updateRoles = async function (client, members) {
  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
  console.log('Caching started...');
  await guild.members.fetch();
  console.log('Caching done.');

  for (const member of members) {
    if (!member.groups || member.groups.length === 0) continue;

    const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short]).filter((role) => role);
    mappedRoles.push(roleMappings.defaultRole); // Always include the default role
    console.log(member.name);

    if (mappedRoles.length > 0 && member.discordTag != null) {
      console.log("- Discord:", member.discordTag);
      console.log("- Roles:", mappedRoles);
      const dcMember = guild.members.cache.find(m => m.user.tag === member.discordTag);

      if (dcMember) {
        // Update roles
        await dcMember.roles.set(mappedRoles.map(roleName => {
          const role = guild.roles.cache.find(r => r.name === roleName);
          return role ? role.id : null;
        }).filter(roleId => roleId)); // Filter out any null values
        console.log("- Roles updated successfully.");
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
 * @param {Member} member - The member whose roles need to be updated.
 */
async function processMemberRoles(member) {
  if (!member.groups || member.groups.length === 0) return;

  const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short]).filter((role) => role);
  mappedRoles.push(roleMappings.defaultRole); // Always include the default role
  console.log(member.name);

  if (mappedRoles.length > 0 && member.discordTag != null) {
    console.log("- Discord:", member.discordTag);
    console.log("- Roles:", mappedRoles);
    
    const guild = member.guild; // Ensure you have access to the guild
    const dcMember = guild.members.cache.find(m => m.user.tag === member.discordTag);

    if (dcMember) {
      // Update roles
      await dcMember.roles.set(mappedRoles.map(roleName => {
        const role = guild.roles.cache.find(r => r.name === roleName);
        return role ? role.id : null;
      }).filter(roleId => roleId)); // Filter out any null values
      console.log("- Roles updated successfully for individual member.");
    } else {
      console.log("- Discord member not found.");
    }
  } else {
    console.log("- No matching roles or Discord tag is null.");
  }
}
