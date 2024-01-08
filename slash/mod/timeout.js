const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Time out member')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption((user) => user.setName('user').setDescription('User').setRequired(true))
        .addNumberOption((option) =>
            option.setName('time').setDescription('CoolDown Time (minutes)').setMinValue(1).setRequired(true),
        )
        .addStringOption((option) => option.setName('reason').setDescription('Reason').setRequired(true))
        .addBooleanOption((option) => option.setName('notify').setDescription('Notify Member with DM')),
    category: 'mod',
    countdown: 5,
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const CDTime = interaction.options.getNumber('time');
        const reason = interaction.options.getString('reason');
        const isNotify = interaction.options.getBoolean('notify');

        try {
            const msDuration = CDTime * 60 * 1000;
            user.timeout(msDuration, reason);
            isNotify && user.send(`You have been muted!\n**Time**: \`${CDTime} minutes\`\n**Reason**: \`${reason}\``);
            interaction.reply({
                content: `Timed Out ${user}`,
                ephemeral: true,
            });
        } catch (e) {
            console.log(e);
            interaction.reply('Something went wrong with TimeOut command !');
        }

        console.log(CDTime);
    },
};
