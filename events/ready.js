const { ActivityType, Events } = require('discord.js');
const client = require('..');

const { prefix } = process.env;
client.once(Events.ClientReady, async () => {
    process.setMaxListeners(0);
    const guilds = client.guilds.cache;
    guilds.forEach((g) => console.log(`Guild name: ${g.name}`));

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
