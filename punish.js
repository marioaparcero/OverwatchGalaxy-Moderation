const { RuleSelectMenu } = require('./components/select-menus/RuleSelectMenu');
const Roles = require('./libraries/roles_ids.json');
module.exports = {
    callback: (message, ...args) => {
        const member = message.mentions.members.first() || message.member;
        const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
        const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.id.toString());
        message.delete();
        if (listedRoles.includes(Roles.Admin) || listedRoles.includes(Roles.Supervisor)) {
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