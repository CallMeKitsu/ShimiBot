const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    let game = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    if(!args[1]) return client.emit('noArgs', message)
    if(!args[2]) return client.emit('invalidArg', message)

    let playerX = message.author
    let playerO = message.mentions.users.first() || client.cache.users.get(args[1])
    if(!playerO) return client.emit('invalidUser', message)

    let GameOn = true
    
    game = play(game, playerX, args[2], playerX, playerO)
    message.channel.send(`${render(game, 0)}\n${render(game, 1)}\n${render(game, 2)}\nau tour de ${playerO.toString()}`)

    for(var i = 2; i < 10; i++) {

        if (i % 2 === 0) { actualPlayer = playerO ; nextPlayer = playerX}
        else { actualPlayer = playerX ; nextPlayer = playerO }
        
        await message.channel.awaitMessages(msg => (msg.content.length === 2) && (msg.author.id === actualPlayer.id), {

            max: 1,
            time: 500000,
            errors: ['time']

        }).then(msg => {

            newCase = msg.first().content

            game = play(game, actualPlayer, newCase, playerX, playerO)
            
            if(game.winner !== undefined) {
                message.channel.send(`${render(game.game, 0)}\n${render(game.game, 1)}\n${render(game.game, 2)}\n**${game.winner.toString()}** remporte la partie !!`)
                i = 10
            } else if(typeof game === 'string') {
                message.channel.send(game)
                i = 10
            }
            else message.channel.send(`${render(game, 0)}\n${render(game, 1)}\n${render(game, 2)}\nau tour de ${nextPlayer.toString()}`)

        })

    }

    const reducer = (previousValue, currentValue) => previousValue + currentValue

    function play(thisGame, thisPlayer, thisCase, X, O) {

        let player = 0
        if(thisPlayer.id === X.id) player = 1
        else if(thisPlayer.id === O.id) player = 2
        else return 'wrong player'

        var column;
        if(thisCase.startsWith("a")) column = 0
        else if(thisCase.startsWith('b')) column = 1
        else if(thisCase.startsWith('c')) column = 2
        else return 'wrong case : column'

        var line;
        if(thisCase.endsWith('1')) line = 0
        else if(thisCase.endsWith('2')) line = 1
        else if(thisCase.endsWith('3')) line = 2
        else return 'wrong case : line'

        if(thisGame[line][column] === 0) thisGame[line][column] = player
        else return 'wrong case : overlap'

        if(thisGame[0][0] === 1 && thisGame[0][1] === 1 && thisGame[0][2] === 1) return {winner: X, game: thisGame} // : X X X : - - - : - - - (line one)
        if(thisGame[1][0] === 1 && thisGame[1][1] === 1 && thisGame[1][2] === 1) return {winner: X, game: thisGame} // : - - - : X X X : - - - (line two)
        if(thisGame[2][0] === 1 && thisGame[2][1] === 1 && thisGame[2][2] === 1) return {winner: X, game: thisGame} // : - - - : - - - : X X X (line three)
        if(thisGame[0][0] === 1 && thisGame[1][0] === 1 && thisGame[2][0] === 1) return {winner: X, game: thisGame} // : X - - : X - - : X - - (column one)
        if(thisGame[0][1] === 1 && thisGame[1][1] === 1 && thisGame[2][1] === 1) return {winner: X, game: thisGame} // : - X - : - X - : - X - (column two)
        if(thisGame[0][2] === 1 && thisGame[1][2] === 1 && thisGame[2][2] === 1) return {winner: X, game: thisGame} // : - - X : - - X : - - X (column three)
        if(thisGame[0][0] === 1 && thisGame[1][1] === 1 && thisGame[2][2] === 1) return {winner: X, game: thisGame} // : X - - : - X - : - - X (diagonal one)
        if(thisGame[0][2] === 1 && thisGame[1][1] === 1 && thisGame[2][0] === 1) return {winner: X, game: thisGame} // : - - X : - X - : X - - (diagonal two)

        if(thisGame[0][0] === 2 && thisGame[0][1] === 2 && thisGame[0][2] === 2) return {winner: O, game: thisGame} // : O O O : - - - : - - - (line one)
        if(thisGame[1][0] === 2 && thisGame[1][1] === 2 && thisGame[1][2] === 2) return {winner: O, game: thisGame} // : - - - : O O O : - - - (line two)
        if(thisGame[2][0] === 2 && thisGame[2][1] === 2 && thisGame[2][2] === 2) return {winner: O, game: thisGame} // : - - - : - - - : O O O (line three)
        if(thisGame[0][0] === 2 && thisGame[1][0] === 2 && thisGame[2][0] === 2) return {winner: O, game: thisGame} // : O - - : O - - : O - - (column one)
        if(thisGame[0][1] === 2 && thisGame[1][1] === 2 && thisGame[2][1] === 2) return {winner: O, game: thisGame} // : - O - : - O - : - O - (column two)
        if(thisGame[0][2] === 2 && thisGame[1][2] === 2 && thisGame[2][2] === 2) return {winner: O, game: thisGame} // : - - O : - - O : - - O (column three)
        if(thisGame[0][0] === 2 && thisGame[1][1] === 2 && thisGame[2][2] === 2) return {winner: O, game: thisGame} // : O - - : - O - : - - O (diagonal one)
        if(thisGame[0][2] === 2 && thisGame[1][1] === 2 && thisGame[2][0] === 2) return {winner: O, game: thisGame} // : - - O : - O - : O - - (diagonal two)

        return thisGame

    }

    function render(array, line) {

        let render = ""
        
        for(var i = 0; i<3; i++) {
            if(array[line][i] === 0) render += "🔲"
            if(array[line][i] === 1) render += '❌' 
            if(array[line][i] === 2) render += '⭕' 
        }

        return render

    }


}

module.exports.config = {
    name: "xoxo",
    category: "jeux",
    usage: "@player2 {Colonne'abc'Ligne'123'}\n{Colonne'abc'Ligne'123'}",
    stable: "✅ stable",
    description: "jouez au morpion / xoxo !",
}