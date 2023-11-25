require('dotenv').config();
const express = require('express')
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//Initialize server
const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// express Middleware
app.get('/', (req, res) => {
  res.send('Discord Bot is running');
})

// // Discord client event handler
client.once('ready', () => {
  client.user.setActivity({ name: 'mit sich selbst!', type: 'PLAYING' });
  console.log('Connection established as ' + client.user.tag);
})

// // Discord client login
client.login(process.env.DISCORD_TOKEN);

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});