const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

const ApprovalButtons = (_punishment_type, _emoji, _label) => {

    switch (_punishment_type) {
        case 'FALTA LEVE':
            _punishment_type = 'soft';
            break;
        case 'FALTA GRAVE':
            _punishment_type = 'serious';
            break;
        case 'BAN PERMANENTE':
            _punishment_type = 'permanent';
            break;
        case 'BAN TEMPORAL':
            _punishment_type = 'temporary';
            break;
        default:
            break;
    }
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`approve-${_punishment_type}`)
                .setLabel(`${_label}`)
                .setEmoji(`${_emoji}`)
                .setStyle('Secondary'),
            new ButtonBuilder()
                .setCustomId(`cancel-punishment`)
                .setLabel('Cancelar')
                .setEmoji('<:CANCELAR_DANGER:1059188966416470207>')
                .setStyle('Secondary'),
        );
}

module.exports = { ApprovalButtons };