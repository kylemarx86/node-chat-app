$(document).ready(function(){
    // better to create a separate web socket connection to constantly update the room list
    $.ajax({
        url: './../rooms.json',
        dataType: 'JSON',
        success: function(res){
            if(res.rooms){
                var rooms = res.rooms;
                console.log(rooms);
                var $roomSelector = $('select[name=rooms]');
                for(var i = 0; i < rooms.length; i++){
                    var $option = $('<option>').attr('value', rooms[i].name).text(rooms[i].name);
                    $roomSelector.append($option);
                }
            }
        },
        error: function(err){
            console.log('could not retrieve rooms data')
        }
    });

});