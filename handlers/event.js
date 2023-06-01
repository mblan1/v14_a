const fs = require('fs');

module.exports = async () => {
    let count = 0;
    const events = fs.readdirSync('./events').filter((event) => event.endsWith('.js'));
    events.map((e) => {
        require(`../events/${e}`);
        count++;
    });
    console.log(count + ' event(s) is running!');
};
