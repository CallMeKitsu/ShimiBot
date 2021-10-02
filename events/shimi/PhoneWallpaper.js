const Discord = require("discord.js")
const fs = require('fs')
module.exports = (client, message) => {

    let args = message.content.trim().split(' ')

    let type = args[2]

    if(type === "anime" || type === "a") {

        const dir = `./database/wallpaper/phone/anime`
    
        fs.readdir(dir, (err, files) => {
    
            let x = Math.floor(Math.random() * files.length) + 1
        
            let AnimeIMG = {files : [ `./database/wallpaper/phone/anime/${x}.jpg` ]}
            if(!AnimeIMG) return client.emit('databaseError', message)
        
            message.channel.send(AnimeIMG)
        })
    
    }
    if(type === "lofi" || type === "l") {

        const dir = `./database/wallpaper/phone/lofi`
    
        fs.readdir(dir, (err, files) => {
    
            let x = Math.floor(Math.random() * files.length) + 1
        
            let lofiIMG = {files : [ `./database/wallpaper/phone/lofi/${x}.jpg` ]}
            if(!lofiIMG) return client.emit('databaseError', message)
        
            message.channel.send(lofiIMG)
        })
    
    }
    if(type !== "lofi" && type !== "l" && type !== "anime" && type !== "a") return client.emit('invalidArg', message)

}