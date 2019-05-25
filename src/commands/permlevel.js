exports.run = async (client, message, User, level) => {// eslint-disable-line no-unused-vars
  
  if(User.length >= 1) {
    const friendly = client.config.permLevels.find(l => l.level === message.mentions.users.first().permLevel).name;
    message.reply(`That users permission level is: ${message.mentions.users.first().permLevel} - ${friendly}`);
  } else {
    const friendly = client.config.permLevels.find(l => l.level === level).name;
    message.reply(`Your permission level is: ${level} - ${friendly}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "permlevel",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};