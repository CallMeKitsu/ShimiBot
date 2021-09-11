const Discord = require("discord.js")
const fs = require('fs')
module.exports = (client, member) => {

    if(!member.guild.me.hasPermission('MANAGE_ROLES')) return

    let JSONservers = JSON.parse(fs.readFileSync("./database/json/serverLIST.json"))

    let found = JSONservers.find(x => x.ID === member.guild.id)

    if (!found) return
    if (found.JoinRole === "") return
    if (found.JoinRole !== "") {
        member.roles.add(found.JoinRole)
    }

}