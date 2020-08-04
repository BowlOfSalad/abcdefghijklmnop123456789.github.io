const Discord = require("discord.js");
const Client = new Discord.Client();
const fs =  require("fs");

const PREFIX = "!";

const Info = JSON.parse(fs.readFileSync("Info.json"));
const Quotes = JSON.parse(fs.readFileSync("Quotes.json"));

Client.on("ready", () => {
    console.log("Commands Loaded");
})

Client.on("message", msg=>{

    let args = msg.content.split(" ");    

    console.log(args);

    switch(args[0]){
        case '!ping':
            msg.channel.send("pong");
        break;

        case '!twitch':
            msg.channel.send("Check out Salad on Twitch, https://www.twitch.tv/saladwitharms");
        break;

        case '!question':

            function yn() {
                    const content = msg.content;
                    const voteMsg = content.substring(14);
                    msg.channel.send(voteMsg).then(msgReaction => {
                        msgReaction.react("👍")
                        .then(msgReaction.react("👎"));
                    });
                    msg.delete();
            }
            
            function Three() {
                const content = msg.content;
                const voteMsg = content.substring(12);
                msg.channel.send(voteMsg).then(msgReaction => {
                    msgReaction.react("1️⃣")
                    .then(msgReaction.react("2️⃣"))
                    .then(msgReaction.react("3️⃣"));
                });
                msg.delete();
            }

            function check() {
                if (!args[1]) return msg.reply("Error: No vote type");
                if(args[1] == "y/n") {yn()};
                if(args[1] == "3") {Three()};
            }

            if(msg.member.roles.some(r=>["Administrator"].includes(r.name))) {
                check();
            } else if (msg.member.roles.some(r=>["BIG BOIS"].includes(r.name))) {
                check();
            } else {
                msg.reply("You dont have permision to use that command");
            }
  
        break;

        case '!info':
            const infoEmbed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle("Info")
            .setDescription("Info about the bot")
            .addField("Creator", Info.creator)
            .addField("Version", Info.version)
            .addField("Current Server", msg.guild.name);
            msg.channel.send(infoEmbed);
        break;

        case '!help':
            const helpEmbed = new Discord.RichEmbed()
            .setColor(0x0000FF)
            .setTitle("Help")
            .setDescription("Commands you can use")
            .addField("Twitch", "This command gives you the link to my twitch")
            .addField("Info", "This gives you simple info about the bot")
            .addField("Quote", "Sends an insperational quote")
            .setFooter("All commands must be lowercase, he's VERY sensitive");
            msg.channel.send(helpEmbed);
        break;

        case '!clear':
            if(msg.member.roles.some(r=>["Administrator"].includes(r.name))) {
                if (!args[1]) return msg.reply("Error: No second argument defined")
            
                msg.channel.bulkDelete(args[1]);
            } else if (msg.member.roles.some(r=>["BIG BOIS"].includes(r.name))) {
                if (!args[1]) return msg.reply("Error: No second argument defined")
            
                msg.channel.bulkDelete(args[1]);
            } else {
                msg.reply("You dont have permision to use that command");
            }
            
        break;
        
        case '!quote':
            const Num = Math.trunc((Math.random() * 10));
            msg.channel.send(Quotes[Num]);
        break;
        
        /*
        case '!abcdefg':
           if (!msg.member.roles.some(role => role.id === '690776997344837663')) {
            msg.member.addRole('690776997344837663')
            .then(console.log(`Succesfuly added role to member ${msg.author.tag}`))
            .catch(console.error)
            }
           //('690776997344837663')
        break;
        */
        /*
        case '!rules':
            msg.delete();
            const RuleEmbed = new Discord.RichEmbed()
            .setColor("0xff5b5b")
            .setTitle("Rules")
            .addField("RULE NUMBER 1", "NO RACISM, SEXISM, OR ANY OTHER BAD ISM-ING")
            .addField("RULE NUMBER 2", "Self promo must be kept in #self-promo")
            .addField("RULE NUMBER 3", "Don't disrespect mods")
            .addField("RULE NUMBER 4", "DO NOT DM people who don't ask for it, if someone breaks this rule please block them after giving a mod a screenshot")
            .addField("RULE NUMBER 5", "This place is for good vibes! Any violations of rules will result in one warning, then a kick for a week, then a PERMANENT BAN")
            .addField("RULE NUMBER 6", "EVERYTHING must be SFW")
            .addField("RULE NUMBER 7", "#self-promo is for your own links. Do not promote discord servers, twitch or youtube channels, or other things unless you own them / manage them");
            msg.channel.send(RuleEmbed);
        break;
        */
    }
})

Client.login(Info.token);