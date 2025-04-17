/**
 * Evento ready do bot
 * Executado quando o bot se conecta com sucesso ao Discord
 */

const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Configura a função para alternar status a cada 10 segundos
    setInterval(client.pickPresence, 10 * 1000);

    // Obtém informações do bot para exibir no console
    const botUsername = client.user.tag;
    const guildCount = client.guilds.cache.size;
    const userCount = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0,
    );

    // Exibe informações formatadas no console
    console.log(chalk.green("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.green(`✅ ${botUsername} está online!`));
    console.log(chalk.green("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.yellow("📊 Estatísticas:"));
    console.log(
      chalk.yellow(
        `👥 Servindo ${userCount} usuários em ${guildCount} servidores`,
      ),
    );
    console.log(chalk.yellow(`🔧 Versão Node.js: ${process.version}`));
    console.log(chalk.yellow(`🏓 Ping atual: ${client.ws.ping}ms`));
    console.log(chalk.green("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));

    // Define um status inicial para o bot
    client.user.setStatus("online");
  },
};
