const { Events, EmbedBuilder } = require("discord.js");
const client = require("..");
const { formatString } = require("../utils/formatString");
const { randomHexColor } = require("../utils/randomHexColor");

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const selected = interaction.values[0];

  const directories = [...new Set(client.commands.map((cmd) => cmd.dir))];
  const categories = directories.map((dir) => {
    const getCommands = client.commands
      .filter((cmd) => cmd.dir === dir)
      .map((cmd) => {
        return {
          name: cmd.name,
          description: cmd.description || "There is no description for this command!"
        };
      });
    return {
      directory: formatString(dir),
      commands: getCommands
    };
  });

  const category = categories.find((x) => x.directory.toLowerCase() === selected);

  const categoryEmbed = new EmbedBuilder()
    .setTitle(`${formatString(selected)} commands`)
    .setDescription(`A list of all the commands categorized under ${selected}`)
    .setColor(randomHexColor())
    .addFields(
      category.commands.map((cmd) => {
        return {
          name: `\`${cmd.name}\``,
          value: cmd.description,
          inline: true
        };
      })
    );
  interaction.update({ embeds: [categoryEmbed] });
});
