const { ApprovalButtons } = require('../components/buttons/approval');
const { ApprovalEmbed } = require('../components/embeds/approval');
const { ErrorEmbed } = require('../components/embeds/error');
const { MentionEmbed } = require('../components/embeds/mention');
const { RuleSelectMenu } = require('../components/select-menus/RuleSelectMenu');
const { getPunishments } = require('../database/getPunishments');
const { checkPermissions } = require('../functions/checkPermissions');
const Roles = require('../libraries/roles.json');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (
            (interaction.customId !== 'rule-select-soft' && interaction.customId !== 'rule-select-serious') &&
            (interaction.customId !== 'rule-select-temporary' && interaction.customId !== 'rule-select-permanent')
        ) return;

        let rangePermission = 5; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
        if (!await checkPermissions(interaction.member._roles, rangePermission)) {
            interaction.reply({ content: 'No tienes permisos para utilizar esta herramienta', ephemeral: true })
            return;
        }

        let _approval = {
            _title: 'SE APLICARÁ',
            _type: null,
            _rule_id: null,
            _history: [],
        }

        switch (interaction.message.components[0].components[0].placeholder) {
            case 'LEVE':
                interaction.message.edit({ components: [RuleSelectMenu('soft')] });
                rangePermission = 5; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
                if (!await checkPermissions(interaction.member._roles, rangePermission)) {
                    interaction.reply({ content: 'No tienes permisos para aplicar faltas leves', ephemeral: true })
                    return;
                }
                _selected_type = 'FALTA LEVE';
                _approval = {
                    _title: 'SE APLICARÁ UNA FALTA',
                    _type: 'LEVE',
                    _rule_id: interaction.values,
                    _history: [],
                }
                break;
            case 'GRAVE':
                interaction.message.edit({ components: [RuleSelectMenu('serious')] });
                rangePermission = 4; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
                if (!await checkPermissions(interaction.member._roles, rangePermission)) {
                    interaction.reply({ content: 'No tienes permisos para aplicar faltas graves', ephemeral: true })
                    return;
                }
                _selected_type = 'FALTA GRAVE';
                _approval = {
                    _title: 'SE APLICARÁ UNA FALTA',
                    _type: 'GRAVE',
                    _rule_id: interaction.values,
                    _history: [],
                }
                break;
            case 'TEMPORAL':
                interaction.message.edit({ components: [RuleSelectMenu('temporary')] });
                rangePermission = 3; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
                if (!await checkPermissions(interaction.member._roles, rangePermission)) {
                    interaction.reply({ content: 'No tienes permisos para aplicar baneos temporales', ephemeral: true })
                    return;
                }
                _selected_type = 'BAN TEMPORAL';
                _approval = {
                    _title: 'SE APLICARÁ UN BAN',
                    _type: 'TEMPORAL',
                    _rule_id: interaction.values,
                    _history: [],
                }
                break;
            case 'PERMANENTE':
                interaction.message.edit({ components: [RuleSelectMenu('permanent')] });
                rangePermission = 3; // 5 = Administrator - Staff, 4 = Admin - Moderator, 3 = Admin - Organizador, 2 = Admin - CoAdmin, 1 = Admin, 0 = None
                if (!await checkPermissions(interaction.member._roles, rangePermission)) {
                    interaction.reply({ content: 'No tienes permisos para aplicar baneos permanentes', ephemeral: true })
                    return;
                }
                _selected_type = 'BAN PERMANENTE';
                _approval = {
                    _title: 'SE APLICARÁ UN BAN',
                    _type: 'PERMANENTE',
                    _rule_id: interaction.values,
                    _history: [],
                }
                break;
            default:
                break;
        }

        interaction.deferUpdate();

        let _embed_message_id;
        interaction.channel.send({ embeds: [MentionEmbed(_approval, _selected_type)] }).then(msg => {
            _embed_message_id = msg.id;
        });

        setTimeout(() => interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, { ViewChannel: true, ReadMessageHistory: false }), 1000);

        interaction.channel.permissionOverwrites.create(interaction.user.id, { SendMessages: true });

        // Filter to only accept messages from the user who used the command, the m.author.id only works inside awaitMessages as a filter.
        const msg_filter = (m) => m.author.id === interaction.member.id;
        interaction.channel.awaitMessages({ filter: msg_filter, max: 1 }).then(async collected => {
            interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, { ViewChannel: false, ReadMessageHistory: false });
            interaction.channel.permissionOverwrites.delete(interaction.user.id, { SendMessages: false });
            const embed = await interaction.channel.messages.fetch(_embed_message_id);
            let answerMessage = collected.first();
            let _punished = answerMessage.mentions.users.first();
            if (!_punished) {
                if (answerMessage.content.replace(/[^0-9.]/g, '') === '' ||
                    answerMessage.content.replace(/[^0-9.]/g, '').length !== 18 ||
                    interaction.guild.channels.cache.get(answerMessage.content.replace(/[^0-9.]/g, ''))
                ) {
                    answerMessage.delete();
                    embed.edit({ embeds: [ErrorEmbed('No has introducido una ID válida.')] }).then(msg => {
                        setTimeout(() => msg.delete(), 3000);
                    });
                    return
                } else {
                    _punished = {
                        id: answerMessage.content.replace(/[^0-9.]/g, '')
                    }
                }
            }

            const _punishments = await getPunishments(_punished.id);
            if (_punishments) {
                _punishments.forEach(_punishment => {
                    _approval._history.push({
                        _discord_timestamp: _punishment._discord_timestamp,
                        _rule_id: _punishment._rule_id,
                        _type: _punishment._type,
                        _log_message_url: _punishment._log_message_url,
                    })
                });
            }
            let _button_label
            let _button_emoji
            switch (_approval._type) {
                case 'LEVE':
                    _button_label = 'Aplicar falta leve'
                    _button_emoji = '<:FALTA_DANGER:1059189801082966037>'
                    break;
                case 'GRAVE':
                    _button_label = 'Aplicar falta grave'
                    _button_emoji = '<:FALTA_DANGER:1059189801082966037>'
                    break;
                case 'TEMPORAL':
                    _button_label = 'Banear temporalmente'
                    _button_emoji = '<:BAN_DANGER:1059189799573004349>'
                    break;
                case 'PERMANENTE':
                    _button_label = 'Banear permanentemente'
                    _button_emoji = '<:BAN_DANGER:1059189799573004349>'
                    break;
                default:
                    break;
            }
            embed.edit({ embeds: [ApprovalEmbed(_approval, _punished)], components: [ApprovalButtons(_approval._type, _button_emoji, _button_label)] }).then(answerMessage.delete())
        })
    }
}