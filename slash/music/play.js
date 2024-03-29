const { SlashCommandBuilder } = require('discord.js');
const { checkSameInteractionRoom } = require('../../utils/checkSameRoom');
const distube = require('../../client/distube');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play Song')
        .addStringOption((option) => option.setName('song').setDescription('name or url').setRequired(true)),
    category: 'music',
    countdown: 3,

    async execute(interaction) {
        const input = interaction.options.getString('song');
        if (checkSameInteractionRoom(interaction)) return;

        await interaction.reply(`Searching for: **${input}**`);

        try {
            await distube.play(interaction.member.voice.channel, input, {
                member: interaction.member,
                textChannel: interaction.channel,
            });
        } catch (error) {
            console.log(error);
            await interaction.followUp('There was an error while playing the song.');
        }
    },
};
