const Roles = require('../libraries/roles_ids.json');

module.exports = {

  callback: (message, ...args) => {

    const member = message.mentions.members.first() || message.member;

    const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
    const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.id.toString());
    if (
      !listedRoles.includes(Roles.Admin) &&
      !listedRoles.includes(Roles.Moderator) &&
      !listedRoles.includes(Roles.SquadLeader) &&
      !listedRoles.includes(Roles.SquadMember)
    ) return;

    ammount = message.content.split(' ')[1];

    if (ammount >= 1 && ammount <= 100) {
      message.channel.bulkDelete(ammount)
      message.reply(`${ammount} mensajes eliminados.`).then(msg => { setTimeout(() => msg.delete(), 3000) }).catch();
    } else {
      return;
    }
  }

}