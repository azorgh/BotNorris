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
                msg.reply(entities.decode(json[0].fact));
            } );
        } );
        request.end();
    }
});

client.login('**REMOVED**');