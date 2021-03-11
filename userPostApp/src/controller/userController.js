const service = require('../service/userService');
const jwtoken = require('../service/jwtService');
const successHandler = require('../utils/handler').successHandler;
const errorHandler = require('../utils/handler').errorHandler;

let UserController = {
    register: async (req, res) => {
        try {
            await service.register(req.body);
            // res.status(200).send(req.body.email);
            successHandler(req.body.email, req, res);
        } catch (err) {
            console.log(err.message);
            errorHandler(err, req, res, 400);
        }
    },

    login: async (req, res) => {
        try {
            const validUser = await service.findByCredentials(req.body)
            const token = await jwtoken.createToken(validUser._id, validUser.email);
            res.status(200).send({userID: validUser._id, userEmail: validUser.email, token})
            // successHandler({userID: validUser._id, user: validUser.email, token}, req, res);
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    getById: async (req, res) => {
        try {
            let user = await service.getById(req.params.id);
            successHandler(user.email, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getByEmail: async (req, res) => {
        try {
            await service.getByEmail(req.user.email);
            successHandler(req.user.email, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    updateUser: async (req, res) => {
        try {
            let updated = await service.update(req.user._id, req.body);
            successHandler(updated, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    /**search user by email
     * ?q=email
     * */
    getOtherUserByQuery: async (req, res) => {
        try {
            let searchPrm = req.param('q');
            let result = await service.getByEmail(searchPrm);
            successHandler(result.email, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await service.delete(req.user.id);
            successHandler("User deleted " + req.user.email, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    printInfo: (data) => {
        return {
            userID: data._id, user: data.email
        }
    }
};

module.exports = UserController;
