const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const distube = require('../client/distube');
const { randomHexColor } = require('../utils/randomHexColor');

const embed = new EmbedBuilder()
    .setAuthor({
        name: 'Music Player',
    })
    .setColor(randomHexColor())
    .setFooter({
        text: 'Music Player By Snow',
    });

const stop = new ButtonBuilder().setCustomId('stop').setStyle(ButtonStyle.Danger).setEmoji('⏹️');
const next = new ButtonBuilder().setCustomId('nextSong').setEmoji('⏭️').setStyle(ButtonStyle.Secondary);
const prev = new ButtonBuilder().setCustomId('prevSong').setEmoji('⏮️').setStyle(ButtonStyle.Secondary);
const pauseOrResume = new ButtonBuilder().setCustomId('pauseOrResumeSong').setEmoji('⏯️').setStyle(ButtonStyle.Primary);
const asdVolume = new ButtonBuilder()
    .setCustomId('asdVolume')
    .setEmoji('🔊')
    .setLabel('+10')
    .setStyle(ButtonStyle.Secondary);
const descVolume = new ButtonBuilder()
    .setCustomId('descVolume')
    .setEmoji('🔉')
    .setLabel('-10')
    .setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(descVolume, prev, pauseOrResume, next, asdVolume);
const row2 = new ActionRowBuilder().addComponents(stop);

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
            components: [row1, row2],
        });
    })
    .on('finishSong', (queue, song) => {})
    .on('addList', (queue, playlist) => {
        queue.textChannel?.send({
            embeds: [
                embed
                    .setDescription(
                        `Added Playlist: **${playlist.name}**\n\nLength: \`${playlist.songs.length}\`\n\nDuration: \`${playlist.formattedDuration}\``,
                    )
                    .setThumbnail(playlist.thumbnail),
            ],
        });
    })
    .on('empty', (queue) => {
        queue.textChannel?.send('❗ | All tracks have been played !');
    });
