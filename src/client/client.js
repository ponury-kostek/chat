'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;

const socket = new WebSocket('socket://localhost:8080');

socket.on('open', function open(){
    console.log('client');
})