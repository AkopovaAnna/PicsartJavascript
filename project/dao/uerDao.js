const fs = require("fs");
const path = require("path");
const converter = require("../dataToUser");


function createUser(user) {
    let users = getAllUsers();
    let newUser = converter.mapper(user);
    let id = users.length;
    if (id > 0) {
        newUser.id = ++id;
    } else {
        newUser.id = 1;
    }
    users.push(newUser);
    fs.writeFileSync(path.resolve('./resources', 'user.json'), JSON.stringify(users))
}

function getAllUsers() {
    let rawData = fs.readFileSync(path.resolve('./resources', 'user.json'));
    if (rawData.length > 2) {
        return JSON.parse(rawData).map(converter.mapper);
    }
    return [];

}

function getUserById(id) {
    return getAllUsers().find(user => user.id === id);
}

function getUserByName(name) {
    return getAllUsers().filter(user => user.name === name);
}

function getUserByPattern(pattern) {
    return getAllUsers().filter(user =>
        user.name.indexOf(pattern) !== -1 || user.userName.indexOf(pattern) !== -1)
}

function updateUser(user) {
    let id = JSON.parse(user)['id']
    if (deleteUser(id)) {
        createUser(user);
    }

}

function deleteUser(id) {

    if (getUserById(id)) {
        let oldUsers = getAllUsers().filter(user => user.id !== id);

        if (oldUsers.length > 0) {
            fs.writeFileSync(path.resolve('./resources', 'user.json'), JSON.stringify(oldUsers))
        } else {
            fs.writeFileSync(path.resolve('./resources', 'user.json'), '[]')

        }
    } else {
        console.error("not found user")
    }

}

module.exports = {
    updateUser: updateUser,
    createUser: createUser,
    getUserById: getUserById,
    getUserByName: getUserByName,
    getAllUsers: getAllUsers,
    getUserByPattern: getUserByPattern,
    deleteUser: deleteUser,
}