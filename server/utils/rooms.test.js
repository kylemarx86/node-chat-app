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
        }, {
            name: 'room 3',
            userCount: 2
        }];
    });

    it('should add a room', () => {
        var roomName = 'Cactus Cooler Talk';
        var roomsRes = rooms.addRoom(roomName);
        
        expect(roomsRes.name).toEqual(roomName);
        expect(rooms.rooms.length).toBe(4);
    });
    it('should not add a room if room already exists', () => {
        var roomName = rooms.rooms[1].name;
        var roomsRes = rooms.addRoom(roomName);

        expect(roomsRes).toNotExist();
        expect(rooms.rooms.length).toBe(3);
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

    it('should sort the rooms by userCount', () => {
        var roomsRes = rooms.sortRoomsByUserCount();
        
        expect(roomsRes[0].name).toBe('room 1');
        expect(roomsRes[1].name).toBe('room 3');
        expect(roomsRes[2].name).toBe('room 2');
    });
    it('should sort the rooms after users added to rooms', () => {
        var roomName = 'room 3';
        var roomsRes = rooms.addUserToRoom(roomName);

        expect(rooms.rooms[0].name).toBe('room 1');
        expect(rooms.rooms[1].name).toBe('room 3');
        expect(rooms.rooms[2].name).toBe('room 2');

        roomsRes = rooms.addUserToRoom(roomName);
        
        expect(rooms.rooms[0].name).toBe('room 3');
        expect(rooms.rooms[1].name).toBe('room 1');
        expect(rooms.rooms[2].name).toBe('room 2');
    });
    it('should sort the rooms after users removed from rooms', () => {
        var roomName = 'room 1';
        var roomsRes = rooms.removeUserFromRoom(roomName);

        expect(rooms.rooms[0].name).toBe('room 1');
        expect(rooms.rooms[1].name).toBe('room 3');
        expect(rooms.rooms[2].name).toBe('room 2');

        roomsRes = rooms.removeUserFromRoom(roomName);
        
        expect(rooms.rooms[0].name).toBe('room 3');
        expect(rooms.rooms[1].name).toBe('room 1');
        expect(rooms.rooms[2].name).toBe('room 2');
    });
});