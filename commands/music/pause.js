const { Client, Message } = require("discord.js");
const distube = require("../../client/distube");

const { checkSameRoom } = require("../../utils/checkSameRoom");
module.exports = {
  name: "pause",
  description: "Pause current song",

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
    if (queue.paused) {
      return message.reply("❗ | Current song is already stopped");
    }

    queue.pause();
    message.channel.send("⏸️ | Stopped current song!");
  }
};
