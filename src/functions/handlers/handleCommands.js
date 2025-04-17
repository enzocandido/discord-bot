/**
 * Manipulador de comandos do bot
 * Responsável por carregar e registrar todos os comandos slash do bot
 */

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    try {
      console.log(
        chalk.blue("[COMANDOS] Iniciando carregamento de comandos..."),
      );

      // Verifica se existe clientId configurado
      const clientId = process.env.CLIENT_ID;
      if (!clientId) {
        throw new Error("CLIENT_ID não está definido no arquivo .env");
      }

      // Obtém todas as pastas de categorias de comandos
      const commandFolders = fs.readdirSync("./src/commands");
      let commandCount = 0;

      // Para cada pasta de categoria, carrega os comandos
      for (const folder of commandFolders) {
        const commandFiles = fs
          .readdirSync(`./src/commands/${folder}`)
          .filter((file) => file.endsWith(".js"));

        console.log(
          chalk.yellow(
            `[COMANDOS] Encontrados ${commandFiles.length} comandos na categoria ${folder}`,
          ),
        );

        const { commands, commandsArray } = client;

        // Para cada arquivo de comando na categoria
        for (const file of commandFiles) {
          try {
            const command = require(`../../commands/${folder}/${file}`);

            // Verifica se o comando tem as propriedades necessárias
            if (!command.data || !command.execute) {
              console.log(
                chalk.red(
                  `[ERRO] O comando ${file} está faltando propriedades obrigatórias 'data' ou 'execute'`,
                ),
              );
              continue;
            }

            // Registra o comando nas coleções
            commands.set(command.data.name, command);
            commandsArray.push(command.data.toJSON());
            commandCount++;

            console.log(
              chalk.green(`[COMANDOS] Comando carregado: ${command.data.name}`),
            );
          } catch (commandError) {
            console.error(
              chalk.red(`[ERRO] Falha ao carregar comando ${file}:`),
            );
            console.error(commandError);
          }
        }
      }

      console.log(
        chalk.blue(
          `[COMANDOS] Total de ${commandCount} comandos carregados localmente`,
        ),
      );

      // Se não houver comandos para registrar, encerra
      if (commandCount === 0) {
        console.log(
          chalk.yellow(
            "[COMANDOS] Nenhum comando para registrar na API do Discord",
          ),
        );
        return;
      }

      // Registra os comandos na API do Discord
      const rest = new REST({ version: "9" }).setToken(process.env.token);

      try {
        console.log(
          chalk.yellow(
            "[COMANDOS] Iniciando registro de comandos na API do Discord...",
          ),
        );

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandsArray,
        });

        console.log(
          chalk.green(
            `[COMANDOS] ${commandCount} comandos registrados com sucesso na API do Discord!`,
          ),
        );
      } catch (apiError) {
        console.error(
          chalk.red("[ERRO] Falha ao registrar comandos na API do Discord:"),
        );
        console.error(apiError);
      }
    } catch (error) {
      console.error(chalk.red("[ERRO] Falha no manipulador de comandos:"));
      console.error(error);
    }
  };
};
