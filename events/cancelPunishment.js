module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (
            (interaction.customId !== 'cancel-punishment')
        ) return

        interaction.deferUpdate();
        interaction.message.delete();
        return;
    }
}