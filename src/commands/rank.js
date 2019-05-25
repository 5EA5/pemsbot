// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox-js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTgxNzEwNTEyNTMwOTE1MzI4.XOjuIA.pVwLzAbjNtUkWbZy3ALZu_X0saQ";

client.login(token)


var cookie = '4A4277C84DEC439AB4CA08930138FB0DE98135FB0951B72A51358EBFB0BB2D4B50E168781F71DB1D62F1567102DB640868BBE51B7DAF8B3AC0C141669FB7C7DA3A67428FCA845D2F90BD5C92FC39B7E7C1BB5B5ADE6CD52DA56C2A7F8C80B84A17716D21895451044CAD73E7ED0805B959577040AFDBA9F5EB52764A50758F3240C5C9AF3CF6230C6E1506FA1896048B547DAD5A284B10778570CD67CB24423925FFBFF349F34A30AB734FF03FD38F1795B4E0944D2217AF0A6D6E56EBAEAA028C07101802FC7A1934DEDF03A873FCD47781DF0C686BF648BADC35C5A89F49F3CEF845C09CA36896BA8DEB8A9684BC73ECC5863E871240A3AC1643A34A48CBFBDC1FE584B4DF3E37A385898D43C46A8B3890DAE94B912647876A357DFA4FC9DF2FB9BAEB';
var prefix = '!';
var groupId = 4538060;
var maximumRank = 14;

function login() {
    return roblox.cookieLogin();
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["bot owner"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})