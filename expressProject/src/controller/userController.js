const userService = require("../../../project/src/service/userService");

exports.create = (req, res) => {
    try {
        res.status(200).send(userService.addUser(req.body))
    } catch (err) {
        res.status(500).send("user not saved")
    }
}

exports.getAll = (req, res) => {
    try {
        res.status(200).send(userService.getUsers());
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getById = (req, res) => {
    let user = userService.getUserById(parseInt(req.params.id))
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(400).send("User not found");
    }
}

exports.getByQuery = (req, res) => {
    let name = req.query.name;
    let token = req.query.token;

    if (name) {
        res.status(200).send(userService.getUserByName(name))
    } else if (token) {
        res.status(200).send(userService.searchUser(token))
    } else {
        res.status(400).send("user not found with current parameter")
    }
}

exports.updateUser = (req, res) => {
    try {
        userService.updateUser(req.params.id, req.body)
        res.status(200).send("updated")
    } catch (err) {
        res.status(500).send("User not updated")
    }
}

exports.deleteUser = (req, res) => {
    try {
        res.status(200).send("deleted user with id" +req.params.id)
    } catch (err) {
        res.status(500).send("User not deleted");
    }
}