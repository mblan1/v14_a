const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { checkSameInteractionRoom } = require('../../utils/checkSameRoom');
const googleTTS = require('google-tts-api');
const distube = require('../../client/distube');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('speak')
        .setDescription('Text to Speech')
        .addStringOption((option) => option.setName('text').setDescription('Content').setRequired(true)),
    cooldown: 5,
    category: 'bot',

    async execute(interaction) {
        const text = interaction.options.getString('text');

        try {
            // check if playing music
            const queue = distube.getQueue(interaction);
            if (queue) return interaction.reply('Bot is playing music | to cancel playing `/stop`');

            // join voiceChannel
            if (checkSameInteractionRoom(interaction)) return;

            const voiceChannel = interaction.member.voice.channel;
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            const audioPlayer = createAudioPlayer();
            connection.subscribe(audioPlayer);

            const ttsUrl = googleTTS.getAudioUrl(text, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
            });

            const resource = createAudioResource(ttsUrl);
            audioPlayer.play(resource);

            // auto leave room
            // audioPlayer.on('stateChange', (oldState, newState) => {
            //     if (newState.status === 'idle') {
            //         connection.destroy();
            //     }
            // });

            await interaction.reply('TTS started! ');
            await interaction.deleteReply();
        } catch (error) {
            console.log(error);
            await interaction.reply('An error occurred while playing text-to-speech.');
        }
    },
};
