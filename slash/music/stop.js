const { SlashCommandBuilder } = require('discord.js');
const distube = require('../../client/distube');
const { checkSameInteractionRoom } = require('../../utils/checkSameRoom');

module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription('Clear all queue and stop player'),
    category: 'music',
    cooldown: 3,

    async execute(interaction) {
        if (checkSameInteractionRoom(interaction)) return;
        const queue = distube.getQueue(interaction);
        if (!queue) return interaction.reply('❗ | There is nothing in queue!');

        queue.stop();
        await interaction.reply('🛑 | Leaving....');
    },
};
