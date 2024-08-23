const models = require('../models');
const response = require('../utils/response');
const { generateToken } = require('../middleware/jwt');
const { generateOtp } = require('../utils/generateOtp');
const { validationResult } = require('express-validator');
const { pagination } = require('../utils/pagination');


const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        const { phone_number } = req.body;
        const findUser = await models.user.findOne({ where: { phone_number } });

        if (!findUser) {
            const otp = generateOtp();
            const otp_expire = Date.now() + 60000;
            const newUser = await models.user.create({
                phone_number,
                otp,
                otp_expire
            });

            const findData = await models.user.findOne({ where: { phone_number } });
            req.session.current_user = findData.dataValues.id;
            response.success(res, 200, newUser, 'Data created successfully!');
        } else {
            const otp = generateOtp();
            const otp_expire = Date.now() + 60000;
            await models.user.update({
                otp,
                otp_expire
            }, {
                where: {
                    phone_number
                }
            });
            const updatedData = await models.user.findOne({ where: { phone_number } });
            console.log(updatedData);

            req.session.current_user = updatedData.dataValues.id;
            response.success(res, 200, updatedData, 'Data updated successfully!');
        }
    } catch (error) {
        response.error(res, 500, 'Internal server error!');
    }
}

const verifyOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { user_id, otp } = req.body;
        const findUser = await models.user.findByPk(user_id);
        if (!findUser) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findUser.otp_expire < Date.now()) {
            return response.error(res, 401, 'Otp expired!');
        }
        if (otp != findUser.otp) {
            return response.error(res, 401, 'Invalid otp!');
        }
        findUser.otp = null;
        findUser.otp_expire = null;
        const payload = {
            id: findUser.id
        }
        const token = generateToken(payload);
        await findUser.save();
        return response.success(res, 200, { token, user: findUser }, 'Otp verified successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const resendOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { user_id } = req.body;
        const findUser = await models.user.findByPk(user_id);
        if (!findUser) {
            return response.error(res, 404, 'Data not found!');
        }
        const otp = generateOtp();
        const otp_expire = Date.now() + 60000;
        await models.user.update({
            otp,
            otp_expire
        }, {
            where: {
                id: findUser.id
            }
        });
        const updatedData = await models.user.findOne({ where: { id: findUser.id } });
        return response.success(res, 200, updatedData, 'Resent otp successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllUsers = async (req, res) => {
    try {
        const paginatedData = await pagination(models.user, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const findUser = await models.user.findByPk(userId);
        if (!findUser) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findUser.dataValues.image != null) {
            findUser.dataValues.image = JSON.parse(findUser.dataValues.image);
        }
        return response.success(res, 200, findUser, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, gender, age } = req.body;
        const findUser = await models.user.findByPk(userId);
        if (!findUser) {
            return response.error(res, 404, 'Data not found!');
        }

        const updateData = {
            first_name,
            last_name,
            gender,
            age
        }

        if (req.files && req.files.length > 0) {
            const imageData = [];
            for (let image of req.files) {
                imageData.push(image.path);
            }
            updateData['image'] = JSON.stringify(imageData);
        }

        await models.user.update(
            updateData,
            {
                where: {
                    id: userId
                }
            });

        const updatedUser = await models.user.findByPk(userId);
        return response.success(res, 200, updatedUser, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const findUser = await models.user.findByPk(userId);
        if (!findUser) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.user.destroy({
            where: {
                id: userId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, 'Intenal server error!');
    }
}





module.exports = {
    loginUser,
    verifyOtp,
    resendOtp,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};