const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Veja se um casal é compatível.")
    .addUserOption((option) =>
      option
        .setName("usuario1")
        .setDescription("Primeiro usuário")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("usuario2")
        .setDescription("Segundo usuário")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user1 = interaction.options.getUser("usuario1");
    const user2 = interaction.options.getUser("usuario2");

    const compatibility = Math.floor(Math.random() * 100) + 1;

    const shipName = `${user1.username} ❤️ ${user2.username}`;

    const embed = new EmbedBuilder()
      .setTitle(`É o amor...`)
      .setDescription(`${shipName} são ${compatibility}% feitos um pro outro`)
      .setImage('https://imgur.com/Sdgn9lB.png')
      .setColor('Red')
      .setFooter({ text: 'NZ BOT', iconURL: ''});

    const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true 
    });
    
    await message.react('❤️');
  },
};
