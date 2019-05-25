const Discord = require("discord.js")
const rbx = require("roblox-js")

exports.run = async (Client, message, args) => {
let S = Client.settings.get(message.guild.id)  
 
const db = Client.db.get(message.author.id)
  
Client.db.set(message.author.id, Client.config.users)
  let msg = await message.channel.send("Awaiting Prompt")
  
  if(db.id != "none") {
   message.channel.send(`You are already verified as ${db.username}. Role has been given`) 
   return  message.member.roles.add(message.guild.roles.find(r => r.name == "Verified"))
  }


  
  function makeid() {
    var text = "";
    var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋'];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
  }

  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" })
  const robloxEmbed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("❓ What's your ROBLOX username?")
.setFooter("This prompt will cancel after 200 seconds.")
.setTimestamp()
  msg.edit(robloxEmbed)
  
 collector.on("collect", m => {
   if(m.content === 'cancel' || m.content === 'Cancel') {
     message.channel.send('**Cancelled prompt.**')
     return
   }
   rbx.getIdFromUsername(m.content).then(foundId => {
     const Id = foundId
     const newString = makeid() + makeid() + makeid() + makeid() + makeid()
   const foundUsername = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("Hello **" + m.content + "**, to verify that you are that user. Please put this in your blurb, or status. \n `" + newString + "`\n\nSay **done** when complete.\nSay **cancel** to cancel. ")
.setFooter("Player ID is " + foundId)
.setTimestamp()
  msg.edit(foundUsername)
       const collector2 = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" })
collector2.on('collect', async mag => {
      if(mag.content.includes('done') && mag.author.id == message.author.id) {
        const fetchingBlurb = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle("Prompt")
.setDescription("Fetching your emojis, please wait as I am going to fetch it.")
.setFooter("Fetching..")
.setTimestamp()
          msg.edit(fetchingBlurb)
        setTimeout(function() {
rbx.getStatus(foundId).then(status => {
            console.log(status)
          rbx.getBlurb(foundId).then(blurb => {
            if(status.includes(newString) || blurb.includes(newString)) {
              const verified = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle("Prompt")
.setDescription("You have now been verified! Please wait shortly as you are going to recieve the Verified role.")
.setFooter("Verifying..")
.setTimestamp()
               msg.edit(verified)
              message.member.roles.add(message.guild.roles.find(r => r.name == "Verified"))
              message.member.setNickname(m.content)
              const idk = Client.db.get(message.author.id)
              idk.username = m.content
              idk.id = foundId
Client.db.set(message.author.id, idk)


               } else {
               message.channel.send("Can not find the emojis.")
               }
          })
        }, 5000)
      })
      } else
        if(mag.content.includes('cancel') && mag.author.id == message.author.id) {
          message.channel.send('**Cancelled prompt.**')
                               return
        }
    })
 })
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};


exports.help = {
name: "verify",
category: "Verification",
description: "Verifys Discord user with ROBLOX user.",
usage: "verify <username | id>"
};