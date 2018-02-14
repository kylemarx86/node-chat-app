var socket = io();

$(document).ready(function(){
    enableClickHandlers();
});

function enableClickHandlers(){
    $('.tabs__tab').click(function(){
        tabClicked(this);
    });
}

/**
 * controls displaying of content as tabs are switched between
 * @param {object} $elt - jQuery object representing the tab that was clicked
 */
function tabClicked($elt){
    $elt = $($elt);
    // capture index of currently active tab
    var activeIndex = $elt.parent().find('.active').index();
    // check if index is that of currently active tab
    if($elt.index() !== activeIndex){
        // identify panel of tab that was clicked
        var $panel = $elt.parent().parent().parent();
        // make form element related to currently active tab disabled
        $panel.find('.content:not(.hidden) .panel__input').prop('disabled', true);
        // unload content of currently active tab
        $panel.find('.content:not(.hidden)').addClass('hidden');
        // remove the class active from other tabs in descendents of the parent
        $elt.parent().find('.active').removeClass('active');
        // toggle the class active on this
        $elt.toggleClass('active');
        // load in content associated with respective tab
        $panel.find('.content').eq($elt.index()).toggleClass('hidden');
        // change disabled attr of content associated with respective tab
        $panel.find('.content').eq($elt.index()).find('.panel__input').prop('disabled', false);
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

    updateRoomList(roomsList);

    if(roomsList.length < 1 ){
        // remove click handler if no rooms are present
        $('.tabs__tab:nth-of-type(2)').off('click');
        $('.tabs__tab:nth-of-type(2)').addClass('disabled');
    } else {
        // re-enable click handler if there are rooms present and the tab is currently disabled
        $('.tabs__tab.disabled').click(function(){
            tabClicked(this);
        });
        $('.tabs__tab.disabled').removeClass('disabled');
    }
});


/**
 * fills in the DOM element with names of rooms that are currently active
 * @param {array} rooms - array of objects that contain names of active chat rooms and number of users in them
 */
function updateRoomList(rooms){
    var $roomSelector = $('select[name=room]');
    $roomSelector.empty();
    var $option = $('<option>').attr('value', '').text('Select a created room');
    $roomSelector.append($option);
    for(var i = 0; i < rooms.length; i++){
        var $option = $('<option>')
            .attr('value', rooms[i].name)
            .text(`${rooms[i].name} - ${rooms[i].userCount} user${rooms[i].userCount > 1 ? 's' : ''}`);
        $roomSelector.append($option);
    }
}