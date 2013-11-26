//HSBNE IRC Bot
var irc = require('irc');
var bot = new irc.Client('chat.freenode.net', 'HSBNEBot' || 'borkbott', {
    botName: 'botbott',
    userName: 'hsbnebot',
    channels: ['#hsbne'],
    port: 8001,
    debug: true,
    showerrors: true
});

var YQL = require("yql");
 
bot.addListener('message', function(from, to, message) {
    if(  message.indexOf('http') > -1 ) {
            var regex = new RegExp(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/); 
                        if ( regex.test(message)) {
                        var httpurl = message.match(regex);
                        // Request URL's title using YQL
                        
                        new YQL.exec('select * from data.html.cssselect where url="' + httpurl[0].toString() + '" and css="title"', function(response) {
                            if (response.query.results.results && typeof response.query.results.results.title != 'undefined') {
                            var title = response.query.results.results.title;
                            // Say the resulting title.
                            bot.say(to, "Title: " + title);
                            }
                                                    });
                        }
    }
    if(  message.indexOf('macbeth') > -1 ) {
        bot.say(to, "The Scottish Play?"); 
    }
    if(  message.indexOf('weather?') > -1 ) { 
            new YQL.exec('SELECT * FROM weather.bylocation WHERE location="Brisbane" AND unit="c"', function(response) {
                if (response.results.weather.rss.channel.item) {
                    var weatherduh = "Temperature: " + response.results.weather.rss.channel.item.temp + " Weather: " +  response.results.weather.rss.channel.item.text;
                    bot.say(to, weatherduh); 
                }
            });
    
    }
});
        
 bot.addListener('error', function(message) {bot.say('#hsbne', message);});
