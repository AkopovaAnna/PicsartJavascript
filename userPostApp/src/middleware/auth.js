const jwtoken = require('../service/jwtService');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        req.user = await jwtoken.verifyToken(token);
        if (req.user.id === req.params.id) {
            req.token = token;
            next();
        } else {
            res.status(401).send("UnauthorizedError");
        }
    } catch (err) {
        res.status(401).send(err.message)
    }
};

