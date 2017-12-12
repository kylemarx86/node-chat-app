// addUser (id, name, room)
// removeUser (id)
// getUser(id)  => object
// getUserList(room)  => array of name

class Users {
    constructor() {
        this.users = [];
    }
    
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id) {
        var user = this.getUser(id);

        // set user array to an array of users that do not have the id
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
       var users = this.users.filter((user) => user.room === room);
       var namesArr = users.map((user) => user.name);

       return namesArr;
    }    
}

module.exports = {Users};