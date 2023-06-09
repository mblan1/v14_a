const { readdirSync } = require('node:fs');

function getSlashCommands() {
    const command = [];
    readdirSync('./slash').map((dir) => readdirSync(`./slash/${dir}`).map((file) => command.push(file)));

    const choices = command.map((cmd) => {
        const cmdName = cmd.replace('.js', '');
        return {
            name: cmdName,
            value: cmdName,
        };
    });
    return choices;
}

module.exports = {
    getSlashCommands,
};
