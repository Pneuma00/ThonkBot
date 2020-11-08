require('dotenv').config()

const Discord = require('discord.js')
const fetch = require('node-fetch')

const client = new Discord.Client()
client.prefix = '$'

const data = {
    emojis: [],
    categories: [
        'original-style', 'tv-movie', 'meme', 'anime', 'celebrity',
        'blobs', 'thinking', 'animated', 'nsfw', 'gaming',
        'letters', 'other', 'pepe', 'logos', 'cute',
        'utility', 'animals', 'recolors', 'flags', 'hearts'
    ],
    sample: 121
}

client.on('ready', async () => {
    data.emojis = await fetch('https://emoji.gg/api/').then(res => res.json())
    console.log('Ready!')
})

client.on('message', async msg => {
    if (msg.system) return
    if (msg.author.bot) return

    if (!msg.content.startsWith(client.prefix)) return

    const content = msg.content.slice(client.prefix.length)
    const args = content.split(/ /g)
    const commandName = args.shift()
    
    if (commandName === 'all') {
        msg.reply(`There is total ${data.emojis.length} emojis.`)
    }

    else if (commandName === 'category') {
        const num = parseInt(args[0])
        if (isNaN(num) || 1 > num || 20 < num) return msg.reply('You should give me a number from 1 to 20!')

        msg.reply(`There is ${data.emojis.filter(e => e.category === num).length} emojis in \`${data.categories[num - 1]}\` category.`)
    }

    /* else if (commandName === 'random') {
        msg.reply(`Random emoji ID: ${data.emojis.filter(e => e.category != 9).random().id}`)
    } */

    else if (commandName === 'sample') {
        msg.channel.send(require('./func').emojiToEmbed(data.emojis.find(e => e.id === data.sample)))
    }

    else if (commandName === 'emoji') {
        const id = parseInt(args[0])
        if (isNaN(id) || 1 > id) return msg.reply('You should give me a number bigger or equal to 1!')

        const emoji = data.emojis.find(e => e.id === id)
        if (emoji === undefined) return msg.reply(`The emoji with ID ${id} doesn't exist.`)
        if (emoji.category === 9 && !msg.channel.nsfw) return msg.reply(`You can only view this emoji in NSFW channel.`) 

        const embed = require('./func').emojiToEmbed(emoji)
        const dialog = await msg.channel.send(embed)

        dialog.react('✅')
        const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === msg.author.id
        dialog.awaitReactions(filter, { max: 1, time: 30000 })
            .then(collected => {
                msg.guild.emojis.create(emoji.image, emoji.title)
                msg.reply(`Added :${emoji.title}: to your server!`)
            }).catch(e => {})
    }
})

client.login()