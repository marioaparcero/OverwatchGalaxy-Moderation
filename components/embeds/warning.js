const { EmbedBuilder } = require('discord.js');
const { Rules } = require('../../libraries/rules.json')
const WarningEmbed = (_punishment, _server_name) => {
    return new EmbedBuilder()
        .setColor('#2f3136')
        .addFields(
            { name: `Has recibido una falta en el servidor de ${_server_name}`, value: `\`📚 Tipo de falta\`\n> ${_punishment._type}`, inline: true },
            { name: '`📅 Fecha`', value: `> ${_punishment._discord_timestamp}` },
        )
        .addFields(
            { name: '`📑 Norma incumplida`', value: `> ${Rules[_punishment._rule_id - 1].title}` },
        )
}

const WarningLogEmbed = async (_punishment, _punished, _punisher) => {
    let embed = new EmbedBuilder()
        .setColor('#2f3136')
        .addFields(
            { name: '`👤 Miembro advertido`', value: `> \`Discord:\` <@${_punished._discord_id}>\n> \`Discord_ID:\` ${_punished._discord_id}\n> \`Nombre:\` ${_punished._display_name}`, inline: true },
            { name: '`👮 Advertido por`', value: `> \`Discord:\` <@${_punisher._discord_id}>\n> \`Nombre:\` ${_punisher._display_name}`, inline: true },
        )
        .addFields(
            { name: '`📅 Fecha`', value: `> ${_punishment._discord_timestamp}` },
            { name: '`📑 Norma incumplida`', value: `> ${Rules[_punishment._rule_id - 1].title}` },
            { name: '`🆔 ID de advertencia`', value: `> ${_punishment._id}` },
        )
    // if (_punished._game_id != undefined && _punished._game_id != null) {
    //     embed.addFields(
    //         { name: '`🎮 ID de juego`', value: `> ${_punished._game_id}`, inline: true },
    //         { name: '`🔍 R6 Tracker`', value: `> [${_punished._display_name}](https://r6.tracker.network/profile/uplay/${_punished._display_name}/)`, inline: true },
    //     )
    // }

    return embed;

}

module.exports = { WarningEmbed, WarningLogEmbed }