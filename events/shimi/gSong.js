const Discord = require("discord.js")
const fetch = require('node-fetch')
const { getLyrics, getSong } = require('genius-lyrics-api')
module.exports = async (client, message) => {

    let args = message.content.trim().split(' ')

    let REQUEST = args.slice(2).join(' ')
    if(!REQUEST) return client.emit('noArgs', message)

    let RequestURL = `https://api.genius.com/search?q=${REQUEST}`

    let API_KEY = client.apiLIST.keys.genius

    let auth = {
        "method": "GET",
        "headers": {
            "User-Agent": "CompuServe Classic/1.22",
            "Accept": "application/json",
            "Host": "api.genius.com",
            "Authorization": `Bearer ${API_KEY}`
        }
    }

    const songID = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => {
            if(res.response.hits[0] === undefined) return 
            else return res.response.hits[0]['result'].id
        })

    if(!songID) return message.channel.send(`Le titre **${REQUEST}** n'a pas été trouvé.`)
    
    RequestURL = `https://api.genius.com/songs/${songID}`

    const songThumbnail = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => {
            if(res.response.song.album !== null) return res.response.song.album.cover_art_url
            else return res.response.song.song_art_image_thumbnail_url
        })

    const songTitle = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.song.title)

    const songArtists = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.song.artist_names)

    const songUrl = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.song.url)
    
    const songDate = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.song.release_date_for_display)

    const songAlbum = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => {
            if(res.response.song.album === null) return
            else return `[${res.response.song.album.name}](${res.response.song.album.url})`
        })

    let embed = new Discord.MessageEmbed()

    .setColor(client.config.EmColor)
    .setThumbnail(songThumbnail)
    .setDescription(`\`\`\`${songTitle}\`\`\`\n__**Album**__ : ${songAlbum}\n__**Artiste(s)**__ : ${songArtists}\n__**Date de sortie**__ : ${songDate}`)

    let SentEmbed = await message.channel.send(embed)

    let lyricsEmbed = new Discord.MessageEmbed()
    
    .setColor(client.config.EmColor)
    
    const options = {
        apiKey: API_KEY,
        title: songTitle,
        artist: songArtists,
        optimizeQuery: true
    }

    let lyrics = await getLyrics(options)

    if(lyrics.length > 5700) lyrics = `paroles trop longues, disponibles [ici](${songUrl})`
    
    lyricsEmbed.setDescription(`__**Paroles**__ : \n${lyrics}`)

    SentEmbed.react('🎤')

    SentEmbed.awaitReactions((reaction, user) => !user.bot && (reaction.emoji.name == '🎤'),
    { max: 1, time: 30000 }).then(collected => {

    if (collected.first().emoji.name == '🎤') {

        message.channel.send(lyricsEmbed)

    } else return

})
}