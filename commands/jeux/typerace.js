const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (client, message, args) => {

    let list = JSON.parse(fs.readFileSync('database/json/typeLIST.json'))

    let sentence = list[Math.floor(Math.random() * list.length)]

    let filter = msg => msg.author.id === message.author.id

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`\`\`\`${sentence}\`\`\``)
    .setFooter('tapez cette phrase le plus vite possible !')
    message.channel.send(embed)

    let startDate = new Date(Date.now())

    message.channel.awaitMessages(filter, {
        max: 1,
        time: 50000,
        errors: ['time']
      })
      .then(message => {

        winner = message.first()

        let diff = Math.round(compareStrings(sentence, winner.content) * 100) / 100 

        if(diff === 100) {
    
            let winMS = Date.now() - startDate

            winner.react('🏆')

            let winEmbed = new Discord.MessageEmbed()
            .setColor(client.config.EmColor)
            .setDescription(`**${winner.author.username}** gagne en **${winMS}** ms !`)
            winner.channel.send(winEmbed)
        } else {
           
            if(diff >= 70) {

                let winMS = Date.now() - startDate

                winner.react('⚡')
    
                let speedEmbed = new Discord.MessageEmbed()
                .setColor(client.config.EmColor)
                .setDescription(`**${winner.author.username}** est le plus rapide, avec **${diff}%** de précision en **${winMS}** ms !`)
                winner.channel.send(speedEmbed)

            } else {
                
                winner.react('💀')

                let loseEmbed = new Discord.MessageEmbed()
                .setColor(client.config.EmColor)
                .setDescription(`Perdu ! :'(`)
                winner.channel.send(loseEmbed)
            }

        }
      })
      
    // =========================================================================================================================

    function compareStrings(base, attempt) {
        base = base.replace(/\s/g, '')
        attempt = attempt.replace(/\s/g, '')

          let result = 0
          let i = 0

          for (const element of base) {

              if(element === attempt[i]) result += 1
              i += 1
          }
          
          result = result * 100 / base.length

          return result
      }

}

module.exports.config = {
    name: "typerace",
    category: "jeux",
    usage: "",
    stable: "✅ stable",
    description: "qui écrira le plus vite ?",
}