var socket = io();

$(document).ready(function(){
    enableClickHandlers();
});

function enableClickHandlers(){
    $('.tabs__tab').click(function(){
        tabClicked(this)
    });
}

function tabClicked($elt){
    console.log('tab was clicked');
    $elt = $($elt);
    // capture index of currently active tab
    var activeIndex = $elt.parent().find('.active').index();
    // check if index is that of currently active tab
    if($elt.index() !== activeIndex){
        // identify panel of tab that was clicked
        var $panel = $elt.parent().parent().parent();
        // unload content of currently active tab
        $panel.find('.content:not(.hidden)').addClass('hidden');
        // remove the class active from other tabs in descendents of the parent
        $elt.parent().find('.active').removeClass('active');
        // toggle the class active on this
        $elt.toggleClass('active');
        // load in content associated with respective tab
        $panel.find('.content').eq($elt.index()).toggleClass('hidden');
    }
}

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
    var $option = $('<option>').attr('value', '').text('Select a created room');
    $roomSelector.append($option);
    for(var i = 0; i < rooms.length; i++){
        var $option = $('<option>').attr('value', rooms[i].name).text(rooms[i].name);
        $roomSelector.append($option);
    }
}