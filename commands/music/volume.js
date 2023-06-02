const { Client, Message } = require('discord.js');
const distube = require('../../client/distube');
const { checkSameRoom } = require('../../utils/checkSameRoom');

module.exports = {
    name: 'volume',
    description: 'Set music volume',

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String} args
     */

    run: async (client, message, args) => {
        if (checkSameRoom(message)) return;
        const queue = distube.getQueue(message);
        if (!queue) return message.reply('❌ | There is nothing playing!');

        const vol = args[0];
        const intVol = parseInt(vol);
        if (isNaN(intVol) || 0 > intVol || 100 < intVol)
            return message.reply('❗ | Input must be a number from 0 - 100');
        queue.setVolume(intVol);
        message.channel.send(`✅ | Volume set to **${intVol}%**`);
    },
};
