'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;

const server = new WebSocket.Server({
    port: 8080
});

server.on('connection', function connection(socket){
   console.log('serwer');
});