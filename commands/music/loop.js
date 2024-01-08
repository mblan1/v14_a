const { Client, Message } = require('discord.js');

const distube = require('../../client/distube');
const { redMessage } = require('../../utils/redMessage');
const { checkSameRoom } = require('../../utils/checkSameRoom');

const { prefix } = process.env;

module.exports = {
    name: 'loop',
    description: 'Repeat all queue',

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

        let mode = null;
        let str = args[0];

        // const
        if (!str)
            return message.reply({
                embeds: [
                    redMessage({
                        name: 'Loop Command Usage',
                        msg: `\`${prefix}loop off\`: Stop repeat mode\n\`${prefix}loop song\`: Repeat Current Song\n\`${prefix}loop queue\`: Repeat All queue\n`,
                    }),
                ],
            });

        switch (str) {
            case 'off':
                mode = 0;
            case 'song':
                mode = 1;
                break;
            case 'queue':
                mode = 2;
                break;
        }

        mode = queue.setRepeatMode(mode);
        mode = mode ? (mode === 2 ? 'Repeat Queue' : 'Repeat Song') : 'Off';
        message.reply(`🔁 | Set repeat mode to \`${mode}\``);
    },
};
