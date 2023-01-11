const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('borrar')
    .setDescription('Borrar mensajes.')
    .addNumberOption(option =>
      option
        .setName('cantidad')
        .setDescription('Cantidad de mensajes a borrar.')
        .setRequired(true),
    ),

  async execute(interaction) {
    try {
      let ammount = interaction.options.getNumber('cantidad')
      if (ammount >= 1 && ammount <= 100) {
        interaction.channel.bulkDelete(ammount)
        interaction.reply({ content: `${ammount} mensajes eliminados.`, ephemeral: true })
      } else {
        interaction.reply({ content: 'La cantidad de mensajes a borrar debe ser mayor a 1 y menor a 100.', ephemeral: true })
        return;
      }
    } catch (error) {
      interaction.reply({ content: 'Ha habido un error mientras se ejecutaba este comando!', ephemeral: true })
    }
  },
}