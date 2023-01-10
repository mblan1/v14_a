const client = require("..");

const { prefix } = process.env;

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = client.commands.get(cmd.toLowerCase());

  if (!command) return;
  if (command) {
    command.run(client, message, args);
  }
});
