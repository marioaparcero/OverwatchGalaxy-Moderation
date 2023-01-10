const { TextInputBuilder, ModalBuilder, ActionRowBuilder, } = require('discord.js')

const note = new TextInputBuilder()
    .setCustomId('note-text-input')
    .setLabel('Nota')
    .setMinLength(3)
    .setMaxLength(1000)
    .setStyle('Paragraph')

const firstActionRow = new ActionRowBuilder().addComponents(note)

const noteModal = new ModalBuilder()
    .setCustomId('note-modal')
    .setTitle('Añadir nota')
    .addComponents(firstActionRow)


module.exports = { noteModal }