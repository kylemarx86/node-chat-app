'use strict';

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// var server = http.createServer((req, res) => {

// });
var server = http.createServer(app);
var io = socketIO(server);      // io is now the websocket server
var users = new Users();
var rooms = new Rooms();        // list of users in rooms. needs to persist?. index page needs to access

// express static middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('joinLobby', (callback) => {
        socket.join('lobby');
        
        // emit rooms to user in lobby
        socket.emit('updateRoomsList', JSON.stringify(rooms));
        callback();
    });

    socket.on('join', (params, callback) => {
        // if( !isRealString(params.name) || !isRealString(params.room)){
        //     return callback('Name and room name are required.');
        // }
        
        // fail join if name parameter is missing
        if( !isRealString(params.name) ){
            return callback('Name and room name are required.');
        }

        // fail join if both room and rooms parameters are empty
        if( !isRealString(params.room) && !isRealString(params.rooms) ){
            return callback('Name and room name are required.');
        }

        // room and rooms parameters can be different and prevent users from being in same room
        // chose which parameter to use ROOM or ROOMS
        if( isRealString(params.rooms) ){
            params.room = params.rooms;
            delete params.rooms;
        }


        // determine if the room or rooms param should be used
            // get rid of other param

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        // update rooms and lobby
        rooms.addUserToRoom(params.room);
        io.to('lobby').emit('updateRoomsList', JSON.stringify(rooms));
        
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            var room = rooms.removeUserFromRoom(user.room);
            io.to('lobby').emit('updateRoomsList', JSON.stringify(rooms));

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});