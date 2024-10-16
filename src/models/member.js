/**
 * Represents a member with various properties extracted and transformed from member data.
 * This class is used to create a standardized member object from the raw data obtained from an API.
 */
exports.Member = class {
  /**
   * Constructs a member instance from raw member data.
   * @param {Object} memberData - Raw data of a member.
   */
  constructor(memberData) {
    this.id = memberData.id;
    this.memberId = Number(memberData.membershipNumber);
    this.contactId = memberData.contactDetails.id;
    this.name = memberData.contactDetails.name;
    this.username = memberData.emailOrUserName;
    this.gamerName = this.getCustomFieldValue(memberData.customFields, process.env.EASY_API_GAMER_NAME_FIELD);
    this.discordTag = this.getCustomFieldValue(memberData.customFields, process.env.EASY_API_DISCORD_TAG_FIELD);
    this.groups = memberData.memberGroups.map((group) => ({
      short: group.memberGroup.short,
      name: group.memberGroup.name,
    }));
    this.resignationDate = memberData.resignationDate;
  }

  /**
   * Extracts the value of a custom field by its ID.
   * @param {Array} customFields - Array of custom fields.
   * @param {number|string} fieldId - The ID of the custom field to extract the value from.
   * @returns {string|null} The value of the custom field, or null if not found.
   */
  getCustomFieldValue(customFields, fieldId) {
    const numericFieldId = typeof fieldId === "string" ? parseInt(fieldId, 10) : fieldId;
    const field = customFields.find((f) => f.customField.id === numericFieldId);
    return field ? field.value : null;
  }
}
