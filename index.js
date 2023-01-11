const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

require('events').EventEmitter.defaultMaxListeners = 0
// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.MessageContent,
	],
})

const { EventHandler, CommandHandler } = require('./handlers')
const deployCommands = require('./deployCommands')
CommandHandler(path, fs, client, Collection)
EventHandler(path, fs, client)

deployCommands()

// Login to Discord with your client's token
client.login(process.env.TOKEN)
