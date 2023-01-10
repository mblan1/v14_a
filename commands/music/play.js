const { Client, Message } = require("discord.js");
const distube = require("../../client/distube");
const { checkSameRoom } = require("../../utils/checkSameRoom");

module.exports = {
  name: "play",
  description: "Play song/url/playlist",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   */

  run: async (client, message, args) => {
    if (checkSameRoom(message)) return;
    const str = args.join(" ");
    if (!str) return message.reply("❌ | Please enter a song url or query to search.");
    distube.play(message.member.voice.channel, str, {
      member: message.member,
      textChannel: message.channel,
      message
    });
  }
};
