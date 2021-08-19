const Discord = require("discord.js")
module.exports = (client, message) => {

    let args = message.content.trim().split(/ +/g);

    let stability = args[2]
    if(!client.config.stabilityList.includes(stability)) return message.channel.send(`la stabilité ${stability} n'existe pas`)

    if(stability === "stable") VarStable = "✅ stable"
    if(stability === "unhandled") VarStable = "🟩 unhandled"
    if(stability === "instable") VarStable = "❌ instable"

    let StableMap = client.commands.filter(stb => stb.config.stable === VarStable).map(cmd => cmd.config.name).join(', ')
    let StableArray = client.commands.filter(stb => stb.config.stable === VarStable).map(cmd => cmd.config.name)

    let embed = new Discord.MessageEmbed()
    .setTitle("HELP :")
    .setURL("https://callmekitsu.jimdofree.com/projets/shimi/")
    .setColor(client.config.EmColor)
    .setThumbnail(client.user.avatarURL())
    .addField(`${stability} :`, StableMap)
    .addField(`nombre de commandes :`, `${StableArray.length} commandes "${stability}"`)

    message.channel.send(embed)
}