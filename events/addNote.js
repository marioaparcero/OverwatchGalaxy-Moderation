const { noteModal } = require('../components/modals/note')
const { InteractionType, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.type !== InteractionType.ModalSubmit) return
        if (
            (interaction.customId !== 'note-modal')
        ) return

        const note = interaction.fields.fields.get('note-text-input').value
        const originalEmbed = await interaction.message.embeds[0]

        const noteIndex = () => {
            let index = 0
            for (let i = 0; i < originalEmbed.fields.length; i++) {
                if (originalEmbed.fields[i].name === '📝 Nota') {
                    index = i
                } else {
                    index = 0
                }
            }
            return index
        }

        if (originalEmbed.fields[noteIndex()] != 0) {
            const embedWithNote = new EmbedBuilder(originalEmbed).spliceFields(noteIndex(), 1, { name: `📝 Nota`, value: `> Autor: ${interaction.member}\n> \`${note}\`` })
            interaction.message.edit({
                embeds: [embedWithNote]
            })
        } else {
            const embedWithNote = new EmbedBuilder(originalEmbed).addFields({ name: `📝 Nota`, value: `> Autor: ${interaction.member}\n> \`${note}\`` })
            interaction.message.edit({
                embeds: [embedWithNote]
            })
        }
    }
}