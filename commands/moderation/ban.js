const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member
              .ban({
                reason: `${message.author.tag} a banni ${user.tag}`,
              })
              .then(() => {
                message.reply(`merci d'avoir ban ${user.tag} !`)
              })
              .catch(err => {
                message.reply("impossible de ban cet utilisateur.")
                console.error(err);
              });
          } else {
            message.reply("je ne connais pas cet individu.")
 
          }
        } else {
          message.reply("Merci de spécifier la personne à bannir avec un @user.")
 
        }
      } else return message.channel.send(`Shimi n'a pas les permissions nécéssaires pour ban ${user.name}`)
      } else return message.channel.send('cette commande requiert les permissions Administrateur du serveur.')

}

module.exports.config = {
    name: "ban",
    category: "moderation",
    usage: "@user",
    stable: "✅ stable",
    description: "bannis l'utilisateur mentionné",
    cooldown: 5
} 