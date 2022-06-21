const { CMDhandler } = require('../../libs/CMDhandler.js')
const { CMDstructure } = require('../../libs/CMDstructure.js')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports.command = new CMDhandler(
  (interaction, config, client) => {

    interaction.reply('wsh')
    
  },
  new CMDstructure('test', 'The goal is to test this shit out :D').str('poutre', 'desc of poutre')
)