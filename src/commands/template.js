const Discord = require('discord.js');//REQUIRE MODULES HERE

exports.run = (client, message, args/*you can edit this to [args1, args2]*/, level) => {
  const msg = message;
  //CODE HERE
  
};

exports.conf = {
  enabled: false,//ofc this tells if the command is enabled or not
  guildOnly: false,//you can make this respond to you in guilds only or both dm and guild.
  aliases: [],
  permLevel: "Bot Owner" //KEEP THIS WHAT IT IS
};

exports.help = {
  name: "commandname",//ex: reload
  description: "Description",//ex: reloads stuff
  usage: "Command => args"//ex: reload <command>
};