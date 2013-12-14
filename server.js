//HSBNE IRC Bot
var http = require("http")
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
    if(  message.indexOf('we should') > -1 ) {
        bot.say(to, message.replace(/(.*?)we should/, (from + " should") ));
    }
});
        
bot.addListener('error', function(message) {bot.say('#hsbne', message);});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
http.createServer(function(request,response){  
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello I are IRCbot!");
        response.end();
}).listen(port, ip);  
console.log("Server Running on " + port); 