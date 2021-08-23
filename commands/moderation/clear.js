const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            
            let DeletedNumber = Math.floor(args[1]) + 1

            if (DeletedNumber) {
                if (!isNaN(DeletedNumber) && DeletedNumber >= 1 && DeletedNumber <= 99) {
                    message.channel.bulkDelete(DeletedNumber)
                    message.channel.send(`Vous avez supprimé ${DeletedNumber - 1} message(s)`)
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