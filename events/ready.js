const { ActivityType, Events } = require('discord.js');
const client = require('..');

const { prefix } = process.env;
client.once(Events.ClientReady, async () => {
    client.user.setPresence({
        activities: [
            {
                name: `${prefix}play`,
                type: ActivityType.Listening,
            },
        ],
        status: 'online',
    });
    console.log(`${client.user.username} is up and ready to go!`);
});
