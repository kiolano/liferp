const Discord = require("discord.js");
const bot = new Discord.Client()
const request = require('request');
const channelid = "625455518814568489";
const refresh = 120;
const maxPlayers = '32';
const wyspaName = 'nazwa';
const token = "NjI1NDUyNzE1MjQ5NzYyMzI0.XYfymQ.J5IzNj6XfLAg_EA4DI8ZBxOXyHk";
const wyspaIp = "51.83.149.213:30120";
const wyspaOff = "Prace Techniczne"

bot.on('ready', async () => {
    console.log("BeNi0 to jebany KOZAK");
    setInterval(async () => {
        const channel = bot.channels.find('id', channelid);
        if (channel) {
            await request(`http://${wyspaIp}/info.json`, async (error) => {
                if (error) {
                    channel.setName(wyspaOff);
                    bot.user.setActivity(wyspaOff, {
                        type: 'WATCHING',
                    });
                } else {
                    await request(`http://${wyspaIp}/players.json`, async (error, response, playerss) => {
                        let players = JSON.parse(playerss);
                        channel.setName(`${wyspaName}: ${players.length}-${maxPlayers}`);
                        bot.user.setActivity(`${players.length}/${maxPlayers} graczy`, {
                            type: 'PLAYING',
                        });
                    });
                }
            });
        } else {
            console.log(`Nie znaleziono kanału ${channelid}`);
        }
    }, refresh * 1000);
});

bot.login(token);