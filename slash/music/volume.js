const { SlashCommandBuilder } = require('discord.js');
const distube = require('../../client/distube');
const { checkSameInteractionRoom } = require('../../utils/checkSameRoom');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set Volume')
        .addNumberOption((option) => option.setName('value').setDescription('Volume value')),
    category: 'music',
    cooldown: 3,

    async execute(interaction) {
        if (checkSameInteractionRoom(interaction)) return;

        const vol = interaction.options.getNumber(value);

        const queue = distube.getQueue(interaction);
        if (!queue) return interaction.reply('❗ | There is nothing in queue!');

        if (0 > vol || vol > 100) return interaction.reply('Volume can be only from **1** to **100** !');
        if (isNaN(vol)) return interaction.reply(`Current Volume: **${queue.volume}%**`);

        queue.setVolume(vol);
        await interaction.reply(`Volume set to **${vol}** `);
    },
};
