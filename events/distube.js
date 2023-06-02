const { EmbedBuilder } = require('discord.js');
const distube = require('../client/distube');
const client = require('..');
const { randomHexColor } = require('../utils/randomHexColor');
const { Events } = require('distube');

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
    .on('playSong', (queue, song) => {
        queue.textChannel?.send({
            embeds: [
                embed
                    .setDescription(
                        `Now Playing: **[${song.name}](${song.url})**\n\nDuration: \`${song.formattedDuration}\`\n\nRequested By: ${song.user}`,
                    )
                    .setThumbnail(song.thumbnail),
            ],
        });
    })
    .on(Events.EMPTY, (queue) => {
        queue.textChannel?.send('❗ | All tracks have been played !');
    });
