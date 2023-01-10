module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) return

        try {
            await command.execute(interaction)
        } catch (error) {
            // console.error(error);
            await interaction.reply({ content: 'Ha habido un error mientras se ejecutaba este comando!', ephemeral: true })
        }
    },
}
