const fs = require('fs')
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let JSONservers = JSON.parse(fs.readFileSync('./database/json/serverLIST.json'))

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
    const _message = client.channels.cache.get(channel.id).messages.fetch(args[2])
    const emoji = args[3]
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[4])

    let serverOBJ = JSONservers.find(x => x.ID === message.guild.id)

    let test = serverOBJ.roleReact.find(msg => msg.messageId === _message.id)

    if(test === undefined) client.emit('newrr', message, _message.id, channel.id, role.id, emoji)
    if(test !== undefined) client.emit('editrr', message, _message.id, channel.id, role.id, emoji)

    _message.react(emoji)

}

module.exports.config = {
    name: "rolereact",
    category: 'moderation',
    usage: "{channel} {message} {emoji} {role}",
    stable: "❌ instable",
    description: "crée des réactions liées à des rôles, clickable et auto-assignables",
}