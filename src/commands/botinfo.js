const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    message.channel.send(botembed);
}

exports.conf = {
  name: 'botinfo',
  description: 'shows the bot info.',
  usage: 'botinfo',
  permLevel: "User"
}

exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot',
  usage: 'botinfo'
};