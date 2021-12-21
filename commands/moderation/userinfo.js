const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    function GetUserByMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }

    function GetMemberByMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return message.guild.member(mention);
        }
    }
    

    let user = GetUserByMention(args[1]) || client.users.cache.get(args[1])
        if(!user) { 
          user = message.author }

    let member = GetMemberByMention(args[1]) || message.guild.member(args[1])
        if(!member) {
          member = message.guild.member(message.author) }

    let createdAt = new Date(user.createdAt)

          let mois = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'aout',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
          ]
          
    let createdAtStr = `le ${createdAt.getDate()} ${mois[createdAt.getMonth()]} ${createdAt.getFullYear()} à ${createdAt.getHours()}:${createdAt.getMinutes()}`      

    let joinedAt = new Date(member.joinedAt)
          
    let joinedAtStr = `le ${joinedAt.getDate()} ${mois[joinedAt.getMonth()]} ${joinedAt.getFullYear()} à ${joinedAt.getHours()}:${joinedAt.getMinutes()}`

    let embed = new Discord.MessageEmbed() // Embed d'explications

        .setColor(client.config.EmColor) // couleur de l'embed
        .setTitle("USERINFO :") // titre
        .setURL("https://callmekitsu.jimdofree.com/projets/shimi/")
        .addField(`Pseudo :`, user.username, true) // Pseudo
        .addField(`Surnom :`, member.nickname, true) // Surnom
        .addField(`Tag :`, `#${user.discriminator}`, true) // tag de l'user discord
        .addField(`Date de création du compte :`, createdAtStr) // créa du compte
        .addField(`Date d'entrée sur le serveur :`, joinedAtStr) // date d'entrée
        .setThumbnail(user.avatarURL()) // avatar = image 
        .setFooter(`ID : ${user.id}`)

    message.channel.send(embed) // envoi de l'embed
}

module.exports.config = {
    name: "userinfo",
    category: "moderation",
    usage: "<@user>",
    stable: "✅ stable",
    description: "informations à propos de l'utilisateur mentionné / vous",
}