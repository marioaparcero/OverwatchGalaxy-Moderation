module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (
            (interaction.customId !== 'cancel-punuishment')
        ) return

        interaction.deferUpdate();
        interaction.message.delete();
        return;
    }
}