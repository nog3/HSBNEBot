//HSBNE IRC Bot
var irc = require('irc');
var bot = new irc.Client('chat.freenode.net', 'HSBNEBot' || 'borkbott', {
    botName: 'botbott',
    userName: 'hsbnebot',
    channels: ['#hsbnebot'],
    port: 8001,
    debug: true,
    showerrors: true
});

var YQL = require("yql");
 
bot.addListener('message', function(from, to, message) {
    if(  message.indexOf('http') > -1 ) {
            var regex = new RegExp(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/), httpurl = message.match(regex);
                        // Request URL's title using YQL
                        new YQL.exec('select * from data.html.cssselect where url="' + httpurl[0].toString() + '" and css="title"', function(response) {
                            if (response.query.results.results && typeof response.query.results.results.title != 'undefined') {
                            var title = response.query.results.results.title;
                            // Say the resulting title.
                            bot.say(to, "Title: " + title);
                            }
                                                    });
    }
        
    if(  message.indexOf('macbeth') > -1 ) { bot.say(to, "The Scottish Play?"); }
});

bot.addListener("names", function (to, nicknames) {
        //Sending a message to the channel when the bot connects
//        bot.say(to,"Hello everyone!");
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

var isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}