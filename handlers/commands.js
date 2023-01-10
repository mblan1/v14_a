const fs = require("fs");
const client = require("..");

module.exports = () => {
  let count = 0;
  fs.readdirSync("./commands").map((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith(".js"));
    for (var command of commands) {
      const cmd = require(`../commands/${dir}/${command}`);
      const properties = { dir, ...cmd };
      if (cmd.name) {
        console.log(command + ".....✅");
        count++;
        client.commands.set(cmd.name, properties);
      } else {
        console.log(command + "-----❌");
        continue;
      }
    }
  });
  console.log(count + " command(s) is ready!");
};
