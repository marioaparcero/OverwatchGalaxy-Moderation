module.exports = {

  name: 'ready',
  once: true,
  execute(client) {
    let handler = require('../command-handler');
    if (handler.default) handler = handler.default;
    handler(client);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },

};