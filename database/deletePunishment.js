/* eslint-disable no-console */
/* eslint-disable camelcase */
const { database, ObjectId } = require('./db.js')
module.exports = {
  async deletePunishment(_id) {
    try {
      const _punishments = database('DISCORD').collection('_punishments')
      _punishments.deleteOne({ _id: ObjectId(_id) })
    } catch (err) {
      console.log(err.stack)
    }
  },
}