'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');
const readline = require('readline');

const jr = new JR;
const request = jr.Request();
const socket = new WebSocket('socket://localhost:8080');
var userName = '';

socket.on('open', function open(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What is your name? \n', (answer) => {
        userName = answer;
        request.setResource(userName).setMethod('register').setParams({'name' : answer});
        socket.send(request.toString());
        rl.clearLine(process.stdin, 0); // nie działa
        console.log('You are connected as ' + userName);
    });

    rl.on('line', (writeMessage) => {
        console.log(`You: ${writeMessage}`);
        request.setResource(userName).setMethod('all').setParams({'message' : writeMessage});
        socket.send(request.toString());
    });
})

