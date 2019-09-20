'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;

const server = new WebSocket.Server({
    port: 8080
});

const chanels  = ['all'];
console.log('Server on');

server.on('connection', function connection(socket){
   socket.on('message', function incoming(message) {
       let mess = JSON.parse(message);
       switch (mess.method) {
           case "register":
               chanels.push = mess.params.name;
               console.log(`server: User ${mess.params.name} connected`);
               break;
           case "all":
               socket.send(message);
               console.log(mess.resource + ': ' + mess.params.message);
               break;
       }
   });
});