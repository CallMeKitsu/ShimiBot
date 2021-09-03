const Discord = require("discord.js")
let ytld = require("ytdl-core")
module.exports = (client, message) => {

    if(message.content.startsWith(`${client.config.prefix}chill`)) {
        message.member.voice.channel.join().then(connexion => {
            
            let dispatcher = connexion.play(ytld("https://www.youtube.com/watch?v=DWcJFNfaw9c", {quality: "highestaudio"}))
    
            message.channel.send(`Shimi t'a rejoint dans ${message.member.voice.channel.toString()} !`)
    
            dispatcher.on('finish', () => {
                message.channel.send("Flux terminé, Shimi a quitté le salon vocal")
                dispatcher.destroy()
                connexion.disconnect()
            })
    
            dispatcher.on('error', err => {
                message.channel.send("erreur lors de la lecture, réexécutez la commande")
                console.log(err)
            })
    
        }).catch(err => {
            message.channel.send('erreur lors de la connection au salon vocal')
            console.log(err)
        })
    }
    if(message.content.startsWith(`${client.config.prefix}disconnect`)) {
        if(message.guild.me.voice.channel) {
            message.guild.me.voice.channel.leave()
            message.channel.send('Shimi s\'est bien déconnecté du salon vocal')
        } else return message.channel.send('Shimi n\'est pas dans un salon vocal')
        
    }

}