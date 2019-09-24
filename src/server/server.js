'use strict';
const WebSocket = require('ws');
const JR = require('@etk/jsonrpc');

const jr = new JR;
// const request = new jr.Request();
const response = new jr.Response();
const server = new WebSocket.Server({
    port: 8080
});
const users = [{name: "", socket: []}];
const channels = [{name: "all", users: []}];
console.log('Server on');

server.on('connection', function connection(socket) {
    socket.on('message', function incoming(message) {
        let mess = jr.parse(message);
        console.log(mess.getParams().name);
        switch (mess.getMethod()) {
            case "register":
                const user = {name: mess.getParams().name, socket: socket};
                users.push(user);
                const result = channels.find((value) => value.name === 'all');
                if (result) {
                    result.users.push(user);
                }
                console.log(`server: User ${mess.getParams().name} connected`);
                break;
            case "all":
                socket.send(message);
                console.log(mess.resource + ': ' + mess.getParams().message);
                break;
            case "check_channel":
                console.log('wchodze');
                const name = mess.getParams().name;
                const findUser = users.find((value) => value.name === name);
                response.setId(mess.id); //this must be integer
                response.setResult({check_channel: !!findUser, name: name});

                socket.send(response.toString());
                console.log('dochodze');
                break;
        }
    });
});