const Discord = require('discord.js')
const chalk = require('chalk')
module.exports.run = async (client, message, args) => {

    let type = args[1]

    if(type === "russe") {

        let x = Math.floor(Math.random() * 6) + 1

        let RussianVar = client.gameLIST['roulette'][x - 1].name

        message.channel.send(RussianVar)

        console.log(x)


        if (x !== 6) return;
        
            if (message.guild.me.hasPermission('KICK_MEMBERS')) {
                const user = message.author
                const member = message.guild.member(user)
                if (member) {
                  member
                    .kick({
                      reason: `${message.author.tag} a trop joué.`,
                    })
                    .then(() => {
                      message.reply(`R.I.P ⚰️`)
                    })
                    .catch(err => {
                      message.channel.send(`tu l'as échappé belle ! \😒`)
                      console.error(err);
                    });
                }
            } else return message.channel.send(`tu l'as échappé belle ! \😒\🚬`)    
        
   
    } else return message.channel.send(`vous devez être sûr(e) d'utiliser cette commande, regardez son ${client.config.prefix}help !`)
    
}

module.exports.config = {
    name: "roulette",
    category: "jeux",
    usage: "{russe}",
    stable: "✅ stable",
    description: "un barillet, une balle, six coups.\n🛑⚠️ RISQUE DE KICK ! ⚠️🛑",
} 