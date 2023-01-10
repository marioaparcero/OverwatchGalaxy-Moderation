const Discord = require('discord.js');
const { Rules } = require('../../libraries/rules.json')

let BanEmbed = (_punishment, _server_name) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: `Has recibido un ban en el servidor de ${_server_name}`, value: `\`📚 Tipo de ban\`\n${_punishment._type}`, inline: true },
        )
        .addFields(
            { name: '`📑 Norma incumplida`', value: `> ${Rules[_punishment._rule_id - 1].title}` },
            { name: '`📅 Fecha`', value: `> ${_punishment._discord_timestamp}` },
        )

    if (_punishment._type == 'TEMPORAL') {
        embed.addFields(
            { name: '`⏰ Duración hasta`', value: `> <t:${Math.floor((_punishment._timestamp + ((28 * 24 * 60) * 60 * 1000)) / 1000)}>` },
            { name: 'Se te permitirá volver a entrar al servidor en 28 días.', value: 'Para ser desbaneado, debes contactarnos mediante nuestra página web dentro de 28 días: https://squads.es/' },
        )
    }

    return embed;
}

let AccumulatedBanEmbed = (_punishment, _server_name) => {
    return new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`Has recibido un ban por acumulación de faltas graves en el servidor de ${_server_name}`)
        .addFields(
            { name: '`📑 Norma incumplida`', value: `> ${Rules[_punishment._rule_id - 1].title}` },
            { name: '`📅 Fecha`', value: `>  ${_punishment._discord_timestamp}` },
        )
}

let BanLogEmbed = (_punishment, _punished, _punisher, _ban) => {
    let _tracker_field = { name: '`🔍 R6 Tracker`', value: `> [${_punished._display_name}](https://r6.tracker.network/profile/uplay/${_punished._display_name}/)`, inline: true };
    if (!_punished._display_name) {
        _punished._display_name = _ban.username + '#' + _ban.discriminator;
        _tracker_field.value = "> No disponible";
    };

    let embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: '`👤 Miembro baneado`', value: `> \`Discord:\` <@${_punished._discord_id}>\n> \`Discord_ID:\` ${_punished._discord_id}\n> \`Nombre:\` ${_punished._display_name}`, inline: true },
            { name: '`👮 Baneado por`', value: `> \`Discord:\` <@${_punisher._discord_id}>\n> \`Nombre:\` ${_punisher._display_name}`, inline: true },
        )
        .addFields(
            { name: '`📅 Fecha`', value: `> ${_punishment._discord_timestamp}` },
            { name: '`📑 Norma incumplida`', value: `> ${Rules[_punishment._rule_id - 1].title}` },
            { name: '`🆔 ID del ban`', value: `> ${_punishment._id}` },
        )

    if (_punished._game_id != undefined && _punished._game_id != null) {
        embed.addFields(
            { name: '`🎮 ID de juego`', value: `> ${_punished._game_id}`, inline: true },
            _tracker_field,
        )
    }

    if (_punishment._type == 'TEMPORAL') {
        embed.addFields(
            { name: '`⏰ Duración hasta`', value: `> <t:${Math.floor((_punishment._timestamp + ((28 * 24 * 60) * 60 * 1000)) / 1000)}>` },
        )
    }

    return embed;
}

module.exports = { BanEmbed, AccumulatedBanEmbed, BanLogEmbed }