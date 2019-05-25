const rbx = require("noblox.js")
const Discord = require("discord.js")
exports.run = async (client, message) => {  
var onShout = rbx.onShout(process.env.GROUP_ID)
var set = message.settings
onShout.on('data', function(post) {
  var a = client.channels.get(`508390839710515200`); //changed to channel id
  var username = post.poster.username
  if (username){
    rbx.getIdFromUsername(username)
      .then(function(rank){
        const embed = new Discord.MessageEmbed()
          .setTitle("**GROUP SHOUT**")
          .addField("Shout by: ", username)
          .addField("Shout", post.body)
        //  .setThumbnail(LINK HERE)
          .setColor("BLUE")
        return client.channels.get(a.id).send({embed})
      });
    };
});

onShout.on('error', function(err) {
  console.error(err.stack);
});

console.log("[NOBLOX] LOaded onShout.js")
}
exports.type = {
 type: "group" 
}