// utils/responseHandler.js
const { STATUS_CODES } = require('http');

const success = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        status: statusCode,
        message,
        data
    });
};

const error = (res, statusCode, message) => {
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: message || STATUS_CODES[statusCode]
        }
    });
};

module.exports = { success, error };