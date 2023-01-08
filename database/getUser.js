/* eslint-disable no-console */
/* eslint-disable camelcase */
const { database } = require('./db.js')

module.exports = {
    async getUser(_discord_id) {
        try {
            const _users = database('DISCORD').collection('_users')
            const _user = await _users.findOne({ _discord_id })

            if (_user) {
                return _user
            } else {
                return null
            }
        } catch (err) {
            return null
        }
    },
}
