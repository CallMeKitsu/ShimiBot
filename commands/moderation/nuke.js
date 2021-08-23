const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    function NukeChannel(WillBeNukedChannel) {
        WillBeNukedChannel.clone().then(channel => {
            channel.setPosition(WillBeNukedChannel.position)
            channel.send('nuked.')
        })
        WillBeNukedChannel.delete()
    }

    let NukedChannel = client.channels.cache.get(args[1]) || message.mentions.channels.first()

    if (message.member.hasPermission('ADMINISTRATOR')) {

    if(!NukedChannel) NukedChannel = message.channel
    
        NukeChannel(NukedChannel)
        
    } else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')
}

module.exports.config = {
    name: "nuke",
    category: "moderation",
    usage: "<channel>",
    stable: "❌ instable",
    description: "supprime tous les messages d'un salon",
    cooldown: 10
}