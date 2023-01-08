/* eslint-disable no-console */
/* eslint-disable camelcase */
const { database, ObjectId } = require('./db.js')
module.exports = {
  async getPunishments(_discord_id) {
    try {
      const _punishments_collection = database('DISCORD').collection('_punishments')
      const _punishments = await _punishments_collection.find({ _punished_id: _discord_id }).toArray()

      if (_punishments.length > 0) {
        return _punishments
      } else {
        return null
      }
    } catch (err) {
      return null
    }
  },
  async getPunishmentById(_id) {
    try {
      const _punishments_collection = database('DISCORD').collection('_punishments')
      const _punishment = await _punishments_collection.find({ _id: ObjectId(_id) }).toArray()
      if (_punishment.length > 0) {
        return _punishment[0]
      } else {
        return null
      }
    } catch (err) {
      return null
    }
  }
}
