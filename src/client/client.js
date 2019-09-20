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

        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        socket.send(request.toString());
        console.log('You are connected as ' + userName);
    });

    rl.on('line', (writeMessage) => {
        request.setResource(userName).setMethod('all').setParams({'message' : writeMessage});
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log(`You: ${writeMessage}`);
        socket.send(request.toString());
    });
})

