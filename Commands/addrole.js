const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You don't have the permission to run this command!");
  if(args[0] == "help"){
    message.reply("Usage: {prefix}addrole <user> <role>");
  }
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.reply("Couldn't find that user!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role!");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role!");
  await(rMember.addRole(gRole.id));


  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }

  message.delete();


}


module.exports.help = {
  name: "addrole"
}
