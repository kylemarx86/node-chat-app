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
        }

        return room;
    }

    addUserToRoom(name) {
        var roomIndex = this.rooms.findIndex((room) => room.name === name);

        // find index returns index of first matching index of matching criteria or -1 if not found
        if(roomIndex !== -1){
            // found room index
            this.rooms[roomIndex].userCount++;
            return this.rooms[roomIndex];
        }else{
            // did not find room index, create room
            return this.addRoom(name);
            // add room will return a room object
        }
    }

    removeUserFromRoom(name) {
        var roomIndex = this.rooms.findIndex((room) => room.name === name);

        // find index returns index of first matching index of matching criteria or -1 if not found
        if(roomIndex !== -1){
            // found room index and decrement userCount by one
            this.rooms[roomIndex].userCount--;
            if(this.rooms[roomIndex].userCount === 0){
                return this.removeRoom(name);
                // removeRoom returns a room object
            }
            return this.rooms[roomIndex];
            // returns a room object
        }
        return name;
        // returns a name
    }

    removeRoom(name) {
        // if the room we are checking has one user then we can delete it
        var room = this.rooms.filter((room) => room.name === name)[0];

        if(room){
            this.rooms = this.rooms.filter((room) => room.name !== name);
        }

        return room;
    }

    // getRoomList() {
    //     return this.rooms;
    // }

    // findMostActiveRooms() {
    //     // for each active room find the number of users in each
    //     // sort these from highest to lowest
    // }
}

module.exports = {Rooms};