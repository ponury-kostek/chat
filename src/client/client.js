'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;
const request = jr.Request();
const userName = 'User' + Math.floor(Math.random() * 6) + 1;

console.log('You are connected as ' + userName);
request.setResource(userName).setMethod('all').setParams({'message' : 'value'});

const socket = new WebSocket('socket://localhost:8080');

socket.on('open', function open(){
    socket.send(request.toString());
})