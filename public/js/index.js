var socket = io();   //initiates request. makes request from client to server to open up web socket and keep the socket open

socket .on('connect', function() {
    console.log('connected to server');
});

socket.on('newMessage', function(message) {
    console.log('Received new message', message);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});