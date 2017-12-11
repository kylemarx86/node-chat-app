var socket = io();   //initiates request. makes request from client to server to open up web socket and keep the socket open


socket .on('connect', function() {
    console.log('connected to server');
});

socket.on('newMessage', function(message) {
    console.log('Received new message', message);
    var li = $('<li>').text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
})