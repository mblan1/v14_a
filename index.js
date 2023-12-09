// const http = require("http");

// http.createServer((_, res) => res.end(`Bot is ready!`)).listen(8080)

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
require('dotenv').config();

const fs = require('fs');

const { token } = process.env;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
    ],
});

module.exports = client;

// collection
client.commands = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

// handlers
const handlers = fs.readdirSync('./handlers');
handlers.map((handle) => require(`./handlers/${handle}`)(client));

client.login(token);
