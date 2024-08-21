const jwt = require('jsonwebtoken');
const REST = require('../utils/response');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return REST.error(res, 401, 'Unauthorized!');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return REST.error(res, 401, 'Invalid token!');
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.current_user = decode;
        next();
    } catch (error) {
        return REST.error(res, 500, 'Internal server error!');
    }
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 365 * 24 * 60 * 60 // Expire in a 365 days
    });
}

module.exports = { jwtAuthMiddleware, generateToken }