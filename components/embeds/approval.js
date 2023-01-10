const { MessageEmbed } = require('discord.js');

const ApprovalEmbed = (_approval, _punished) => {

    _soft_punishments_count = 0;
    _serious_punishments_count = 0;
    _temporary_punishments_count = 0;
    for (let i = 0; i < _approval._history.length; i++) {
        if (_approval._history[i]._type === 'LEVE') {
            _soft_punishments_count++;
        } else if (_approval._history[i]._type === 'GRAVE') {
            _serious_punishments_count++;
        } else if (_approval._history[i]._type === 'TEMPORAL') {
            _soft_punishments_count++;
        }
    }

    let embed = new MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: `\`${_approval._title} ${_approval._type} A:\``, value: `<@${_punished.id}>` },
            { name: '\`NORMA INCUMPLIDA\`', value: `${_approval._rule_id}`, inline: true },
            { name: '\`HISTORIAL\`', value: `FALTAS LEVES: ${_soft_punishments_count}\nFALTAS GRAVES: ${_serious_punishments_count}\nBANEOS TEMPORALES: ${_temporary_punishments_count}` }
        )

    if (_approval._history.length > 0) {
        _approval._history.forEach((punishment, index) => {
            embed.addFields(
                { name: `${punishment._discord_timestamp}`, value: `NORMA: **${punishment._rule_id}**\nTIPO: **${punishment._type}**\n[+INFO](${punishment._log_message_url})`, inline: true },
            )
        }
        )
    }
    return embed;
}

module.exports = { ApprovalEmbed }