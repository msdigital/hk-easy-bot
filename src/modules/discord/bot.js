const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commandConfig = require("./commands.json");
const roleMappings = require('./roleMappings.json');
const easyVerein = require('../easyVerein/apiHandler')
const Member = require("./../../models/member");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

client.once("ready", async () => {
  client.user.setActivity({ name: "mit sich selbst!", type: "PLAYING" });
  console.log("Connection established as " + client.user.tag);

  try {
    await updateRoles();
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_GUILD_ID), { body: commandConfig });
    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const command = commandConfig.find(cmd => cmd.name === commandName);

  if (command) {
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
  }
});

async function commandUpdateRoles (interaction) {
  await interaction.reply("Will do, Master!");
  await updateRoles();
};

async function commandHealtchcheck (interaction) {
  await interaction.reply("I'm alive and kicking!");
}

async function updateRoles() {
  try {
    easyVerein
      .fetchFromApi()
      .then((response) => response.map((memberData) => new Member(memberData)))
      .then((members) => {
        members.forEach((member) => {
          console.log("check member", member.name);
          // skip if member is in no group yet
          if (!member.groups || member.groups.length === 0) {
            return;
          }

          // map groups to discord roles
          const mappedRoles = member.groups.map((group) => roleMappings.mappings[group.short] || null).filter((id) => id);
          mappedRoles.push(roleMappings.defaultRole);

          if (mappedRoles.length > 0 && member.discordTag != null) {
            // update DiscordRole for Member
            console.log("- roles", mappedRoles);
          } else {
            // skip if no matching discord role was found
            console.log("- no matching roles");
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

exports.login = function() {
  client.login(process.env.DISCORD_TOKEN);
}