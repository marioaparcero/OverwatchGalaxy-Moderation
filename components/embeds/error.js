const { MessageEmbed } = require('discord.js');
const ErrorEmbed = (_message) => {
    let embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: 'Error', value: `${_message}`, inline: true },
        )

    return embed;
}

module.exports = { ErrorEmbed };