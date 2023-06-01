const { Client, Message, EmbedBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const { SelectMenuBuilder } = require('@discordjs/builders');
const fs = require('fs');

const { randomHexColor } = require('../../utils/randomHexColor');

module.exports = {
    name: 'help',
    description: 'Show All Bot Commands',

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String} args
     */

    run: async (client, message, args) => {
        const directories = [...new Set(message.client.commands.map((cmd) => cmd.dir))];

        const emojis = {
            bot: '🤖',
            music: '🎵',
        };

        const dirDescription = {
            bot: 'Bot Commands',
            music: 'Music Player Commands',
        };
        const formatString = (str) => {
            return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        };

        const categories = directories.map((dir) => {
            const getCommands = message.client.commands
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

        const embed = new EmbedBuilder()
            .setDescription('Please choose a category in the dropdown menu!')
            .setColor(randomHexColor());

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId('help_menu')
                    .setPlaceholder('Please select a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: {
                                    name: emojis[cmd.directory.toLowerCase() || null],
                                },
                            };
                        }),
                    ),
            ),
        ];

        const initialMessage = await message.reply({
            embeds: [embed],
            components: components(false),
        });

        setTimeout(() => {
            initialMessage.edit({
                components: components(true),
            });
        }, 10000);
    },
};
