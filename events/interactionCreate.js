const { EmbedBuilder, Events } = require('discord.js');
const client = require('..');
const { formatString } = require('../utils/formatString');
const { randomHexColor } = require('../utils/randomHexColor');

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.isStringSelectMenu()) return;

    // handle slash command
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

    // dropdown menu
    const selected = interaction.values[0];

    const directories = [...new Set(client.commands.map((cmd) => cmd.dir))];
    const categories = directories.map((dir) => {
        const getCommands = client.commands
            .filter((cmd) => cmd.dir === dir)
            .map((cmd) => {
                return {
                    name: cmd.name,
                    description: cmd.description || 'There is no description for this command!',
                };
            });
        return {
            directory: formatString(dir),
            commands: getCommands,
        };
    });

    const category = categories.find((x) => x.directory.toLowerCase() === selected);

    const categoryEmbed = new EmbedBuilder()
        .setTitle(`${formatString(selected)} commands`)
        .setDescription(`A list of all the commands categorized under ${selected}`)
        .setColor(randomHexColor())
        .addFields(
            category.commands.map((cmd) => {
                return {
                    name: `\`${cmd.name}\``,
                    value: cmd.description,
                    inline: true,
                };
            }),
        );
    interaction.update({ embeds: [categoryEmbed] });
});
