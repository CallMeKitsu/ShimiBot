const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    await message.delete()

    await client.destroy()
    
     
}

module.exports.config = {
    name: "offline",
    category: "admin",
    usage: "",
    stable: "✅ stable",
    description: "turn off le client actuel",
} 