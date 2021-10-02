const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return client.emit('noArgs', message)
    
    client.emit(args[1], message)

}


module.exports.config = {
name: "event",
category: "admin",
usage: "<event_name>",
stable: "✅ stable",
description: "teste un évènement",
} 