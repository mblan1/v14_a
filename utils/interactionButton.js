const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const stop = new ButtonBuilder().setCustomId('stop').setStyle(ButtonStyle.Danger).setEmoji('⏹️');
const next = new ButtonBuilder().setCustomId('nextSong').setEmoji('⏭️').setStyle(ButtonStyle.Secondary);
const prev = new ButtonBuilder().setCustomId('prevSong').setEmoji('⏮️').setStyle(ButtonStyle.Secondary);
const pauseOrResume = new ButtonBuilder().setCustomId('pauseOrResumeSong').setEmoji('⏯️').setStyle(ButtonStyle.Primary);
const loopQueue = new ButtonBuilder()
    .setCustomId('loopQueue')
    .setEmoji('🔁')
    .setStyle(ButtonStyle.Primary)
    .setLabel('Queue');
const loopTrack = new ButtonBuilder()
    .setCustomId('loopTrack')
    .setEmoji('🔂')
    .setStyle(ButtonStyle.Primary)
    .setLabel('Track');
const asdVolume = new ButtonBuilder()
    .setCustomId('asdVolume')
    .setEmoji('🔊')
    .setLabel('+10')
    .setStyle(ButtonStyle.Success);
const descVolume = new ButtonBuilder()
    .setCustomId('descVolume')
    .setEmoji('🔉')
    .setLabel('-10')
    .setStyle(ButtonStyle.Success);

const loopQueueBtn = new ActionRowBuilder().addComponents(loopQueue);
const loopTrackBtn = new ActionRowBuilder().addComponents(loopTrack);
const pauseOrResumeBtn = new ActionRowBuilder().addComponents(pauseOrResume);
const inAndDeVolume = new ActionRowBuilder().addComponents(descVolume, asdVolume);
const musicBtn1 = new ActionRowBuilder().addComponents(descVolume, prev, pauseOrResume, next, asdVolume);
const musicBtn2 = new ActionRowBuilder().addComponents(loopTrack, loopQueue, stop);

module.exports = { musicBtn1, musicBtn2, inAndDeVolume, pauseOrResumeBtn, loopTrackBtn, loopQueueBtn };
