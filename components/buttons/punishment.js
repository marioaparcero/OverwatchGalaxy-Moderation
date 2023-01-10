const { MessageActionRow, MessageButton } = require('discord.js');

let LogButtonsRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('revoke')
            .setLabel('REVERTIR')
            .setEmoji('🔙')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('add-note')
            .setLabel('AÑADIR NOTA')
            .setEmoji('📝')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setLabel('🔨 IR A MODERACIÓN')
            .setURL('https://discord.com/channels/758049294023524423/928329689699856514')
            .setStyle('LINK'),
    );
let UserButtonsRow = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('APELAR')
            .setURL('https://squads.es/')
            .setStyle('LINK'),
    );
module.exports = { LogButtonsRow, UserButtonsRow };