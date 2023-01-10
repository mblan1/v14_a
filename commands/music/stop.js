const { Client, Message } = require("discord.js");
const distube = require("../../client/distube");
const { checkSameRoom } = require("../../utils/checkSameRoom");

module.exports = {
  name: "stop",
  description: "Stop queue and leave",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   * @returns
   */

  run: async (client, message, args) => {
    if (checkSameRoom(message)) return;
    const queue = distube.getQueue(message);
    if (!queue) return message.reply("❌ | There is nothing playing!");

    queue.stop();
    message.channel.send("🛑 | Leaving....");
  }
};
