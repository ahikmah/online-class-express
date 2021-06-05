require('dotenv').config();
const express = require('express');
const cors = require('cors');

const http = require('http');
const socketIO = require('socket.io');

const Router = require('./src/routers/router');
const app = express();
const server = http.createServer(app);

app.use(cors());
const io = socketIO(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['x-access-token'],
    },
});

io.on('connection', (socket) => {
    console.log(`${socket.id} has joined`);

    socket.on('send-message', (body, room, cb) => {
        console.log('Incoming message');
        cb({ status: true });
        // socket.broadcast.emit('message-received', body);
        if (room) {
            socket.to(room).emit('message-received', body);
        } else {
            socket.broadcast.emit('message-received', body);
        }
    });

    socket.on('private-room', (room, cb) => {
        socket.join(room);
        cb({ status: true });
    });
});

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'x-access-token');
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, PATCH, POST, DELETE, OPTIONS'
        );
        res.header('Access-Control-Allow-Headers', '*');
        return res.sendStatus(200);
    }
    next();
});

app.use(Router);

app.use((req, res) => {
    res.status(404).send('<h1>Page not Found!</h1>');
});

// app.listen(process.env.PORT);
server.listen(process.env.PORT, () => {
    console.log(`server is online on ${process.env.PORT}`);
});
