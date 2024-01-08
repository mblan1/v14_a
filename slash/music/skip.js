const { SlashCommandBuilder } = require('discord.js');
const { checkSameInteractionRoom } = require('../../utils/checkSameRoom');
const distube = require('../../client/distube');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to next song')
        .addNumberOption((option) => option.setName('position').setDescription('Song position you want jump to')),
    countdown: 3,
    category: 'music',

    async execute(interaction) {
        if (checkSameInteractionRoom(interaction)) return;
        const position = interaction.options.getNumber('position');

        const queue = distube.getQueue(interaction);
        if (!queue) return interaction.reply('❗ | There is nothing in queue!');

        if (position > 0) {
            await distube.jump(interaction, position).then((song) => {
                interaction.reply(`⏭️ | Skipped to **${song.name}**`);
            });
        } else {
            try {
                const song = await queue.skip();
                interaction.reply(`⏭️ | Skipped! Now Playing **${song.name}**`);
            } catch (e) {
                interaction.reply(`${e}`);
            }
        }
    },
};
