const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (!args[2]) {
        let InviteServId = args[1]
        let guild = client.guilds.cache.get(InviteServId);
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
        channel.createInvite()
        .then(invite=> message.channel.send(`discord.gg/${invite.code}`))
    }
    if (args[2] === "save") {
        let InviteServId = args[1]
        let guild = client.guilds.cache.get(InviteServId);
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
        channel.createInvite()
        .then(invite=>  client.channels.fetch(client.config.invChan) // trouver invChan
        .then(channel => channel.send(`discord.gg/${invite.code}`) ) )

      
    }

}

module.exports.config = {
    name: "invite",
    category: "admin",
    usage: "{guild.ID} [save]",
    stable: "🟩 unhandled",
    description: "envoie une invitation au serveur correspondant",
} 