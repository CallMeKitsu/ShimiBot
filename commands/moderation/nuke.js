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

    if(!NukedChannel) {
        if(args[1] === "here") NukedChannel = message.channel
        else return message.channel.send("merci d'utiliser des arguments corrects de la commande.")
    } 

    let THATmemberInTHATchannelsGUILD = NukedChannel.guild.member(message.author)

    if(!NukedChannel.permissionsFor(THATmemberInTHATchannelsGUILD).has('MANAGE_CHANNELS')) {
        return message.channel.send('vous devez avoir la permission de gérer ce salon')
    }

    if (message.member.hasPermission('ADMINISTRATOR')) {

        NukeChannel(NukedChannel)
        
    } else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')
}

module.exports.config = {
    name: "nuke",
    category: "moderation",
    usage: "[ {channel} / here ]",
    stable: "🟩 unhandled",
    description: "supprime tous les messages d'un salon",
    cooldown: 10
}