const models = require('../models');
const { pagination } = require('../utils/pagination');
const response = require('../utils/response');
const { validationResult } = require('express-validator');


const createPet = async (req, res) => {
    try {
        const { owner_id, pet_name, pet_category, breed, gender, size, age } = req.body;

        const createData = {
            owner_id,
            pet_name,
            pet_category,
            breed,
            gender,
            size,
            age
        }

        if (req.files && req.files.length > 0) {
            var imageData = [];
            for (let image of req.files) {
                imageData.push(image.path);
            }
            createData.images = JSON.stringify(imageData);
        }

        const newPet = await models.pet.create(createData);
        return response.success(res, 200, newPet, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllPets = async (req, res) => {
    try {
        const paginatedData = await pagination(models.pet, req.query);
        return response.success(res, 200, paginatedData, 'Data fecthed successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getPetById = async (req, res) => {
    try {
        const petId = req.params.id;
        const findPet = await models.pet.findByPk(petId);
        if (!findPet) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findPet.dataValues.images != null) {
            findPet.dataValues.images = JSON.parse(findPet.dataValues.images);
        }
        return response.success(res, 200, findPet, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updatePet = async (req, res) => {
    try {
        const petId = req.params.id;
        const findPet = await models.pet.findByPk(petId);
        if (!findPet) {
            return response.error(res, 404, 'Data not found!');
        }

        const { owner_id, pet_name, pet_category, breed, gender, size, age } = req.body;

        const updateData = {
            owner_id,
            pet_name,
            pet_category,
            breed,
            gender,
            size,
            age
        };

        if (req.files && req.files.length > 0) {
            const imageData = [];
            for (let image of req.files) {
                imageData.push(image.path);
            }
            updateData.images = JSON.stringify(imageData);
        }

        await models.pet.update(
            updateData,
            {
                where: {
                    id: petId
                }
            });

        const updatedPet = await models.pet.findByPk(petId);
        return response.success(res, 200, updatedPet, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deletePet = async (req, res) => {
    try {
        const petId = req.params.id;
        const findPet = await models.pet.findByPk(petId);
        if (!findPet) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.pet.destroy({
            where: {
                id: petId
            }
        });

        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet
};

