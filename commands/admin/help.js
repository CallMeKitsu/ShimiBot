const { CMDhandler } = require('../../libs/CMDhandler.js')
const { CMDstructure } = require('../../libs/CMDstructure.js')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports.command = new CMDhandler(
  (interaction, config, client) => {

    const embed = new MessageEmbed()
      .setColor(config.EmColor)
      .setThumbnail(client.user.avatarURL())
      .setDescription(`\`\`\`/help <command_name>\`\`\``)

    let emoji_index = 0

    client.COMMANDS.forEach( (catMap, catName) => {

      let catCommandsList = []
      
      catMap.forEach( (x, cmdName) => {
        catCommandsList.push(cmdName)
      })

      catName = `\\${config.CatEmoji[emoji_index]} ${catName[0].toUpperCase() + catName.substring(1)}`
      
      if(catCommandsList.length > 0) embed.addField(catName, catCommandsList.join(', '))

      emoji_index ++
    });



    interaction.reply({embeds: [embed]})
    
  },
  new CMDstructure('help', "Affiche l'aide du bot !")
)