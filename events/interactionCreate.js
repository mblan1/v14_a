const { Events, EmbedBuilder, Collection } = require('discord.js');
const client = require('..');
const { formatString } = require('../utils/formatString');
const { randomHexColor } = require('../utils/randomHexColor');

const { cooldowns } = client;

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        // handle slash command
        const command = interaction.client.interactions.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // cool down
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timeStamps = cooldowns.get(command.data.name);
        const defaultTine = 3;
        const cooldownAmount = (command.cooldown ?? defaultTine) * 1000;

        if (timeStamps.has(command.data.name)) {
            const expirationTime = timeStamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expirationTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                    ephemeral: true,
                });
            }
        }
        timeStamps.set(interaction.user.id.now);
        setTimeout(() => {
            timeStamps.delete(interaction.user.id);
        }, cooldownAmount);

        try {
            // execute command
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }
    }
    // handle dropdown select menu
    else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'help_menu') {
            const selected = interaction.values[0];

            // get all dirs and remove duplicate dir
            const directories = [...new Set(client.commands.map((cmd) => cmd.dir))];

            // get command file
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

            // embed
            const selectedCategory = categories.find((x) => x.directory.toLowerCase() === selected);

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(selected)} commands`)
                .setDescription(`A list of all the commands categorized under **${formatString(selected)}**`)
                .setColor(randomHexColor())
                .addFields(
                    selectedCategory.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    }),
                );
            interaction.update({ embeds: [categoryEmbed] });
        }
    }
    // handler music player button
    else if (interaction.isButton()) {
        try {
            if (interaction.customId === 'stop') {
                interaction.reply('u pressed stop button');
            }
        } catch (e) {
            console.log(e);
        }
    }
});
