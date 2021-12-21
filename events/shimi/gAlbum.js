const Discord = require("discord.js")
const fetch = require('node-fetch')
module.exports = async (client, message) => {

    let args = message.content.trim().split(' ')

    let REQUEST = args.slice(2).join(' ')
    if(!REQUEST) return client.emit('noArgs', message)

    let RequestURL = `https://api.genius.com/search?q=${REQUEST}`

    let ACC_TOKEN = client.apiLIST.keys.genius

    let auth = {
        "method": "GET",
        "headers": {
            "User-Agent": "CompuServe Classic/1.22",
            "Accept": "application/json",
            "Host": "api.genius.com",
            "Authorization": `Bearer ${ACC_TOKEN}`
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

    const albumID = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.song.album.id)

    RequestURL = `https://api.genius.com/albums/${albumID}`

    const albumCover = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.album.cover_art_url)


    const albumDate = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.album.release_date_components)

    const albumArtist = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.album.artist.name)

    const albumTitle = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.album.name)

    const artistID = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => res.response.album.artist.id)
    
    RequestURL = `https://api.genius.com/artists/${artistID}`
    
    const artistSongsIDs = await fetch(RequestURL, auth)

        .then(res => res.json())
        .then(res => {
            const allIDs = []

            let allSongs = res.response.songs

            for(const track of allSongs) {
                allIDs.push(track.id)
            }

            return allIDs
        })

    for(const song of allIDs) {

        let tracklist = []

        RequestURL = `https://api.genius.com/songs/${song}`
        
        let is_one_of = await fetch(RequestURL, auth)

            .then(res => res.json())
            .then(res => {
                if(res.response.song.album.id === albumID) {
                    tracklist.push(res.response.song)
                }
                else return
            })

    }

    console.log(tracklist.length)

    


}