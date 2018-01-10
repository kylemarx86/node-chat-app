var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('joinLobby', function(err) {
        console.log('Joined lobby');
        if(err){
            alert(err);
            window.location.href = '/';
        } else{
            console.log('no error');
        }
    });
});

socket.on('updateRoomsList', function(rooms) {
    var roomsList = JSON.parse(rooms);
    roomsList = roomsList.rooms;
    console.log('rooms:', roomsList);

    updateRoomList(roomsList);
});

function updateRoomList(rooms){
    var $roomSelector = $('select[name=rooms]');
    $roomSelector.empty();
    var $option = $('<option>').attr('value', '');
    $roomSelector.append($option);
    for(var i = 0; i < rooms.length; i++){
        var $option = $('<option>').attr('value', rooms[i].name).text(rooms[i].name);
        $roomSelector.append($option);
    }
}