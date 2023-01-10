const { addPunishment } = require('../database/addPunishment.js');
const { getPunishments } = require('../database/getPunishments');
const { getUser } = require('../database/getUser.js')
const { updatePunishment } = require('../database/updateWarning.js')
const { WarningEmbed, WarningLogEmbed } = require('../components/embeds/warning.js')
const { LogButtonsRow, UserButtonsRow } = require('../components/buttons/punishment.js')
const { Punished, Punisher, Punishment } = require('../classes/punish.js')
const channels_ids = require('../libraries/channels_ids.json')
const { Rules } = require('../libraries/rules.json');
const { AccumulatedBanEmbed, BanEmbed, BanLogEmbed } = require('../components/embeds/ban.js');
const Roles = require('../libraries/roles_ids.json');
const { ErrorEmbed } = require('../components/embeds/error.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (
            (interaction.customId !== 'approve-LEVE' && interaction.customId !== 'approve-GRAVE') &&
            (interaction.customId !== 'approve-TEMPORAL' && interaction.customId !== 'approve-PERMANENTE')
        ) return

        if (
            !interaction.member.roles.cache.has(Roles.Admin) && !interaction.member.roles.cache.has(Roles.Supervisor) &&
            !interaction.member.roles.cache.has(Roles.Moderator) && !interaction.member.roles.cache.has(Roles.Staff)
        ) return

        interaction.deferUpdate();

        const _server_name = interaction.guild.name;
        // Retrieving the information user object using ID inside embeded message fields.
        let _punished_discord_user = interaction.guild.members.cache.get(interaction.message.embeds[0].fields[0].value.split(' ')[0].replace(/[^0-9.]/g, ''));

        if (!_punished_discord_user) {
            _punished_discord_user = {
                id: interaction.message.embeds[0].fields[0].value.split(' ')[0].replace(/[^0-9.]/g, ''),
                displayName: null
            }
        }

        // Retrieving the information user object by interaction.
        const _punisher_discord_user = interaction.member;

        const _db_user = await getUser(_punished_discord_user.id);

        let _game_id = null;

        if (_db_user && _db_user._game_id) {
            _game_id = _db_user._game_id;
        }

        // Class Punisher which constructs the user that is givin the warning.
        const _punisher = new Punisher(
            _discord_id = _punisher_discord_user.id,
            _display_name = _punisher_discord_user.displayName
        );

        // Class Punished which constructs the user that is being warned.
        const _punished = new Punished(
            _discord_id = _punished_discord_user.id,
            _display_name = _punished_discord_user.displayName,
            _game_id = _game_id
        );

        // Class Punishment which constructs the warning that is being given.
        const _punishment = new Punishment(
            _id = null,
            _rule_id = interaction.message.embeds[0].fields[1].value.split(' ')[0],
            _type = null,
            _date = new Date().toLocaleString('es-ES', { timeZone: 'CET' }),
            _discord_timestamp = `<t:${Math.floor(Date.now() / 1000)}>`,
            _timestamp = Date.now(),
            _log_message_url = null,
        );

        // Function that is called when the warning is a serious warning.
        const TimeoutAmmount = async (_type) => {

            const punishments = await getPunishments(_punished._discord_id);
            let _punishment_count = 0;
            if (punishments && punishments.length > 0) {
                _punishment_count = punishments.filter(element => element._type === _punishment._type).length;
            }

            let _timeout_ammount = 0;
            switch (_punishment_count) {
                case 0: // 1st warning
                    _timeout_ammount = (60 * 60 * 1000);
                    break
                case 1: // 2nd warning
                    _timeout_ammount = ((3 * 60) * 60 * 1000);
                    break
                case 2: // 3rd warning
                    _timeout_ammount = ((12 * 60) * 60 * 1000);
                    break
                case 3: // 4th warning
                    _timeout_ammount = ((24 * 60) * 60 * 1000);
                    break
                case 4: // 5th warning
                    _punishment._type = 'PERMANENTE';
                    break
                default:
                    break
            }
            return _timeout_ammount;
        }


        const Warn = async (_type) => {
            // Function that is called to get the timeout ammount.
            const _timeout_ammount = await TimeoutAmmount(_type);
            return _punished_discord_user.disableCommunicationUntil(_punishment._timestamp + (_timeout_ammount), `${Rules[_punishment._rule_id - 1].description}`).catch((error) => {
                return {
                    _error: error,
                };
            });
        }

        // Function that is called to ban the user.
        const Ban = async () => {
            try {
                return _punished_discord_user.ban({ reason: `${Rules[_punishment._rule_id - 1].description}` }).catch((error) => {
                    return {
                        _error: error,
                    };
                });
            } catch (error) {
                return interaction.guild.members.ban(_punished_discord_user.id, { reason: `${Rules[_punishment._rule_id - 1].description}` }).catch((error) => {
                    return {
                        _error: error,
                    };
                });
            }
        }

        let _log_channel = interaction.guild.channels.cache.get(channels_ids[interaction.customId.split('-')[1]]);

        const sendBanEmbed = (_punishment) => {
            try {
                _punished_discord_user.send({ embeds: [BanEmbed(_punishment, _server_name)], components: [UserButtonsRow] }).catch(() => {
                    interaction.member.send({ embeds: [ErrorEmbed('No se ha podido enviar el mensaje de ban al usuario')] })
                })
            } catch (error) {

            }

        }

        const permissionCheck = async () => {
            try {
                if (
                    !_punished_discord_user.roles.cache.has(Roles.Admin) &&
                    !_punished_discord_user.roles.cache.has(Roles.Supervisor) &&
                    !_punished_discord_user.roles.cache.has(Roles.Moderator) &&
                    !_punished_discord_user.roles.cache.has(Roles.Staff)
                ) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return true;
            }
        }

        // const punisherPermission = (_punishment) => {
        //     let _permission = "NONE";
        //     if (_punisher_discord_user.roles.cache.has(Roles.Admin)) {
        //         _permission = "ADMIN";
        //     }
        //     else if (_punisher_discord_user.roles.cache.has(Roles.Supervisor)) {
        //         _permission = "SUPERVISOR";
        //     }
        //     else if (_punisher_discord_user.roles.cache.has(Roles.Moderator)) {
        //         _permission = "MODERATOR";
        //     }
        //     else if (_punisher_discord_user.roles.cache.has(Roles.Staff)) {
        //         _permission = "STAFF";
        //     }

        //     if (_permission === "NONE") {
        //         return false;
        //     }
        //     if (_punishment._type === "LEVE") {
        //         return true;
        //     }
        //     if (_punishment._type === "GRAVE" || _punishment._type === "TEMPORAL" || _punishment._type === "PERMANENTE") {
        //         if (_permission === "ADMIN" || _permission === "SUPERVISOR" || _permission === "MODERATOR") {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // }


        // Checks what type of warning is being set (soft) || (serious) then is setting the type  and the log channel where the embeded message will be sent.
        switch (interaction.customId) {
            case 'approve-LEVE':
                {
                    _punishment._type = 'LEVE'
                    setWarning().then(() => {
                        interaction.message.delete();
                    })
                }
                break
            case 'approve-GRAVE':
                {
                    _punishment._type = 'GRAVE'
                    const _warn = await Warn(_punishment._type);
                    if (!_warn._error) {
                        setWarning().then(() => {
                            interaction.message.delete();
                        })
                    } else if (_warn._error.code === 50013) {
                        interaction.member.send({ embeds: [ErrorEmbed('No se ha podido aplicar la falta debido a la falta de permisos')] }).then(() => {
                            interaction.message.delete();
                        })
                    } else {
                        interaction.member.send({ embeds: [ErrorEmbed('No se ha podido aplicar la falta, razón desconocida')] }).then(() => {
                            interaction.message.delete();
                        })
                    }
                }
                break
            case 'approve-TEMPORAL':
                {
                    if (await permissionCheck() !== true) {
                        interaction.member.send({ embeds: [ErrorEmbed('No se puede aplicar ban a los miembros del STAFF')] }).then(() => {
                            interaction.message.delete();
                        })
                        return
                    } else {
                        const _ban_check = () => {
                            return interaction.guild.bans.fetch(_punished_discord_user.id).catch((error) => {
                                return {
                                    _error: error,
                                };
                            })
                        }

                        isBanned = await _ban_check();

                        if (!isBanned._error) {
                            interaction.member.send({ embeds: [ErrorEmbed(`El usuario ya se encuentra baneado en el servidor ${interaction.guild.name}`)] }).then(() => {
                                interaction.message.delete();
                            })
                            return
                        } else {
                            _punishment._type = 'TEMPORAL'
                            sendBanEmbed(_punishment)
                            const _ban = await Ban();
                            if (!_ban._error) {
                                setBan(_ban).then(() => {
                                    interaction.message.delete();
                                })
                            } else if (_ban._error.code === 50013) {
                                interaction.member.send({ embeds: [ErrorEmbed('No se ha podido aplicar el ban debido a la falta de permisos')] }).then(() => {
                                    interaction.message.delete();
                                })
                            } else {
                                interaction.member.send({ embeds: [ErrorEmbed('No se ha podido aplicar el ban, razón desconocida')] }).then(() => {
                                    interaction.message.delete();
                                })
                            }
                        }
                    }
                }
                break
            case 'approve-PERMANENTE':
                {

                    if (await permissionCheck() !== true) {
                        interaction.member.send({ embeds: [ErrorEmbed('No se puede aplicar ban a los miembros del STAFF')] }).then(() => {
                            interaction.message.delete();
                        })
                        return
                    } else {

                        const _ban_check = () => {
                            return interaction.guild.bans.fetch(_punished_discord_user.id).catch((error) => {
                                return {
                                    _error: error,
                                };
                            })
                        }

                        isBanned = await _ban_check();
                        if (!isBanned._error) {
                            interaction.member.send({ embeds: [ErrorEmbed(`El usuario ya se encuentra baneado en el servidor ${interaction.guild.name}`)] }).then(() => {
                                interaction.message.delete();
                            })
                            return
                        } else {
                            _punishment._type = 'PERMANENTE'
                            sendBanEmbed(_punishment)
                            const _ban = await Ban();
                            if (!_ban._error) {
                                setBan(_ban).then(() => {
                                    interaction.message.delete();
                                })
                            } else if (_ban._error.code === 50013) {
                                interaction.member.send({ embeds: [ErrorEmbed('No se ha podido aplicar el ban debido a la falta de permisos')] }).then(() => {
                                    interaction.message.delete();
                                })
                            } else {
                                interaction.member.send({ embeds: [ErrorEmbed('No se ha podido banear al usuario, razón desconocida')] }).then(() => {
                                    interaction.message.delete();
                                })
                            }
                        }
                    }
                }

            default:
                break
        }

        // Inserts warning as a document into DB and sends embeded message to the user that is being warned and to a log channel.
        async function setWarning() {

            if (_punishment._type === 'PERMANENTE') {
                await addPunishment(_punishment, _punished, _punisher).then((_id) => {
                    _punishment._id = _id.insertedId;
                    _log_channel = interaction.guild.channels.cache.get(channels_ids["PERMANENTE"]);
                    _log_channel.send({ embeds: [BanLogEmbed(_punishment, _punished, _punisher)], components: [LogButtonsRow] }).then((_message) => {
                        _punishment._log_message_url = _message.url;
                        updatePunishment(_punishment)
                    });
                    try {
                        _punished_discord_user.send({ embeds: [AccumulatedBanEmbed(_punishment, _server_name)], components: [UserButtonsRow] });
                    } catch (error) {
                        interaction.member.send({ embeds: [ErrorEmbed('No se ha podido enviar el mensaje de ban al usuario.')] })
                    }
                    _punished_discord_user.ban({ reason: 'Acumulación de faltas graves' })
                })
            } else {
                await addPunishment(_punishment, _punished, _punisher).then(async (_id) => {
                    _punishment._id = _id.insertedId;
                    _punishment._type = _punishment._type
                    _log_channel.send({ embeds: [await WarningLogEmbed(_punishment, _punished, _punisher)], components: [LogButtonsRow] }).then((_message) => {
                        _punishment._log_message_url = _message.url;
                        updatePunishment(_punishment)
                    });
                    try {
                        _punished_discord_user.send({ embeds: [WarningEmbed(_punishment, _server_name)], components: [UserButtonsRow] });
                    } catch (error) {

                    }
                })
            }
        }

        // Inserts ban as a document into DB and sends embeded message to a log channel.
        async function setBan(_ban) {
            await addPunishment(_punishment, _punished, _punisher).then((_id) => {
                _punishment._id = _id.insertedId;
                _log_channel.send({ embeds: [BanLogEmbed(_punishment, _punished, _punisher, _ban)], components: [LogButtonsRow] }).then((_message) => {
                    _punishment._log_message_url = _message.url;
                    updatePunishment(_punishment)
                });
            })
        }
    }
}