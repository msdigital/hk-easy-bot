require('dotenv').config();
const express = require('express')
const axios = require('axios');
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const apiHandler = require('./apiHandler');

//Initialize server
const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// express Middleware
app.get('/', (req, res) => {
  res.send('Discord Bot is running');
})

// Define the slash command
const commands = [
  {
    name: 'updateroles',
    description: 'Force user role updates',
  }
];

// Discord client event handler
client.once('ready', async () => {
  client.user.setActivity({ name: 'mit sich selbst!', type: 'PLAYING' });
  console.log('Connection established as ' + client.user.tag);

  try {
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, process.env.DISCORD_GUILD_ID),
      { body: commands },
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    // Reply with a message if they don't have permission
    await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    return;
  }

  const { commandName } = interaction;

  if (commandName === "updateroles") {
    await updateRoles();
    await interaction.reply('Will do, Master!');
  }
});

async function updateRoles() {
  try {
    const data = await apiHandler.fetchFromAPI();
    console.log('should update roles here');
    //do stuff
  }
  catch (error) {
    console.error('Error in updateRoles:', error);
  }
}

// Update Roles set by an Intervall
//setInterval(updateRoles, 1000 * 60 * 60);

// Discord client login
client.login(process.env.DISCORD_TOKEN);

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});