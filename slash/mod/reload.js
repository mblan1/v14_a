const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getSlashCommands } = require('../../utils/getSlashCommands');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload slash Command')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('command')
                .setDescription('The command to reload')
                .setRequired(true)
                .addChoices(...getSlashCommands()),
        ),
    category: 'mod',
    cooldown: 5,

    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.interactions.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

        try {
            interaction.client.interactions.delete(command.data.name);
            const newCommand = require(`../${command.category}/${command.data.name}.js`);
            interaction.client.interactions.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(
                `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
            );
        }
    },
};
