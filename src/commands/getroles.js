const Discord = require("discord.js")
const rbx = require("roblox-js")
exports.run = (Client, message, args) => {
const db = Client.db.get(message.author.id)
  console.log(db.username)
  rbx.getIdFromUsername(db.username).then(foundId => {
    rbx.getRankInGroup(process.env.GROUP_ID, foundId).then(foundRank => {
      console.log(foundRank)
      rbx.getRankNameInGroup(process.env.GROUP_ID, foundId).then(rankName => {
        console.log(rankName)
let rankName2 = message.guild.roles.find(r => r.name === rankName)
 message.member.roles.add(rankName2)
  const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${foundId}&width=420&height=420&format=png`)
.setTitle("Update Roles")
.setDescription("Your roles are up to date!")
.addField("Username:", db.username)
.addField("User ID:", foundId)
.addField("Group Rank:", rankName)
.setFooter("Gave "+ db.username + " " + "The " + rankName + ".")
.setTimestamp()
  message.channel.send(embed)
  })
  })
  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  args: [""]
};


exports.help = {
name: "getroles",
category: "Verification",
description: "updates Discord user with ROBLOX user.",
usage: "getroles"
};