const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pong!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   */

  run: async (client, message, args) => {
    message.channel.send({
      content: `🎾Pong: \`${client.ws.ping}ms\``
    });
  }
};
