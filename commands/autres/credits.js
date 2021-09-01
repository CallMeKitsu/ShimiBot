const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let loli = client.users.cache.get("607484530374344705")
    let kimi = client.users.cache.get("724633947358626082")
    let saku = client.users.cache.get("741672617492086866")
    let apo = client.users.cache.get('739038948369760316')
    let way = client.users.cache.get('472748671889571850')

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setURL("https://callmekitsu.jimdofree.com/projets/shimi/credits")
    .setDescription("```merci aux contributeurs :```")
    .addField('Test et Reports :', `${apo.tag}\n${kimi.tag}\n${saku.tag}\n${way.tag}`, true)
    .addField('Database :', `${loli.tag}\n`, true)
    .addField('Plateformes :', `Discord, Jimdo, GitHub`)
    .addField('Modules :', `Discord.js, Time, Moment, Chalk, FileSystem`)
    .addField('APIs :',`Riot, MétéoConcept, RandomFox.ca, DicoLink`)
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