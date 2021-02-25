const service = require('../service/userService')
const helpers = require("../helper")
const urlUtil = require("../urlUtil")

function create(req, res, param, postData) {
    try {
        postData = JSON.parse(postData);
        service.addUser(postData);
        return helpers.success(res, "");
    } catch (err) {
        return helpers.error(res, "user not created " + err)
    }
}

function getAllUsers(req, res) {
    try {
        let users = service.getUsers();
        return helpers.success(res, users);
    } catch (error) {
        return helpers.error(res, error);
    }
}

function getById(req, res) {
    try {
        let id = parseInt(urlUtil.getPatchVariable(req.url));
        let user = service.getUserById(id);
        return helpers.success(res, user);
    } catch (error) {
        return helpers.error(res, error);
    }
}


function deleteUser(req, res) {
    try {
        let id = parseInt(urlUtil.getPatchVariable(req.url));
        service.removeUserById(id);
        return helpers.success(res, id);
    } catch (error) {
        return helpers.error(res, error);
    }
}

function updateUser(req, res, param, data) {
    data = JSON.parse(data);
    service.updateUser(param, data);
    return helpers.success(res, "");
}

function searchByQuery(req, res) {

    let name = urlUtil.getQueryParam(req.url, 'name');
    let search = urlUtil.getQueryParam(req.url, 'search');
    if (name) {
        let resultName = service.getUserByName(name);
        return helpers.success(res, resultName);
    } else if (search) {
        let resultSearch = service.searchUser(search);
        return helpers.success(res, resultSearch);
    }

}

module.exports = {
    updateUser: updateUser,
    createUser: create,
    getUserById: getById,
    searchByQuery: searchByQuery,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers
}