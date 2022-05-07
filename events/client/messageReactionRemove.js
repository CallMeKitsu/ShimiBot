const Discord = require("discord.js")
const fs = require('fs')
module.exports = (client, reaction, user) => {

    if(user.bot) return

    let JSONservers = JSON.parse(fs.readFileSync('./database/json/serverLIST.json'))

    let serverOBJ = JSONservers.find(x => x.ID === reaction.message.guild.id)

    if(serverOBJ && serverOBJ.roleReact.length > 0) {

        const emoji = reaction._emoji.name

        let messageRR = serverOBJ.roleReact.find(msg => msg.messageId === reaction.message.id)
        if(messageRR === undefined) return
        let roleReactPair = messageRR.emojiRolesPairs.find(x => x.emoji === emoji)
        if(!roleReactPair) return

        const role = reaction.message.guild.roles.cache.find(r => r.id === roleReactPair.role)

        const member = reaction.message.guild.members.cache.find(m => m.id === user.id)

        member.roles.remove(role)

    }

}