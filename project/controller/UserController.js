const service = require('../service/userService')
const helpers = require("../helper")
const urlUtil = require("../urlUtil")

function create(req, res, param, postData) {
    postData = JSON.parse(postData);
    service.addUser(postData);
    return helpers.success(res, "");
}

function getAllUsers(req, res) {
    try {
        let users = service.getUsers();
        return helpers.success(res, users);
    } catch (error) {
        return helpers.error(res, error);
    }
}

function getById(req, res, id) {
    try {
        let user = service.getUserById(id);
        return helpers.success(res, JSON.stringify(user));
    } catch (error) {
        return helpers.error(res, error);
    }
}

function deleteUser(req, res, id) {
    try {
        service.removeUserById(id);
        return helpers.success(res, "");
    } catch (error) {
        return helpers.error(res, error);
    }
}

function updateUser(req, res, postData) {
    postData = JSON.parse(postData);
    service.updateUser(postData.toString());
    return helpers.success(res, "");
}

function updateByQuery(req, res, url_path) {


    let name = urlUtil.getQueryParam(url_path, 'name');
    let search = urlUtil.getQueryParam(url_path, 'search');
    if (name) {
        let resultName = JSON.stringify(service.getUserByName(name));
        return helpers.success(res, resultName);
    } else if (search) {
        let resultSearch = JSON.stringify(service.searchUser(search));
        return helpers.success(res, resultSearch);
    }

}

module.exports = {
    updateUser: updateUser,
    createUser: create,
    getUserById: getById,
    updateByQuery: updateByQuery,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers
}