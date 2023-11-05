const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
      }
    }

    const clientId = '';
    const rest = new REST({ version: "9" }).setToken(process.env.token);

    try {
      console.log("Comandos (/) iniciados.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandsArray,
      });

      console.log("Comandos (/) reiniciados.");
    } catch (error) {
      console.error(error);
    }
  };
};
