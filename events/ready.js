const { ActivityType } = require("discord.js");
const client = require("..");

const { prefix } = process.env;
client.on("ready", async () => {
  client.user.setPresence({
    activities: [
      {
        name: `${prefix}help`,
        type: ActivityType.Listening
      }
    ],
    status: "online"
  });
  console.log(`${client.user.username} is up and ready to go!`);
});
