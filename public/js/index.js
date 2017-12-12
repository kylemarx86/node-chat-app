var socket = io();   //initiates request. makes request from client to server to open up web socket and keep the socket open


socket .on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    var $template = $('#message-template').html();
    var html = Mustache.render($template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createAt).format('h:mm a');

    var $template = $('#location-message-template').html();
    var html = Mustache.render($template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });
    $('#messages').append(html);


    // var $li = $('<li>').text(`${message.from} ${formattedTime}: `);
    // var $a = $('<a>').attr({'target':'_blank', 'href':`${message.url}`}).text('My current location');
    // $li.append($a);
    // $('#messages').append($li);
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