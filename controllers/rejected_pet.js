const models = require('../models');
const response = require('../utils/response');


const createRejectedPet = async (req, res) => {
    try {
        const { user_id, pet_id } = req.body;
        const findRejectedPet = await models.rejected_pet.findOne({
            where: {
                user_id,
                pet_id
            }
        });
        if (findRejectedPet) {
            return response.error(res, 402, 'Data already exists!');
        }
        const newRejectedPet = await models.rejected_pet.create({
            user_id,
            pet_id,
            is_rejected: true
        });
        return response.success(res, 200, newRejectedPet, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllRejectedPets = async (req, res) => {
    try {
        const allRejectedPets = await models.rejected_pet.findAll();
        return response.success(res, 200, allRejectedPets, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getRejectedPetById = async (req, res) => {
    try {
        const rejectPetId = req.params.id;
        const findRejectedPet = await models.rejected_pet.findByPk(rejectPetId);
        if (!findRejectedPet) {
            return response.error(res, 404, 'Data not found!');
        }
        return response.success(res, 200, findRejectedPet, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateRejectedPet = async (req, res) => {
    try {
        const rejectPetId = req.params.id;
        const findRejectedPet = await models.rejected_pet.findByPk(rejectPetId);
        if (!findRejectedPet) {
            return response.error(res, 404, 'Data not found!');
        }
        const { user_id, pet_id, is_rejected } = req.body;
        await models.rejected_pet.update({
            user_id,
            pet_id,
            is_rejected
        }, {
            where: {
                id: rejectPetId
            }
        });
        const updatedData = await models.rejected_pet.findByPk(rejectPetId);
        return response.success(res, 200, updatedData, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteRejectedPet = async (req, res) => {
    try {
        const rejectPetId = req.params.id;
        const findRejectedPet = await models.rejected_pet.findByPk(rejectPetId);
        if (!findRejectedPet) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.rejected_pet.destroy({
            where: {
                id: rejectPetId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createRejectedPet,
    getAllRejectedPets,
    getRejectedPetById,
    updateRejectedPet,
    deleteRejectedPet
}