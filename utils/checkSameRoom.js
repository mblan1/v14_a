const checkSameRoom = (message) => {
    if (!message.member.voice.channel)
        return message.reply({
            content: `❌ |  You're not in a voice channel !`,
            ephemeral: true,
        });

    if (
        message.guild.members.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.members.me.voice.channel.id
    )
        return message.reply({
            content: `❌ | - You are not in the same voice channel with Bot !`,
            ephemeral: true,
        });
};

const checkSameInteractionRoom = (interaction) => {
    if (!interaction.member.voice.channel)
        return interaction.reply({
            content: `❌ |  You're not in a voice channel !`,
            ephemeral: true,
        });

    if (
        interaction.guild.members.me.voice.channel &&
        interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id
    )
        return interaction.reply({
            content: `❌ | - You are not in the same voice channel with Bot !`,
            ephemeral: true,
        });
};

module.exports = { checkSameRoom, checkSameInteractionRoom };
