const { EmbedBuilder } = require('discord.js');
const { Rules } = require('../../libraries/rules.json');
const RevokeEmbed = (_punishment, _server_name) => {

    let message

    if (_punishment._type === "GRAVE") {
        message = `Se ha eliminado una falta grave a tu nombre`
    } else if (_punishment._type === "LEVE") {
        message = `Se ha eliminado una falta leve a tu nombre`
    }

    if (_punishment._type === "TEMPORAL" || _punishment._type === "PERMANENTE") {
        message = `Se te ha desbaneado`
    }

    let embed = new EmbedBuilder()
        .setColor('#2f3136')
        .addFields(
            { name: `${message} en ${_server_name} 🎉`, value: `\`📅 Fecha\`\n> ${_punishment._discord_timestamp}\n\`🏷️ Motivo\`\n> ${Rules[_punishment._rule_id - 1].description}`, inline: true },
        )

    return embed;
}

module.exports = { RevokeEmbed };