/* eslint-disable no-console */
/* eslint-disable camelcase */
const { database } = require('./db.js')

module.exports = {
  async addPunishment(_punishment, _punished, _punisher) {
    try {
      const punishments = database('DISCORD').collection('_punishments')
      return punishments.insertOne({
        _punished_id: _punished._discord_id,
        _punisher_id: _punisher._discord_id,
        _type: _punishment._type,
        _rule_id: _punishment._rule_id,
        _date: _punishment._date,
        _timestamp: _punishment._timestamp,
      })
    } catch (err) {
      console.log(err.stack)
    }
  },
}
