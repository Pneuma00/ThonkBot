const Discord = require('discord.js')

module.exports = {
    emojiToEmbed(emoji) {
        const embed = new Discord.MessageEmbed()
            .setTitle(emoji.title)
            .setDescription(`Category: ${emoji.category}\nSubmitter: ${emoji.submitted_by}`)
            .setThumbnail(emoji.image.replace('discordemoji.com', 'emoji.gg'))
        return embed
    },
    emojiListToEmbed(emojiList, page) {
        const embed = new Discord.MessageEmbed()
        for (let i = 0; i < 10; i++) {
            const index = (page - 1) * 10 + (i + 1)
            embed.description += `${index}. \`${emojiList[index - 1].title}\``
        }
        return embed
    }
}