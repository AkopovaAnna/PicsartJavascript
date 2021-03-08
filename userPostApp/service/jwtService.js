const jwt = require('jsonwebtoken');
const User = require('../model/user');

function createToken(id, email) {
    const payload = {id: id, email: email};
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '10m'}
    );
}

const verifyToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    let tokenDoc = await User.findById(decoded.id);
    if (!tokenDoc) {
        throw new Error('Token not found');
    }

    if (Date.now() >= decoded.exp * 1000) {
        throw new Error('Token was expired');
    }
    return tokenDoc;
};

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken
}