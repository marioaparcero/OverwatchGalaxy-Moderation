const { noteModal } = require('../components/modals/note')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return
        if (
            (interaction.customId !== 'add-note')
        ) return

        interaction.showModal(noteModal)
    }
}