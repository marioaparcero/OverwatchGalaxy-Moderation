const { EmbedBuilder } = require('discord.js');
let MentionEmbed = (_punishment, _selected_type) => {
    let embed = new EmbedBuilder()
        .setColor('#2f3136')
        .addFields(
            { name: `${_selected_type}`, value: `Selecciona a un usuario o introduce su ID`, inline: true },
        )

    return embed;
}

module.exports = { MentionEmbed };