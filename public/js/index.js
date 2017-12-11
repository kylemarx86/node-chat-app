var socket = io();   //initiates request. makes request from client to server to open up web socket and keep the socket open


socket .on('connect', function() {
    console.log('connected to server');
});

socket.on('newMessage', function(message) {
    console.log('Received new message', message);
    var $li = $('<li>').text(`${message.from}: ${message.text}`);
    $('#messages').append($li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newLocationMessage', function(message){
    var $li = $('<li>').text(`${message.from}: `);
    var $a = $('<a>').attr({'target':'_blank', 'href':`${message.url}`}).text('My current location');
    $li.append($a);
    $('#messages').append($li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var $messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: $messageTextbox.val()
    }, function() {
        $messageTextbox.val('');
    });
});

var $locationButton = $('#send-location');
$locationButton.on('click', function() {

    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    $locationButton.attr('disabled', 'disabled').text('Sending location...');;

    navigator.geolocation.getCurrentPosition(function(position) {
        $locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        $locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});