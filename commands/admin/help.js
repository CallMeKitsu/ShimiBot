const { CMDhandler } = require('../../libs/CMDhandler.js')
const { CMDstructure } = require('../../libs/CMDstructure.js')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports.command = new CMDhandler(
  (interaction, config, client) => {

    let parsed_help = ''

    client.COMMANDS.forEach( (catMap, catName) => {
        parsed_help += `${catName} :\n`
        catMap.forEach( (CMDhandler, cmdName) => {
            parsed_help += ` --- ${cmdName}\n`
        })
    });

    const embed = new MessageEmbed()
        .setTitle('TEMP_HELP--DEV')
        .setDescription(parsed_help)

    interaction.reply({embeds: embed})
    
  },
  new CMDstructure('help', "Affiche l'aide du bot !")
)