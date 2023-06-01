const { SlashCommandBuilder } = require('discord.js');
const client = require('../..');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Ping Bot'),

    async execute(interaction) {
        await interaction.reply(`⏰ | Pong \`${client.ws.ping}ms\`\n\n🎾 | Status ${client.ws.status}`);
    },
};
