const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const distube = require('../../client/distube');
const { randomHexColor } = require('../../utils/randomHexColor');

module.exports = {
    data: new SlashCommandBuilder().setName('queue').setDescription('Display queue'),
    category: 'music',
    countdown: 3,

    async execute(interaction) {
        const queue = distube.getQueue(interaction);
        if (!queue) return interaction.reply('❗ | There is nothing in queue!');

        const embed = new EmbedBuilder()
            .setThumbnail(
                interaction.guild.iconURL({
                    forceStatic: true,
                }),
            )
            .setAuthor({
                name: 'Queue',
            })
            .setColor(randomHexColor())
            .setTimestamp()
            .setFooter({
                text: interaction.member.user.username,
            });

        const list = queue.songs
            .map((song, index) => {
                return `${index === 0 ? 'Playing: ' : `${index}: `}**${song.name}** - \`${
                    song.formattedDuration
                }\` | Requested By: ${song.member}`;
            })
            .join('\n\n');
        embed.setDescription(list);

        await interaction.reply({
            embeds: [embed],
        });
    },
};
