const dao = require('../dao/uerDao')

function getUserById(id) {
    let user = dao.getUserById(id);
    if (user) {
        return user;
    } else {
        let daoUser = dao.getUserById(id);
        return daoUser || `User with id = ${id} not found`
    }
}

function getUsers() {
    return dao.getAllUsers()
}

function getUserByName(name) {
    let userInfo = dao.getUserByName(name);
    if (userInfo.length !== 0)
        return userInfo;
    else {
        return userInfo.length !== 0 ? userInfo : `Users with name = ${name} not founds`;
    }
}

function searchUser(pattern) {
        let user = dao.getUserByPattern(pattern);
        return user.length !== 0 ? user : `${pattern} not matches`;

}

function removeUserById(id) {
    try {
        dao.deleteUser(id)
        console.log("User deleted successfully");
    } catch(err) {
        console.error(err);
    }

}

function updateUser(user) {
    try {
        dao.updateUser(user)
        console.log("User updated successfully");
    } catch(err) {
        console.error(err);
    }


}

function addUser(user) {
    try {
        dao.createUser(user)
        console.log("User created successfully");
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUserById: getUserById,
    getUserByName: getUserByName,
    getUsers: getUsers,
    searchUser: searchUser,
    removeUserById: removeUserById,
}