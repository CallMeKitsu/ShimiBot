const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            let args = message.content.trim().split(/ +/g);
            if (args[1]) {
                if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)
                    message.channel.bulkDelete(1)
                }
                else {
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`)
                }
            }
            else {
                message.channel.send(`Vous devez indiquer un nombre de messages a supprimer !`)
            }
        }
        else {
            message.channel.send(`Vous devez avoir la permission de gérer les messages pour éxécuter cette commande !`)
          }

}

module.exports.config = {
    name: "clear",
    category: "moderation",
    usage: "{nombre}",
    stable: "✅ stable",
    description: "supprime le nombre de messages précisé",
} 