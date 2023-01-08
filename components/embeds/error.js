const { MessageEmbed } = require('discord.js');
const ErrorEmbed = () => {
    let embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: 'Error', value: 'No has introducido una ID válida', inline: true },
        )

    return embed;
}

module.exports = { ErrorEmbed };