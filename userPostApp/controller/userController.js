const service = require('../service/userService');
const handler = require('../utils/handler');
const jwtoken = require('../service/jwtService');

let UserController = {
    register: async (req, res) => {
        try {
            let newUser = await service.register(req.body);
            handler.successHandler(newUser.email, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    login: async (req, res) => {
        try {
            const validUser = await service.findByCredentials(req.body)
            const token = await jwtoken.createToken(validUser._id, validUser.email);
            handler.successHandler({userID: validUser._id, user: validUser.email, token}, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    logout: async (req, res) => {
        try {
            if (req.user.token !== req.token) {
                res.send("something went wrong");
            }
            handler.successHandler("successfully log out");

        } catch (err) {
            handler.errorHandler(err, req, res, 500);
        }
    },

    getById: async (req, res) => {
        try {
            await service.getById(req.user._id);
            handler.successHandler(req.user, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getByEmail: async (req, res) => {
        try {
            await service.getByEmail(req.user.email);
            handler.successHandler(req.user.email, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    updateUser: async (req, res) => {
        try {
            let decoded = await jwtoken.verifyToken(req.token);
            if (decoded._id === req.user.id) {
                let updated = await service.update(req.user._id, req.body);
                handler.successHandler(updated, req, res);
            } else {
                res.status(401).send("You are not authenticated");
            }
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getOtherUser: async (req, res) => {
        try {
            let searchPrm = req.param('q');
            let result = await service.getByEmail(searchPrm);
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    deleteUser: async (req, res) => {
        try {
            let decoded = await jwtoken.verifyToken(req.token);
            if (decoded._id === req.user.id) {
                await service.delete(req.user.id);
                handler.successHandler(req.user.id, req, res);
            } else {
                res.status(401).send("You are not authenticated");
            }
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    printInfo: (data) => {
        return {
            userID: data._id, user: data.email
        }
    }
};

module.exports = UserController;
