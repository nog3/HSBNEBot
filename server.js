//HSBNE IRC Bot
var irc = require('irc');
var bot = new irc.Client('chat.freenode.net', 'borkbott' || 'borkbott', {
    botName: 'botbott',
    userName: 'hsbnebot',
    channels: ['#hsbne'],
    port: 8001,
    debug: true
});

bot.addListener('message', function(from, to, message) {
    if(  message.indexOf('doge') > -1
      ) {
        bot.say(to, 'so wow');
        bot.say(to, 'much irc');
    }
});