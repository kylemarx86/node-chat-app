class Rooms {
    constructor() {
        this.rooms = [];
    }

    // Rooms all have ids or sids stored in the socket adapter
    // IDEA: access the sid in server when a room is created and store it as an id in the room objects
    // when accessing room i can then do that by id as opposed to by name
    addRoom(name) {
        var rooms = this.rooms.filter((room) => room.name === name);
        if(!rooms[0]) {
            var room = {
                name,
                userCount: 1
            }
            this.rooms.push(room);
            this.sortRoomsByUserCount();
        }
        
        return room;
    }

    addUserToRoom(name) {
        var roomIndex = this.rooms.findIndex((room) => room.name === name);

        // find index returns index of first matching index of matching criteria or -1 if not found
        if(roomIndex !== -1){
            // found room index
            this.rooms[roomIndex].userCount++;
            this.sortRoomsByUserCount();
            return this.rooms[roomIndex];
        }else{
            // did not find room index, create room
            return this.addRoom(name);
        }
    }

    removeUserFromRoom(name) {
        var roomIndex = this.rooms.findIndex((room) => room.name === name);

        // find index returns index of first matching index of matching criteria or -1 if not found
        if(roomIndex !== -1){
            // found room index and decrement userCount by one
            this.rooms[roomIndex].userCount--;
            if(this.rooms[roomIndex].userCount === 0){
                // removeRoom returns a room object
                return this.removeRoom(name);
            }
            this.sortRoomsByUserCount();
            // returns a room object
            return this.rooms[roomIndex];
        }
        // returns the name
        return name;
    }

    removeRoom(name) {
        // if the room we are checking has one user then we can delete it
        var room = this.rooms.filter((room) => room.name === name)[0];

        if(room){
            this.rooms = this.rooms.filter((room) => room.name !== name);
        }
        this.sortRoomsByUserCount();

        return room;
    }

    // sorts the rooms with highest userCount first
    sortRoomsByUserCount(){
        this.rooms.sort(function(a, b){
            return b.userCount - a.userCount;
        });
        return this.rooms;
    }

}

module.exports = {Rooms};