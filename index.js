const Discord = require('discord.js');

var http = require('http');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if (msg.content === '!chuck') {
        var request = http.request({
            port: 80,
            host: 'chucknorrisfacts.fr',
            method: 'GET',
            path: '/api/get?data=nb:1;tri:alea'
        });

        request.on('response', function( res ) {
            res.setEncoding('utf8');
            res.on('data', function( data ) {
                json = JSON.parse(data);
                console.log(msg.user.User.username + '#' + msg.user.User.discriminator);
                msg.reply(entities.decode(json[0].fact));
            } );
        } );
        request.end();
    }else if (msg.content === '!infos') {
        var texte = `BotNorris a été developpé par Azorgh (azorgh.ow@gmail.com).\nHébergé sur Heroku, il utilise les Fact de http://www.chucknorrisfacts.fr.`;
        msg.reply(texte);
    }
});

client.login('**REMOVED**');