const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Listening,
        text: "Comandos",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "BOT Rodando",
        status: "dnd",
      },
    ];

    const option = Math.floor(Math.random() * options.length);

    client.user
      .setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
  };
};
