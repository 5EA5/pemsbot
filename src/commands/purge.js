exports.run = async (client, msg, args) => {


msg.channel.bulkDelete(args[0])

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'purge',
  description: 'Deletes messages from anyone in the channel (requires Manage Messages)',
  usage: 'purge [number of messages]'
};