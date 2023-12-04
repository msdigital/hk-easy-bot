const easyVerein = require("../easyVerein/apiHandler");
const Member = require("./../../models/member");
const roleMappings = require("./roleMappings.json");

/**
 * Updates roles for all members based on the API data.
 */
exports.updateRoles = async function () {
  try {
    const members = await fetchMembers();
    for (const member of members) {
      await processMemberRoles(member);
    }
  } catch (error) {
    console.error("Error in updateRoles:", error);
  }
};

/**
 * Fetches members data from the API and creates Member instances.
 */
async function fetchMembers() {
  const membersData = await easyVerein.fetchFromApi();
  return membersData.map((memberData) => new Member(memberData));
}

/**
 * Processes and updates roles for a single member.
 * @param {Member} member The member whose roles need to be updated.
 */
async function processMemberRoles(member) {
  if (!member.groups || member.groups.length === 0) return;

  const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short]).filter((id) => id);
  mappedRoles.push(roleMappings.defaultRole); // Always include the default role

  if (mappedRoles.length > 0 && member.discordTag != null) {
    // Implement logic to update Discord roles for the member
    console.log(member.name);
    console.log("- Discord:", member.discordTag);
    console.log("- Roles:", mappedRoles);
  } else {
    console.log("- No matching roles");
    return;
  }
}
