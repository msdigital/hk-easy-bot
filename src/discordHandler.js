const { Client, GatewayIntentBits, PermissionsBitField, GuildMemberRoleManager } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const apiHandler = require("./apiHandler");
const Member = require("./models/member");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

// Commands
const commands = [
  {
    name: "updateroles",
    description: "Force user role updates",
  },
];

const defaultDiscordRoleId = "HarleKings";

const groupRoleMapping = {
  HK1: "Bronze",
  HK2: "Silber",
  HK3: "Gold",
  HK4: "Platin",
};

//Login method to "start" the bot
function login(token) {
  client.login(token);
}

//Event Handler: if the bot is logged in, registered the commands and is ready to do things
client.once("ready", async () => {
  //wouldn't be funny if the bot
  client.user.setActivity({ name: "mit sich selbst!", type: "PLAYING" });
  console.log("Connection established as " + client.user.tag);

  await updateRoles();

  try {
    //try to register commands
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_GUILD_ID), { body: commands });

    console.log("Successfully registered application commands.");
  } catch (e) {
    console.error("Error registering commands:", e);
  }
});

// Event Handler: interactionCreate eg. slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return; //check if is slash command

  //check if user has permission to change roles
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    // Reply with a message if they don't have permission
    await interaction.reply({
      content: "You do not have permission to use this command.",
      ephemeral: true,
    });
    return;
  }

  //get command name
  const { commandName } = interaction;

  //check if command matches
  switch (commandName) {
    case "updateroles":
      await interaction.reply("Will do, Master!");
      await updateRoles();
      break;
    default:
      await interaction.reply("Ohaa, das habe ich nicht verstanden!");
      break;
  }
});

/**
 * updating Discord Roles according to the easyVerein groups
 */
async function updateRoles() {
  try {
    apiHandler
      .fetchFromApi()
      .then(response => response.map(memberData => new Member(memberData)))
      .then(members => {
        members.forEach((member) => {
          // skip if member is in no group yet
          if (!member.groups || member.groups.length === 0) {
            return;
          }

          // map groups to discord roles
          const mappedRoles = member.groups.map((group) => groupRoleMapping[group.short] || null).filter((id) => id);
          mappedRoles.push(defaultDiscordRoleId);

          if (mappedRoles.length > 0 && member.discordTag != null) {
            // update DiscordRole for Member
            // await updateDiscordRoles(member, mappedRoles);
            console.log('update roles for', member.discordTag);
          } else {
            // skip if no matching discord role was found
            return;
          }
        });
      });
    console.log("should have updated roles here");
    //do stuff
  } catch (e) {
    //catching exceptions
    console.error("Error in updateRoles:", e);
  }
}

module.exports = { login };
