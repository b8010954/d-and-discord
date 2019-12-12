var Discord = require('discord.io');
var logger = require('winston');
const fetch = require('node-fetch');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: process.env.BOT_TOKEN,
    autorun: true
});

const prefix = '!';
bot.on('ready', function(evt){
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt) {
    //the bot will need to listen for messages starting with '!'
    if(message.substring(0, 1) == prefix){
        var args = message.substring(1).split(' ');
        var args2 = message.substring(7).split(" ").join("-");
        var args3 = message.substring(6).split(" ").join("-");
        var args4 = message.substring(8).split(" ").join("-");
        var args5 = message.substring(9).split(" ").join("-");
        var args6 = message.substring(11).split(" ").join("-");
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            //!ping
            case 'ping':
                console.log(args2);
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'spell':
            //!spell "spellname"
                console.log(args2);
                fetch('https://api.open5e.com/spells/' + args2 + '/?format=json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                        to: channelID,
                        message: json.name + '\n' + json.desc + '\nRange: ' + json.range + '\nComponents: ' + json.components + '\nMaterial: ' + json.material + '\nCasting time: ' + json.casting_time + '\nDuration: ' + json.duration + '\nClasses: ' + json.dnd_class
                }))
                break;
            case 'class':
            //!class "classname"
                console.log(args2);
                fetch('https://api.open5e.com/classes/' + args2 + '/?format?json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                    to: channelID,
                    message: json.name + '\nHit Dice: ' + json.hit_dice + '\nHP at first level: ' + json.hp_at_1st_level + '\nHP at higher levels: ' + json.hp_at_higher_levels + '\nArmour Proficiency: ' + json.prof_armor + '\nWeapon Proficiency: ' + json.prof_weapons + '\nSaving Throw Proficiencies: ' + json.prof_saving_throws + '\nSkill Proficiencies: ' + json.prof_skills 
                }))
                break;
            case 'race':
            //!race "racename"
                console.log(args3);
                fetch('https://api.open5e.com/races/' + args3 + '/?format?json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                    to: channelID,
                    message: json.name + '\n' + json.desc.replace(/#/g, '') + '\n' + json.asi_desc.replace(/#/g, '') + '\n' + json.age.replace(/#/g, '') + '\n' + json.alignment.replace(/#/g, '') + '\n' + json.size.replace(/#/g, '') + '\n' + json.speed_desc.replace(/#/g, '') + '\n' + json.languages.replace(/#/g, '') + '\n' + json.vision.replace(/#/g, '')
                }))
                break;
            case 'weapon':
            //!weapon "weaponname"
                console.log(args4);
                fetch('https://api.open5e.com/weapons/' + args4 + '/?format?json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                    to: channelID,
                    message: json.name + '\nCategory: ' + json.category + '\nCost: ' + json.cost + '\nDamage: ' + json.damage_dice + '\nDamage Type: ' + json.damage_type               
                }))
                break;
            case 'monster':
            //!monster "monstername"
                console.log(args5);
                fetch('https://api.open5e.com/monsters/' + args5 + '/?format?json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                    to: channelID,
                    message: json.name + '\nType: ' + json.type +'\nSize: ' + json.size + '\nAlignment: ' + json.alignment + '\nArmour Class: ' + json.armor_class + '\nWalking Speed: ' + json.speed.walk + '\n***Stats:*** ' + '\nStrength: ' + json.strength + '\nDexterity: ' + json.dexterity + '\nConstitution: ' + json.constitution + '\nIntelligence: ' + json.intelligence + '\nWisdom: ' + json.wisdom + '\nCharisma: ' + json.charisma + "\nVulnerabilities: " + json.damage_vulnerabilities + '\nResistances: ' + json.damage_resistances + '\n***Immunities:*** ' + '\nDamage Immunities: ' + json.damage_immunities + '\nCondition Immunities: ' + json.condition_immunities + '\nSenses: ' + json.senses + '\nLanguages: ' + json.languages + '\nChallenge Rating: ' + json.challenge_rating
                }))
                break;
            case 'condition':
            //!condition "conditionname"
                console.log(args6);
                fetch('https://api.open5e.com/conditions/' + args6 + '/?format?json')
                .then(res => res.json())
                .then(json => bot.sendMessage({
                    to: channelID,
                    message: json.name + '\n' + json.desc.replace('* ', '')
                }))
                break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'For spells, use !spell spellname,\nFor classes, use !class classname,\nFor races, use !race racename,\nFor weapons, use !weapon weaponname,\nFor monsters, use !monster monstername,\nFor conditions, use !condition conditionname.'
                })
        }
    }
});