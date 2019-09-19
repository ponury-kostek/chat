'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');
const readline = require('readline');

const jr = new JR;
const request = jr.Request();
const socket = new WebSocket('socket://localhost:8080');
const userName = 'User' + Math.floor(Math.random() * 6) + 1;




console.log('You are connected as ' + userName);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

socket.on('open', function open(){
    rl.on('line', (writeMessage) => {
        console.log(`You: ${writeMessage}`);
        request.setResource(userName).setMethod('all').setParams({'message' : writeMessage});
        socket.send(request.toString());
    });
})

