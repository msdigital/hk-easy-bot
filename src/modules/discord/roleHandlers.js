const Member = require("./../../models/member");
const roleMappings = require("./roleMappings.json");

/**
 * Processes and updates roles for a list of members.
 * @param {Member[]} members - An array of Member instances to process roles for.
 */
exports.updateRoles = async function (members) {
  for (const member of members) {
    await processMemberRoles(member);
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
    // Implement logic to update Discord roles for the member
  } else {
    console.log("- No matching roles");
    return;
  }
}
