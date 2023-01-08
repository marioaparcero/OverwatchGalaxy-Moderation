const { MessageEmbed } = require('discord.js');
let MentionEmbed = (_punishment, _selected_type) => {
    let embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: `${_selected_type}`, value: `Menciona al usuario a sancionar con @`, inline: true },
        )

    return embed;
}

module.exports = { MentionEmbed };