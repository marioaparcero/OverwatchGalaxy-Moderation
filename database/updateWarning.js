/* eslint-disable no-console */
/* eslint-disable camelcase */
const { database } = require('./db.js')

module.exports = {
  async updatePunishment(_punishment) {
    try {
      const _punishments = database('DISCORD').collection('_punishments')
      return _punishments.updateOne({ _id: _punishment._id }, {
        $set: {
          _log_message_url: _punishment._log_message_url,
        },
      })
    } catch (err) {
      console.log(err.stack)
    }
  },
}
