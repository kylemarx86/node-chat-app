const expect = require('expect');
const {Rooms} = require('./rooms');

describe('Rooms', () => {
    var rooms;

    beforeEach(() => {
        rooms = new Rooms();
        rooms.rooms = [{
            name: 'room 1',
            userCount: 3
        }, {
            name: 'room 2',
            userCount: 1
        }];
    });

    it('should add a room', () => {
        var roomName = 'Cactus Cooler Talk';
        var roomsRes = rooms.addRoom(roomName);
        
        expect(roomsRes.name).toEqual(roomName);
        expect(rooms.rooms.length).toBe(3);
    });
    it('should not add a room if room already exists', () => {
        var roomName = rooms.rooms[1].name;
        var roomsRes = rooms.addRoom(roomName);

        expect(roomsRes).toNotExist();
        expect(rooms.rooms.length).toBe(2);
    });

    it('should increase user count in a room that exists', () => {
        var roomName = rooms.rooms[0].name;
        var roomsRes = rooms.addUserToRoom(roomName);

        expect(roomsRes.name).toEqual(roomName);
        expect(roomsRes.userCount).toBe(4);
    });
    it('should add a room if room name does not exist', () => {
        var roomName = 'Cactus Cooler Talk';
        var roomsRes = rooms.addUserToRoom(roomName);

        // console.log('roomsRes', roomsRes)

        expect(roomsRes.name).toEqual(roomName);
        expect(roomsRes.userCount).toBe(1);
    });

    it('should decrease user count of an existing room', () => {
        var roomName = rooms.rooms[0].name;
        var roomsRes = rooms.removeUserFromRoom(roomName);

        expect(roomsRes.name).toEqual(roomName);
        expect(roomsRes.userCount).toBe(2);
        expect(rooms.rooms).toContain(roomsRes);
    });
    it('should not decrease user count of a room that does not exist', () => {
        var roomName = 'Non-existent room';
        var roomsRes = rooms.removeUserFromRoom(roomName);

        // rooms should not contain a room with the given roomName
        expect(rooms.rooms).toNotContain({name: roomName});
        // roomsRes should just be name
        expect(roomsRes).toEqual(roomName);
    });
    it('should should remove room that has no long has users', () => {
        var roomName = rooms.rooms[1].name;
        var roomsRes = rooms.removeUserFromRoom(roomName);

        expect(roomsRes.name).toBe(roomName);
        expect(roomsRes.userCount).toBe(0);
        expect(rooms.rooms).toNotContain(roomsRes);
    });

    // it('should remove a room', () => {
    //     var roomName = rooms.rooms[0]['name'];
    //     var roomsRes = rooms.removeRoom(roomName);

    //     // expect returned objects name to be same as name that was passed in
    //     expect(roomsRes.name).toBe(roomName);
    //     // expect the list to be one shorter
    //     expect(rooms.rooms.length).toBe(1);
    // });
    // it('should not remove a room that does not exist', () => {
    //     var roomName = 'chat room 3';
    //     var roomRes = rooms.removeRoom(roomName);
        
    //     // expect list of rooms to be same length
    //     expect(rooms.rooms.length).toBe(2);
    //     // expect response object to not exist
    //     expect(roomRes).toNotExist();

    // });
    // it('should not remove a room that contains multiple users', () => {
        
    // });
    
    // it('should ', () => {
        
    // });

    // it('should ', () => {
        
    // });
});