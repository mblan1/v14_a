const { EmbedBuilder } = require("discord.js");

const redMessage = ({ name = "", msg = "" }) => {
  const embed = new EmbedBuilder().setTitle(name).setColor(0xdb474c).setDescription(msg).setTimestamp();
  return embed;
};

module.exports = {
  redMessage
};
