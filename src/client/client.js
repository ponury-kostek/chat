'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');
const readline = require('readline');

const jr = new JR;
const request = jr.Request();
const socket = new WebSocket('socket://localhost:8080');
let userName = '';
let channel = 'all';

function clean() {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
}

socket.on('open', function open(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What is your name? \n', (answer) => {
        userName = answer;
        channel = 'all';
        request.setResource(userName).setMethod('register').setParams({'name' : answer});
        clean();
        socket.send(request.toString());
        console.log('You are connected as ' + userName);
    });

    rl.on('line', (writeMessage) => {
        switch (writeMessage) {
            case '/help':
                console.log('/help - Open commends list\n/all - Change channel for message to all users\n/pm - Open channel for private massage');
                break;
            case '/all':
                if(channel === 'all') {
                    console.log('You are already on this channel');
                } else {
                    channel = 'all';
                    console.log('You are switch on channel all');
                }
                break;
            case '/mp':
                rl.question('Who do you to send a message to?\n', (answer) => {
                    request.setResource(userName).setMethod('check_channel').setParams({'name' : answer});
                    socket.send(request.toString());
                });
                break;
            default:
                request.setResource(userName).setMethod('all').setParams({'message' : writeMessage});
                console.log(`You: ${writeMessage}`);
                socket.send(request.toString());
                break;
        }
    });

    socket.on('message', function incoming (message) {
        const mess = JSON.parse(message);
        console.log(mess);
    })
})

