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
    this.contactId = memberData.contactDetails?.id || null; // Optional Chaining
    this.name = memberData.contactDetails?.name || "Unknown"; // Standardwert
    this.username = memberData.emailOrUserName || "Unknown"; // Standardwert
    this.gamerName = this.getCustomFieldValue(memberData.customFields, process.env.EASY_API_GAMER_NAME_FIELD);
    this.discordTag = this.getCustomFieldValue(memberData.customFields, process.env.EASY_API_DISCORD_TAG_FIELD);
    
    // Überprüfen, ob memberGroups existiert und ein Array ist
    this.groups = Array.isArray(memberData.memberGroups)
      ? memberData.memberGroups.map((group) => ({
          short: group.memberGroup.short,
          name: group.memberGroup.name,
        }))
      : []; // Standardwert: leeres Array

    this.resignationDate = memberData.resignationDate || null; // Standardwert
  }

  /**
   * Extracts the value of a custom field by its ID.
   * @param {Array} customFields - Array of custom fields.
   * @param {number|string} fieldId - The ID of the custom field to extract the value from.
   * @returns {string|null} The value of the custom field, or null if not found.
   */
  getCustomFieldValue(customFields, fieldId) {
    // Überprüfen, ob customFields definiert und ein Array ist
    if (!Array.isArray(customFields)) {
      console.warn(`Custom fields are not defined or not an array.`);
      return null; // Wenn keine benutzerdefinierten Felder vorhanden sind, gib null zurück
    }

    const numericFieldId = typeof fieldId === "string" ? parseInt(fieldId, 10) : fieldId;
    const field = customFields.find((f) => f.customField.id === numericFieldId);
    return field ? field.value : null; // Gib den Wert des benutzerdefinierten Feldes zurück oder null
  }
}
