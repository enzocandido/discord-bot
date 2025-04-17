/**
 * Um bot Discord multifuncional
 * Desenvolvido por Enzo Candido
 */

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();
const { token } = process.env;

// Importa os módulos necessários do discord.js
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const fs = require("fs");

// Configuração do cliente Discord com as permissões necessárias
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Inicializa as coleções para armazenar comandos
client.commands = new Collection();
client.commandsArray = [];

/**
 * Função que gerencia e alterna o status de presença do bot
 * Executa a cada intervalo definido no evento ready
 */
client.pickPresence = async () => {
  // Opções de status disponíveis
  const options = [
    {
      type: ActivityType.Playing,
      text: "comandos /",
      status: "online",
    },
    {
      type: ActivityType.Watching,
      text: "seu servidor",
      status: "idle",
    },
    {
      type: ActivityType.Listening,
      text: "seus pedidos",
      status: "dnd",
    },
  ];

  // Escolhe uma opção aleatória
  const option = Math.floor(Math.random() * options.length);

  // Define a presença do bot
  client.user.setPresence({
    activities: [
      {
        name: options[option].text,
        type: options[option].type,
      },
    ],
    status: options[option].status,
  });
};

/**
 * Carrega todos os manipuladores de funções
 * Cada manipulador é responsável por uma parte do funcionamento do bot
 */
const functionFolders = fs.readdirSync("./src/functions/");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  console.log(
    `[HANDLER] Carregando ${functionFiles.length} arquivos da pasta ${folder}`,
  );

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Inicialização do bot
console.log("[INICIALIZAÇÃO] Iniciando bot...");

// Carrega eventos e comandos
client.handleEvents();
client.handleCommands();

// Conecta ao Discord
client
  .login(token)
  .then(() => {
    console.log("[INICIALIZAÇÃO] Bot conectado com sucesso!");
  })
  .catch((error) => {
    console.error("[ERRO] Falha ao conectar:");
    console.error(error);
  });
