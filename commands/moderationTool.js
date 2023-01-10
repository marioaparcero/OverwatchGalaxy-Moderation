const { RuleSelectMenu } = require('../components/select-menus/RuleSelectMenu');
const Roles = require('../libraries/roles_ids.json');
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel-moderación')
        .setDescription('Heramienta de moderación.'),

    async execute(interaction) {
        try {
            const filteredRoles = interaction.guild.roles.cache.filter(role => role.id != interaction.guild.id);
            const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.id.toString());
            if (listedRoles.includes(Roles.Admin) || listedRoles.includes(Roles.Supervisor)) {
                interaction.channel.send({ components: [RuleSelectMenu('soft')], files: ['assets/FALTAS.png'] }).then(() => {
                    interaction.channel.send({ components: [RuleSelectMenu('serious')] }).then(() => {
                        interaction.channel.send({ components: [RuleSelectMenu('temporary')], files: ['assets/BANEOS.png'] }).then(() => {
                            interaction.channel.send({ components: [RuleSelectMenu('permanent')] }).then(() => {
                                interaction.reply({ content: 'Panel generado con éxito.', ephemeral: true })
                            });
                        });
                    });
                })
            }
        } catch (error) {
            interaction.reply({ content: 'Ha habido un error mientras se ejecutaba este comando!', ephemeral: true })
        }
    },
}