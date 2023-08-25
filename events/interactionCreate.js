const distube = require('../client/distube');
const client = require('..');
const { Events, EmbedBuilder, Collection } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const { formatString } = require('../utils/formatString');
const { randomHexColor } = require('../utils/randomHexColor');
const { pauseOrResumeBtn, inAndDeVolume, loopTrackBtn, loopQueueBtn } = require('../utils/interactionButton');

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
            const queue = distube.getQueue(interaction.guildId);
            // stop music
            if (interaction.customId === 'stop') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.stop();
                await interaction.reply('🛑 | Stopped');
            }
            // next 1 song
            else if (interaction.customId === 'nextSong') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.skip();
                await interaction.reply('⏭️ | Skipped');
            }
            // back one song
            else if (interaction.customId === 'prevSong') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.previous();
                await interaction.reply('⏮️ | Back 1 song');
            }
            // handle pause and play
            else if (interaction.customId === 'pauseOrResumeSong') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.paused ? queue.resume() : queue.pause();
                await interaction.reply({
                    content: queue.paused ? '▶️ | Resume song' : '⏸️ | Paused',
                    components: [pauseOrResumeBtn],
                });
                await wait(3000);
                await interaction.editReply({
                    components: [],
                });
            }
            // increase volume
            else if (interaction.customId === 'asdVolume') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                let v = queue.volume;
                if (0 > v || v > 100) {
                    interaction.reply({
                        content: '❗ | Volume can only be setted from **0** to **100%**',
                        ephemeral: true,
                    });
                } else {
                    v += 10;
                    queue.setVolume(v);
                    await interaction.reply({
                        content: `🔊 | Volume **${v}%**`,
                        components: [inAndDeVolume],
                    });
                    await wait(2000);
                    await interaction.deleteReply();
                }
            }
            // decrease volume
            else if (interaction.customId === 'descVolume') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                let vol = queue.volume;
                if (0 > vol || vol > 100) {
                    interaction.reply({
                        content: '❗ | Volume can only be setted from **0** to **100%**',
                        ephemeral: true,
                    });
                } else {
                    vol -= 10;
                    queue.setVolume(vol);
                    await interaction.reply({
                        content: `🔉 | Volume **${vol}%**`,
                        components: [inAndDeVolume],
                    });
                    await wait(2000);
                    await interaction.deleteReply();
                }
            }
            // handle loop button
            else if (interaction.customId === 'loopQueue') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.repeatMode === 0 || queue.repeatMode === 1 ? queue.setRepeatMode(2) : queue.setRepeatMode(0);
                await interaction.reply({
                    content: queue.repeatMode === 2 ? '🔁 | Queue Loop: **On**' : '🔁 | Queue Loop: **Off**',
                    components: [loopQueueBtn],
                });
            }
            //  loop track
            else if (interaction.customId === 'loopTrack') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });
                queue.repeatMode === 0 || queue.repeatMode === 2 ? queue.setRepeatMode(1) : queue.setRepeatMode(0);
                await interaction.reply({
                    content: queue.repeatMode === 1 ? '🔁 | Track Loop: **On**' : '🔁 | Track Loop: **Off**',
                    components: [loopTrackBtn],
                });
            } else if (interaction.customId === 'autoPlay') {
                if (!queue)
                    return interaction.reply({
                        content: '❗ | Queue empty',
                        ephemeral: true,
                    });

                queue.toggleAutoplay();

                await interaction.reply(`✅ | Autoplay: ${queue.autoplay ? '**On**' : '**Off**'}`);
            }
        } catch (e) {
            interaction.reply({
                content: 'Got error with interaction button!',
                ephemeral: true,
            });
            console.log(e);
        }
    }
});
