/* eslint-disable camelcase */
const { MongoClient, ObjectId } = require('mongodb')
const { uri } = require('../libraries/db_config.json')
const client = new MongoClient(uri)

const database = (name) => {
  return client.db(name)
}

module.exports = { database, ObjectId }
