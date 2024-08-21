const { check } = require('express-validator');

const loginValidations = [
    check('phone_number').not().isEmpty().withMessage('phone_number is required!')
        .isNumeric().withMessage('Phone number must be a numeric value')
        .isLength({ min: 13, max: 13 }).withMessage('Phone number should be 10 digits')
];

const varifyOtpValidations = [
    check('user_id').not().isEmpty().withMessage('user_id is required!')
];

const resendOtpValidations = [
    check('user_id').not().isEmpty().withMessage('user_id is required!')
];



module.exports = { loginValidations, varifyOtpValidations, resendOtpValidations };