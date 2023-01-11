const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

let LogButtonsRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('revoke')
            .setLabel('REVERTIR')
            .setEmoji('🔙')
            .setStyle('Danger'),
        new ButtonBuilder()
            .setCustomId('add-note')
            .setLabel('AÑADIR NOTA')
            .setEmoji('📝')
            .setStyle('Success'),
        new ButtonBuilder()
            .setLabel('🔨 IR A MODERACIÓN')
            .setURL('https://discord.com/channels/982369022957981848/982369024501493789')
            .setStyle('Link'),
    );
let UserButtonsRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('APELAR')
            .setURL('https://dyno.gg/form/91c8cdce')
            .setStyle('Link'),
    );
module.exports = { LogButtonsRow, UserButtonsRow };