const { noteModal } = require('../components/modals/note')
const { checkPermissions } = require('../functions/checkPermissions')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return
        if (
            (interaction.customId !== 'add-note')
        ) return

        let rangePermission = 5; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
        if (!await checkPermissions(interaction.member._roles, rangePermission)) {
            interaction.reply({ content: 'No tienes permisos para añadir notas', ephemeral: true })
            return;
        }

        interaction.showModal(noteModal)
    }
}