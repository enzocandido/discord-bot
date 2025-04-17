/**
 * Manipulador de eventos do bot
 * Responsável por carregar e registrar todos os eventos do bot
 */

const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handleEvents = async () => {
    try {
      console.log(chalk.blue("[EVENTOS] Iniciando carregamento de eventos..."));

      const eventFolders = fs.readdirSync(`./src/events`);
      let eventCount = 0;

      for (const folder of eventFolders) {
        const eventFiles = fs
          .readdirSync(`./src/events/${folder}`)
          .filter((file) => file.endsWith(".js"));

        console.log(
          chalk.yellow(
            `[EVENTOS] Encontrados ${eventFiles.length} eventos na pasta ${folder}`,
          ),
        );

        switch (folder) {
          case "client":
            for (const file of eventFiles) {
              try {
                const event = require(`../../events/${folder}/${file}`);
                eventCount++;

                if (event.once) {
                  client.once(event.name, (...args) =>
                    event.execute(...args, client),
                  );
                  console.log(
                    chalk.green(
                      `[EVENTOS] Evento once carregado: ${event.name}`,
                    ),
                  );
                } else {
                  client.on(event.name, (...args) =>
                    event.execute(...args, client),
                  );
                  console.log(
                    chalk.green(`[EVENTOS] Evento on carregado: ${event.name}`),
                  );
                }
              } catch (eventError) {
                console.error(
                  chalk.red(`[ERRO] Falha ao carregar evento ${file}:`),
                );
                console.error(eventError);
              }
            }
            break;

          // Outros tipos de eventos podem ser adicionados aqui
          // como eventos de guild, mensagens, etc.

          default:
            console.log(
              chalk.yellow(
                `[EVENTOS] Pasta de eventos não implementada: ${folder}`,
              ),
            );
            break;
        }
      }

      console.log(
        chalk.blue(
          `[EVENTOS] Total de ${eventCount} eventos carregados com sucesso!`,
        ),
      );
    } catch (error) {
      console.error(chalk.red("[ERRO] Falha ao carregar eventos:"));
      console.error(error);
    }
  };
};
