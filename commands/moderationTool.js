const { RuleSelectMenu } = require('../components/select-menus/RuleSelectMenu');
const Roles = require('../libraries/roles.json');
const { SlashCommandBuilder } = require('discord.js')
const { checkPermissions } = require('../functions/checkPermissions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel-moderación')
        .setDescription('Heramienta de moderación.'),

    async execute(interaction) {
        try {

            if (!await checkPermissions(interaction.member._roles, 1)) {
                interaction.reply({ content: 'No tienes permisos para ejecutar este comando!', ephemeral: true })
                return;
            }
            interaction.channel.send({ components: [RuleSelectMenu('soft')], files: ['assets/FALTAS.png'] }).then(() => {
                interaction.channel.send({ components: [RuleSelectMenu('serious')] }).then(() => {
                    interaction.channel.send({ components: [RuleSelectMenu('temporary')], files: ['assets/BANEOS.png'] }).then(() => {
                        interaction.channel.send({ components: [RuleSelectMenu('permanent')] }).then(() => {
                            interaction.reply({ content: 'Panel generado con éxito.', ephemeral: true })
                        });
                    });
                });
            })

        } catch (error) {
            console.log(error);
            interaction.reply({ content: 'Ha habido un error mientras se ejecutaba este comando!', ephemeral: true })
        }
    },
}