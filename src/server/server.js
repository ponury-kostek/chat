'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;

const server = new WebSocket.Server({
    port: 8080
});

console.log('Server on');

server.on('connection', function connection(socket){
   socket.on('message', function incoming(message) {
       let mess = JSON.parse(message);
       switch (mess.method) {
           case "register":
               console.log(`server: User ${mess.params.name} connected`);
               break;
           case "all":
               console.log(mess.resource + ': ' + mess.params.message);
               break;
       }
   });
});