const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (!args[2]) {
        let InviteServId = args[1]
        if(!args[1]) return message.channel.send("veuillez entrer un ID de serveur.")
        let guild = client.guilds.cache.get(InviteServId);
        if(!guild) return message.channel.send("veuillez entrer un ID valide.")
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
        if(!channel) return message.channel.send("Shimi n'a pas les permissions de créer une invite ici.")
        channel.createInvite()
        .then(invite=> message.channel.send(`discord.gg/${invite.code}`))
    }
    if (args[2] === "save") {
        let InviteServId = args[1]
        if(!args[1]) return message.channel.send("veuillez entrer un ID de serveur.")
        let guild = client.guilds.cache.get(InviteServId);
        if(!guild) return message.channel.send("veuillez entrer un ID valide.")
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
        if(!channel) return message.channel.send("Shimi n'a pas les permissions de créer une invite ici.")
        channel.createInvite()
        .then(invite=>  client.channels.fetch(client.config.invChan) // trouver invChan
        .then(channel => channel.send(`discord.gg/${invite.code}`) ) )

      
    }

}

module.exports.config = {
    name: "invite",
    category: "admin",
    usage: "{guild.ID} [save]",
    stable: "✅ stable",
    description: "envoie une invitation au serveur correspondant",
} 