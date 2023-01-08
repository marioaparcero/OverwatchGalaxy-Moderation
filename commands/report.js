// const Discord = require('discord.js');

// module.exports = {

//     callback: (message) => {
//         message.channel.messages
//             .fetch({ limit: 1 })
//             .then((messages) => {
//                 messages.forEach(function (message, messageID) {
//                     message.delete();
//                 });
//             })
//             .catch(console.error);

//         const LOCATION = new Discord.MessageEmbed()

//             .setColor("#2f3136")

//             .setImage(
//                 "https://cdn.discordapp.com/attachments/967876853736013906/970333718629716068/SUPPORT.png"
//             )

//             .addFields({
//                 name: "🆘",
//                 value:
//                     "Para abrir un ticket haz click en el botón **ABRIR TICKET**\n",
//             });

//         let confirmation = new Discord.MessageActionRow().addComponents(
//             new Discord.MessageButton()
//                 .setStyle("LINK")
//                 .setURL("https://tawk.to/chat/61eda8dab9e4e21181bb730d/1fq45n649")
//                 .setEmoji("🆘")
//                 .setLabel("ABRIR TICKET"),

//             new Discord.MessageButton()
//                 .setStyle("LINK")
//                 .setURL("https://tawk.to/chat/628b77887b967b117990c5fb/1g3oclr8t")
//                 .setEmoji("☢️")
//                 .setLabel("REPORTAR TRAMPAS")

//         );

//         message.channel.send({
//             embeds: [LOCATION],
//             components: [confirmation],
//         });
//     },
// };
