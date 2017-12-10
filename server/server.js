const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// var server = http.createServer((req, res) => {

// });
var server = http.createServer(app);
var io = socketIO(server);      // io is now the websocket server

// express static middleware
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('newMessage', {
        from: 'the_count',
        text: 'blah',
        cretaedAt: 1234
    });

    socket.on('createMessage', (message) => {
        console.log('create message:', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});