import http from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);
const server = http.createServer(app);

// ws server with http
const wss = new WebSocketServer({ server });

// fake database
const sockets = [];

// make ws event
wss.on('connection', (socket) => {
    // push socket info into sockets array
    sockets.push(socket);

    console.log('Connected to Browser ');

    socket.on('close', () => {
        console.log('Disconnected from the Browser');
    });
    socket.on('message', (message) => {
        // send message to all sockets in array
        sockets.forEach((aSocket) => {
            aSocket.send(message.toString());
        });
        // socket.send(message.toString());
    });
});

server.listen(3000, handleListen);
