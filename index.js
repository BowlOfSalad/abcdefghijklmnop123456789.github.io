const Discord = require("discord.js");
const fs = require("fs")
const Client = new Discord.Client();

const commands = require("./commands.js");
const lib = require("./lib.js");

const token = JSON.parse(fs.readFileSync("Info.json")).token

Client.on("ready", () => {
    console.log("Bot online!");
    Client.user.setActivity('My Development', { type: 'WATCHING' });
})

Client.on("guildMemberAdd", member => {
    const guildNAME = Discord.Guild.name;
    member.send("Hello, " + guildNAME + ". Please read #rules and accept them by reacting to the message in #join");
})

Client.login(token);