const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('disconnect').setDescription('Make bot leave current voice room'),

    cooldown: 5,
    category: 'bot',

    async execute(interaction) {
        const voiceConnection = getVoiceConnection(interaction.guildId);

        if (!voiceConnection) return interaction.reply('The bot is not currently in a voice channel.');

        voiceConnection.destroy();
        await interaction.reply('✅ | Disconnected from the voice channel.');
    },
};
