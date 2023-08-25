const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const distube = require('../client/distube');
const { randomHexColor } = require('../utils/randomHexColor');
const { musicBtn1, musicBtn2 } = require('../utils/interactionButton');
const client = require('..');

const embed = new EmbedBuilder()
    .setAuthor({
        name: 'Music Player',
    })
    .setColor(randomHexColor())
    .setFooter({
        text: 'Music Player By Snow',
    });

distube
    .on('addSong', (queue, song) => {
        queue.textChannel?.send(`✅ | Added track to queue: **${song.name}** - \`${song.formattedDuration}\``);
    })
    .on('playSong', async (queue, song) => {
        let repeatModeName;
        switch (queue.repeatMode) {
            case 1:
                repeatModeName = 'Track';
                break;
            case 2:
                repeatModeName = 'Queue';
                break;
            default:
                repeatModeName = 'Off';
                break;
        }
        const message = await queue.textChannel?.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: 'Music Player',
                    })
                    .setColor(randomHexColor())
                    .setFooter({
                        text: 'Music Player By Snow',
                    })
                    .setDescription(`Now Playing: **[${song.name}](${song.url})**`)
                    .setThumbnail(song.thumbnail)
                    .addFields(
                        {
                            name: 'Requested By',
                            value: `${song.user}`,
                            inline: true,
                        },
                        {
                            name: 'Duration',
                            value: `\`${song.formattedDuration}\``,
                            inline: true,
                        },
                        {
                            name: 'Volume',
                            value: `\`${queue.volume}%\``,
                            inline: true,
                        },
                    )
                    .addFields(
                        {
                            name: 'RepeatMode',
                            value: `\`${repeatModeName}\``,
                        },
                        {
                            name: 'Auto Play',
                            value: `${queue.autoplay ? '`On`' : '`Off`'}`,
                            inline: true,
                        },
                    )
                    .setTimestamp(),
            ],
            components: [musicBtn1, musicBtn2],
        });
        distube
            .on('finishSong', async (queue, song) => {
                await message.edit({
                    components: [],
                });
            })
            .on('deleteQueue', (queue) => {
                message.edit({
                    components: [],
                });
            });
    })

    .on('addList', (queue, playlist) => {
        queue.textChannel?.send({
            embeds: [
                embed
                    .setDescription(
                        `🎶 | Added Playlist: **${playlist.name}**\n\nLength: \`${playlist.songs.length}\`\n\nDuration: \`${playlist.formattedDuration}\``,
                    )
                    .setThumbnail(playlist.thumbnail),
            ],
        });
    })
    .on('empty', (queue) => {
        queue.textChannel?.send('❗ | Leaving !');
    });
