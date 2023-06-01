const { EmbedBuilder } = require('discord.js');
const distube = require('../client/distube');
const client = require('..');
const { randomHexColor } = require('../utils/randomHexColor');

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
        queue.textChannel?.send({
            embeds: [
                embed
                    .setDescription(
                        `Added: **${song.name}**\n\nDuration: \`${song.formattedDuration}\`\n\nRequested By: ${song.user}`,
                    )
                    .setThumbnail(song.thumbnail),
            ],
        });
    })
    .on('playSong', (queue, song) => {
        queue.textChannel?.send({
            embeds: [
                embed
                    .setDescription(
                        `Now Playing: **${song.name}**\n\nDuration: \`${song.formattedDuration}\`\n\nRequested By: ${song.user}`,
                    )
                    .setThumbnail(song.thumbnail),
            ],
        });
    })
    .on('empty', (queue) => {
        queue.textChannel?.send('❗ | All tracks have been played !');
    });
