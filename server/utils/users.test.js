const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Dan',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Sean',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Mike',
            room: 'Node Course'
        }];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Kyle',
            room: 'MMMS'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        // assert that the user is removed
        var userId = '1';
        var resUser = users.removeUser(userId);

        expect(resUser.id).toEqual(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        // assert that the user is not removed
        // the array has not changed
        var resUser = users.removeUser('47');

        expect(resUser).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '1';
        var userRes = users.getUser(userId);

        expect(userRes).toInclude(users.users[0]);
    });
    it('should not find user', () => {
        var userId = '47';
        var userRes = users.getUser(userId);

        expect(userRes).toNotExist();
    });

    it('should return names in node coures', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Dan', 'Mike']);
    });
    it('should return names in react coures', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Sean']);
    });
})