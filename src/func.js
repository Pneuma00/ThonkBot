const Discord = require('discord.js')

module.exports = {
    emojiToEmbed(emoji) {
        const embed = new Discord.MessageEmbed()
            .setTitle(emoji.title)
            .setDescription(`Category: ${emoji.category}`)
            .setThumbnail(emoji.image.replace('discordemoji.com', 'emoji.gg'))
        return embed
    }
}