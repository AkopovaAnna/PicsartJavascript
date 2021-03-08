const jwtoken = require('../service/jwtService');
const handler = require('../utils/handler');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        req.user = await jwtoken.verifyToken(token);
        req.token = token;
        next();

    } catch (err) {
        handler.errorHandler(err, req, res, 401);
    }

};

module.exports = auth;