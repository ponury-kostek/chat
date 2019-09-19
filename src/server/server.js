'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;

const server = new WebSocket.Server({
    port: 8080
});

console.log('Server on');

server.on('connection', function connection(socket){
   console.log('server: User connected');
   socket.on('message', function incoming(message) {
      console.log('User: ', message);
   });
});