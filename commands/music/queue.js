const { Client, Message, EmbedBuilder } = require("discord.js");
const distube = require("../../client/distube");
const { randomHexColor } = require("../../utils/randomHexColor");

module.exports = {
  name: "queue",
  description: "Display all songs in queue",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   */

  run: async (client, message, args) => {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply("❌ | There is nothing playing!");

    const embed = new EmbedBuilder()
      .setThumbnail(
        message.guild.iconURL({
          forceStatic: true
        })
      )
      .setAuthor({
        name: "Queue"
      })
      .setColor(randomHexColor())
      .setTimestamp()
      .setFooter({
        text: message.author.tag
      });

    queue.songs.map((song, index) => {
      const list = `${index === 0 ? "Playing: " : index}**${song.name}** - \`${
        song.formattedDuration
      }\` | Requested By: ${song.member}`;
      embed.setDescription(list);
    });

    await message.channel.send({
      embeds: [embed]
    });
  }
};
