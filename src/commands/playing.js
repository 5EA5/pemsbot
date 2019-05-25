const Discord = require("discord.js")
exports.run = (client, message, args) => {
  if(!args[0]) return;
  if(args[0] === 'Hey') return message.reply('Please tell me a real game to play!');
  args = args.join(" ");
  const embed22 = new Discord.MessageEmbed()
  .setAuthor(client.user.username,client.user.displayAvatarURL())
  .setThumbnail(client.user.displayAvatarURL())
  .setColor(0X2355CF)
  .setDescription(`I am now playing \`${args}\`.`)
message.channel.send(embed22)
  client.user.setPresence({activity: {type: 'PLAYING', name: args}});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["game"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: 'playing',
  description: 'Changes the "Playing" status (game).',
  usage: 'playing [game name]',
  category: 'Bot Developers'
};
