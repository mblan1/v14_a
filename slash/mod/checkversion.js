const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkversion')
        .setDescription('Check package version')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption((option) =>
            option.setName('package').setDescription('Package name').setRequired(true).addChoices(
                {
                    name: '@discordjs/opus',
                    value: '@discordjs/opus',
                },
                {
                    name: '@discordjs/voice',
                    value: '@discordjs/voice',
                },
                {
                    name: '@distube/soundcloud',
                    value: '@distube/soundcloud',
                },
                {
                    name: 'distube',
                    value: 'distube',
                },
                {
                    name: 'ytdl-core',
                    value: 'ytdl-core',
                },
            ),
        ),

    countdown: 5,
    category: 'mod',

    async execute(interaction) {
        const package = interaction.options.getString('package');

        exec(`npm show ${package} version`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                interaction.reply('An error occurred while checking the package version.');
                return;
            }

            if (stderr) {
                console.error(`Command stderr: ${stderr}`);
                interaction.reply('An error occurred while checking the package version.');
                return;
            }

            const version = stdout.trim();
            interaction.reply(`The latest version of **${package}** is \`${version}\`.`);
        });
    },
};
