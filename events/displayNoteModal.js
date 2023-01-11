const { noteModal } = require('../components/modals/note')
const { checkPermissions } = require('../functions/checkPermissions')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return
        if (
            (interaction.customId !== 'add-note')
        ) return

        let rangePermission = 4; // 4 = Administrator - Staff, 3 = Admin - Moderator, 2 = Admin - Supervisor, 1 = Admin, 0 = None
        if (!await checkPermissions(interaction.member._roles, rangePermission)) {
            interaction.reply({ content: 'No tienes permisos para añadir notas', ephemeral: true })
            return;
        }

        interaction.showModal(noteModal)
    }
}