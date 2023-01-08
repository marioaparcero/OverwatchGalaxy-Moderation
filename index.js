const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
require('dotenv').config();

const fs = require('fs');
const client = new Discord.Client({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"]
});

let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
eventFiles
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const express = require('express');
const app = express();
app.get('/', function (req, res) {
	res.send('Express is running!');
});
app.listen(3000, function () {
	console.log('Express is listening on port 3000!');
});

client.login(process.env['TOKEN']);
