# Bot Discord Multifuncional

Um bot Discord simples e extensível desenvolvido para oferecer uma variedade de comandos úteis e divertidos para seu servidor.

## Funcionalidades

- **Sistema de comandos modular**: Comandos organizados em categorias (ferramentas, diversão, etc.)
- **Status dinâmico**: Alterna automaticamente entre diferentes status
- **Comandos de moderação**: (em desenvolvimento)
- **Comandos divertidos**: Comando ship para descobrir compatibilidade entre usuários
- **Comandos utilitários**: Comando ping para verificar a latência

## Requisitos

- Node.js v16.x ou superior
- NPM v7.x ou superior
- Uma aplicação Discord registrada no [Discord Developer Portal](https://discord.com/developers/applications)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/enzocandido/discord-bot
cd discord-bot
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env`:

```
token=SEU_TOKEN_DO_BOT_AQUI
CLIENT_ID=SEU_CLIENT_ID_DO_BOT_AQUI
```

Para obter estes valores:

- Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
- Selecione sua aplicação (ou crie uma nova)
- O `CLIENT_ID` está na página "General Information" como "Application ID"
- O `token` está na página "Bot" - clique em "Reset Token" para gerar um novo se necessário

4. Inicie o bot:

```bash
npm start
```

## Estrutura do Projeto

```
discord-bot/
├── src/
│   ├── commands/        # Comandos organizados por categoria
│   │   ├── fun/         # Comandos divertidos
│   │   └── tools/       # Comandos utilitários
│   ├── events/          # Manipuladores de eventos Discord
│   │   └── client/      # Eventos do cliente Discord
│   ├── functions/       # Funções utilitárias do bot
│   │   └── handlers/    # Manipuladores para carregar eventos e comandos
│   └── bot.js           # Arquivo principal do bot
├── .env                 # Configurações do ambiente (não comitar!)
├── .gitignore           # Arquivos ignorados pelo git
├── package.json         # Dependências e scripts
└── README.md            # Esta documentação
```

## Comandos Disponíveis

### Diversão

- `/ship [usuario1] [usuario2]` - Verifica a compatibilidade entre dois usuários

### Ferramentas

- `/ping` - Verifica a latência da API e do cliente

## Adicionando Novos Comandos

1. Crie um novo arquivo .js na pasta `src/commands/categoria/`
2. Use a seguinte estrutura como base:

```javascript
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nome-do-comando")
    .setDescription("Descrição do comando"),
  async execute(interaction, client) {
    // Sua lógica aqui
    await interaction.reply("Resposta do comando");
  },
};
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona alguma feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request
