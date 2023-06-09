const { Message, Client } = require('discord.js');
const { getSlashCommands } = require('../../utils/getSlashCommands');

module.exports = {
    name: 'ping',
    description: 'Pong!',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String} args
     */

    run: async (client, message, args) => {
        getSlashCommands();
        message.channel.send({
            content: `🎾Pong: \`${client.ws.ping}ms\``,
        });
    },
};
