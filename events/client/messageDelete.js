const Discord = require("discord.js")
module.exports = (client, message) => {

   if(message.channel.id === client.config.stalkChan) return

   let channel = client.channels.cache.get(client.config.stalkChan)
   let content = message.content || "non trouvé"
   if (content.length > 1020) content = "content > 1020 char"

   let embed = new Discord.MessageEmbed()
   .setColor("#ff0000")
   .setThumbnail(message.author.avatarURL())
   .addField(`${message.author.tag} :`, `${content}`)
   .addField(`${message.channel.name} :`, `${message.channel.id}-${message.guild.id}`)

   if(message.attachments.size > 0) {

      let urls = message.attachments.map(x => x.url).join(',\n')
      
      embed.addField('attached :', urls)
   
   }
   
   channel.send(embed)

}