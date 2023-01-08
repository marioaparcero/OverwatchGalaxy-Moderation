const Discord = require('discord.js');

module.exports = {

  callback: (message, ...args) => {

    const member = message.mentions.members.first() || message.member;

    const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
    const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.id.toString());

    if (listedRoles.includes('921554511011667998') || listedRoles.includes('921551508418482196')) {

      ammount = message.content.split(' ')[1];

      if (ammount >= 1 && ammount <= 100) {
        message.channel.bulkDelete(ammount)
        message.reply(`${ammount} mensajes eliminados.`).then(msg => { setTimeout(() => msg.delete(), 3000) }).catch();
      } else {
        return;
      }

    }

  }

}