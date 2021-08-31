const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let loli = client.users.cache.get("607484530374344705")
    let kimi = client.users.cache.get("724633947358626082")
    let saku = client.users.cache.get("741672617492086866")

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setURL("https://callmekitsu.jimdofree.com/projets/shimi/credits")
    .addField(loli.tag, `pour la recherche des gifs`, true)
    .addField(kimi.tag, 'pour la recherche des gifs', true)
    .addField(saku.tag, 'pour le test des commandes')
    .setThumbnail(client.user.avatarURL())
    message.channel.send (embed)
}

module.exports.config = {
    name: "credits",
    category: "autres",
    usage: "",
    stable: "✅ stable",
    description: "remerciements aux contributeurs du bot",
}