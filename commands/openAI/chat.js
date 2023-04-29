const { Client, Message } = require("discord.js");
const openAI = require("../../client/openai");

module.exports = {
  name: "chat",
  description: "Chat with OpenAI",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   */

  run: async (client, message, args) => {
    const str = args.join(" ").trim();

    if (!str) return;

    message.channel.sendTyping();

    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: str
        }
      ]
    });
    message.reply(completion.data.choices[0].message.content);
    try {
    } catch (error) {
      message.channel.send("Something went wrong!");
    }
  }
};
