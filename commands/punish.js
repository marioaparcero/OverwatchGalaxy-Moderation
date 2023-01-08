const { RuleSelectMenu } = require('../components/select-menus/RuleSelectMenu');
module.exports = {
  callback: (message, ...args) => {
    const member = message.mentions.members.first() || message.member;
    const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
    const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.id.toString());
    message.delete();
    if (listedRoles.includes('921554511011667998') || listedRoles.includes('921551508418482196')) {
      message.channel.send({ components: [RuleSelectMenu('soft')], files: ['assets/FALTAS.png'] }).then(() => {
        message.channel.send({ components: [RuleSelectMenu('serious')] }).then(() => {
          message.channel.send({ components: [RuleSelectMenu('temporary')], files: ['assets/BANEOS.png'] }).then(() => {
            message.channel.send({ components: [RuleSelectMenu('permanent')] });
          });
        });
      });
    }

  }

}