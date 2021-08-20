const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

let type = args[1]

if(!type) return message.channel.send('choisissez : `>wallpaper lofi` ou `>wallpaper anime` ?')

const fs = require('fs');

if(type === "lofi" || type === "l") {

    const dir = `./database/wallpaper/lofi/`

    fs.readdir(dir, (err, files) => {

        let x = Math.floor(Math.random() * files.length) + 1
    
        let LofiIMG = {files : [`./database/wallpaper/lofi/${x}.jpg`]}

        message.channel.send(LofiIMG)
    }) 

}
if(type === "anime" || type === "a") {

    const dir = `./database/wallpaper/anime`

    fs.readdir(dir, (err, files) => {

        let x = Math.floor(Math.random() * files.length) + 1
    
        let AnimeIMG = {files : [ `./database/wallpaper/anime/${x}.jpg` ]}
    
        message.channel.send(AnimeIMG)
    })

}
if(type === "phone") return client.emit('PhoneWallpaper', message)
if(type !== "lofi" && type !== "l" && type !== "anime" && type !== "a" && type !== "phone") return message.channel.send("merci d'utiliser un argument correct de la commande.")

}

module.exports.config = {
    name: "wallpaper",
    category: "animes",
    usage: "[ lofi / anime ]",
    stable: "🟩 unhandled",
    description: "un nouveau fond d'écran PC d'anime ?",
} 