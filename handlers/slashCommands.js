const { REST, Routes, Events } = require('discord.js');

const AsciiTable = require('ascii-table');

const path = require('node:path');
const fs = require('node:fs');
const client = require('..');

module.exports = () => {
    const commands = [];

    const table = new AsciiTable('Status');

    const foldersPath = path.join(__dirname, '../slash');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                client.interactions.set(command.data.name, command);
                table.addRow(command.data.name, '✅');
            } else {
                table.addRow(command.data.name, '❌');
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // client.once(Events.ClientReady, async () => {
    //     await client.application.commands.set(commands);
    // });

    // REST module
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(Routes.applicationGuildCommands(process.env.ClientID, process.env.GuildID), {
                body: commands,
            });

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // catch and log any errors!
            console.error(error);
        }
    })();

    console.log(table.toString());
};
