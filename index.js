const {
    Client,
    GatewayIntentBits,
    ChannelType
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = ".";

client.once("ready", () => {
    console.log(`${client.user.tag} online!`);
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd !== "batman") return;

    if (!message.member.permissions.has("Administrator"))
        return message.reply("Você precisa ser administrador.");

    await message.reply("🦇 **DONO | GB está criando os canais...**");

    const estrutura = [
        {
            categoria: "📌 RECEPÇÃO",
            canais: [
                "📢・avisos",
                "👤・bem-vindo",
                "🔗・url",
                "⚙️・atualizações",
                "📰・rede-sociais"
            ]
        },
        {
            categoria: "❓ FAQ ( LOJA )",
            canais: [
                "⛓️・como-comprar",
                "🌐・site-oficial"
            ]
        },
        {
            categoria: "📌 IMPORTANTE",
            canais: [
                "📜・termos",
                "📊・avaliação-entregues",
                "✅・compras-entregues"
            ]
        },
        {
            categoria: "🎫 TICKET SUPORTE",
            canais: [
                "👥・ticket",
                "🌟・avaliação-ticket"
            ]
        },
        {
            categoria: "🍎 IOS",
            canais: [
                "☕・certificado・gbox",
                "🍎・ffh4x-rage",
                "🍎・proxy-ios",
                "proxy-ios-free"
            ]
        },
        {
            categoria: "🤖 ANDROID NOVA ATUALIZAÇÃO",
            canais: [
                "🥇・m0d・4pk・andr0id",
                "🥇・mod・safe・dripclient",
                "🥇・passador・de・replay・android",
                "proxy-android-fr"
            ]
        }
    ];

    for (const cat of estrutura) {

        let categoria = message.guild.channels.cache.find(c =>
            c.type === ChannelType.GuildCategory &&
            c.name === cat.categoria
        );

        if (!categoria) {
            categoria = await message.guild.channels.create({
                name: cat.categoria,
                type: ChannelType.GuildCategory
            });
        }

        for (const canal of cat.canais) {

            const existe = message.guild.channels.cache.find(c =>
                c.name === canal
            );

            if (!existe) {
                await message.guild.channels.create({
                    name: canal,
                    type: ChannelType.GuildText,
                    parent: categoria.id
                });
            }

        }

    }

    message.channel.send("✅ **Servidor criado com sucesso!**");

});

client.login(process.env.TOKEN);
