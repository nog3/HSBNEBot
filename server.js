//HSBNE IRC Bot
var http = require("http"),
    irc = require('irc'),
    linksnip = require("linksnip"),
    url = require('url'),
    request = require('request');
var bot = new irc.Client('chat.freenode.net', 'HSBNEBot' || 'borkbott', {
    botName: 'botbott',
    userName: 'hsbnebot',
    channels: ['#hsbnebot'],
    port: 8001,
    debug: true,
    showerrors: true
});

bot.addListener('message', function(from, to, message) {
    if(  message.indexOf('http') > -1 ) {
            var regex = new RegExp(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/); 
                        if ( regex.test(message)) {
                        var httpurl = message.match(regex);
                        // Request URL's title.
                                linksnip(httpurl[0].toString(), function(results){
                                bot.say(to, "Title: " + JSON.stringify(results.title, null, 2));
                            });
                            
                        }
    }
    if(  message.indexOf('we should') > -1 ) {
        bot.say(to, message.replace(/(.*?)we should/, (from + " should") ));
    }
});
        
bot.addListener('error', function(message) {bot.say('#hsbne', message);});

var port = process.env.OPENSHIFT_NODEJS_IP || "8080";
//    ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
http.createServer(function(request,response){  
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello I are IRCbot!");
        response.end();
//}).listen(port, ip);  
}).listen(port);  
console.log("Server Running on " + port); 