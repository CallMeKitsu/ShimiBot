const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    function GetUserByMention(mention) {
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }

    if(!args[1]) return message.channel.send("merci de mentionner deux personnes !")

    let user1 = GetUserByMention(args[1]) || client.users.cache.get(args[1])
    if(!user1) return message.channel.send('mention(s) invalide(s)')

    let user2 = "will be defined"

    if(!args[2]) {
        user2 = user1
        user1 = message.author
    }
    else {
        user2 = GetUserByMention(args[2]) || client.users.cache.get(args[2])
    }

    if(!user2 || user2 == "will be defined") return message.channel.send('mention(s) invalide(s)')


    function commonCharacterCount(s1, s2) {
        var count = 0;
        s1 = s1.split('');
        s2 = s2.split('');
        
        s1.forEach(e => {
          if (s2.includes(e)) {
            count++;
            s2.splice(s2.indexOf(e), 1);
          }
        })
            
        return count;
    }

    let common = commonCharacterCount(user1.id, user2.id)
    let compare = user1.id.localeCompare(user2.id)

    if(user1.id === client.config.admin || user1.id === "499583362143617025") {
        if(user2.id === client.config.admin || user2.id === "499583362143617025") common = 1202
    }
    
    let emoji = "❤️"

    if (common > 6) {love = [0,0]; emoji = "🖤"}
    if (common == 6) {love = [5,0]; emoji = "🖤"}
    if (common == 7) {love = [10,0]; emoji = "💔"}
    if (common == 8) {love = [20,10]; emoji = "💔"}
    if (common == 9) {love = [30,20]; emoji = "❤️"}
    if (common == 10) {love = [40,30]; emoji = "❤️"}
    if (common == 11) {love = [45,40]; emoji = "❤️‍🩹"}
    if (common == 12) {love = [55,45]; emoji = "❤️"}
    if (common == 13) {love = [55,40]; emoji = "💗"}
    if (common == 14) {love = [75,65]; emoji = "💕"}
    if (common == 15) {love = [80,75]; emoji = "💓"}
    if (common == 16) {love = [85,80]; emoji = "💘"}
    if (common == 17) {love = [90,85]; emoji = "💞"}
    if (common == 18) {love = [99, 90]; emoji = "💖"}
    if (common == 1202) {love = [1000000000, 100000000000]; emoji = "💖💞💘💓❤️‍🔥❤️💖"}
    if (compare == 0) {love = [100, 100]; emoji = "❤️‍🔥"}

    let percentage = `${Math.floor(Math.random()* (love[0] - love[1]) + love[1])}%`

    let embed = new Discord.MessageEmbed()
    .setColor(client.config.EmColor)
    .setDescription(`**${message.author.username}** et **${user2.username}** = __${percentage}__ d'amour ! ${emoji}`)
    message.channel.send(embed)

}

module.exports.config = {
    name: "lc",
    category: "jeux",
    usage: "[ @user1 @user2 / @user ]",
    stable: "✅ stable",
    description: "vous trouverez, un jour. promis.",
}