const WebSocket = require('ws');
const fs = require('fs');


const server = new WebSocket.Server({port: 8080});

server.on('connection', ws => {
    ws.on('message', message => {
        fs.appendFileSync('./logs.txt', message);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.send("Привет из чата");
    ws.send(fs.readFileSync('./logs.txt').toString())
});

