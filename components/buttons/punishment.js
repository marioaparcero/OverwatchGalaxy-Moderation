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
            .setURL('https://discord.com/channels/758049294023524423/928329689699856514')
            .setStyle('Link'),
    );
let UserButtonsRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('APELAR')
            .setURL('https://squads.es/')
            .setStyle('Link'),
    );
module.exports = { LogButtonsRow, UserButtonsRow };