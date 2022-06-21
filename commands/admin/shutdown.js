const { CMDhandler } = require('../../libs/CMDhandler.js')
const { CMDstructure } = require('../../libs/CMDstructure.js')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

module.exports.command = new CMDhandler(
  (interaction, config, client) => {

    client.destroy()
    
  },
  new CMDstructure('shutdown', 'Kill client')
)