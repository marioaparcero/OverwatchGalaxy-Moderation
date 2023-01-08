// const Discord = require('discord.js');

// module.exports = {

//   callback: async (message) => {

//     let banned_channel = message.guild.channels.cache.get('929879157280747561');
//     let public_banned_channel = message.guild.channels.cache.get('1003808936564117595');


//     const { Collection } = require('discord.js');

//     async function fetchMore(channel, limit = 250) {
//       if (!channel) {
//         throw new Error(`Expected channel, got ${typeof channel}.`);
//       }
//       if (limit <= 100) {
//         return channel.messages.fetch({ limit });
//       }

//       let collection = new Collection();
//       let lastId = null;
//       let options = {};
//       let remaining = limit;

//       while (remaining > 0) {
//         options.limit = remaining > 100 ? 100 : remaining;
//         remaining = remaining > 100 ? remaining - 100 : 0;

//         if (lastId) {
//           options.before = lastId;
//         }

//         let messages = await channel.messages.fetch(options);

//         if (!messages.last()) {
//           break;
//         }

//         collection = collection.concat(messages);
//         lastId = messages.last().id;
//       }

//       return collection;
//     }

//     const messages = await fetchMore(banned_channel);

//     messages.forEach(msg => {

//       if (msg.embeds[0].fields[3]) {

//         if (msg.embeds[0].fields[3].value == '> **Uso, distribución o venta de trampas**') {


//           let punished_member = msg.embeds[0].fields[0].value;
//           let date = msg.embeds[0].fields[2].value;

//           let PUBLIC_EMBED = new Discord.MessageEmbed()
//             .setColor('#0099ff')
//             .addFields(
//               { name: '`👤 Miembro baneado`', value: `${punished_member}`, inline: true },
//               { name: '`📑 Motivo:`', value: `Ha sido baneado por uso de hack o boosteo con hacks.`, inline: true },
//               { name: '`📅 Fecha`', value: `${date}` },
//             )

//           public_banned_channel.send({ embeds: [PUBLIC_EMBED] })

//         }
//       } else {

//       }

//     });

//   }

// }