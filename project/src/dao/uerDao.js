const fs = require("fs");
const path = require("path");
const converter = require("../dataToUser");


function createUser(user) {
    let users = getAllUsers();
    let newUser = converter.mapper(user);
    newUser.id = idGenerator(users, "id");
    users.push(newUser);
    fs.writeFileSync(path.resolve('../resources', 'user.json'), JSON.stringify(users))

}

function getAllUsers() {
    let rawData = fs.readFileSync(path.resolve('../resources', 'user.json'));
    return JSON.parse(rawData).map(converter.mapper);
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

    let updatedUser = converter.mapper(user)
    let users = getAllUsers();
    let index = findWithAttr(users, "id", updatedUser.id);
    users[index] = updatedUser;
    fs.writeFileSync(path.resolve('../resources', 'user.json'), JSON.stringify(users))

}

function findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function idGenerator(array, attr) {
    if (array.length > 0) {
        let i = array.length - 1
        let id = array[i][attr];
        return ++id;
    } else {
        return 1;
    }
}

function deleteUser(id) {

    if (getUserById(id)) {
        let oldUsers = getAllUsers().filter(user => user.id !== id);

        if (oldUsers.length > 0) {
            fs.writeFileSync(path.resolve('../resources', 'user.json'), JSON.stringify(oldUsers))
        } else {
            fs.writeFileSync(path.resolve('../resources', 'user.json'), '[]')

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