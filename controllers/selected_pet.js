const models = require('../models');
const response = require('../utils/response');

const createSelectedPet = async (req, res) => {
    try {
        const { user_id, pet_id } = req.body;
        const findSelectedPet = await models.selected_pet.findOne({
            where: {
                user_id,
                pet_id
            }
        });
        if (findSelectedPet) {
            await models.selected_pet.update({
                is_selected: true
            }, {
                where: {
                    user_id,
                    pet_id
                }
            });

            const updatedSelectedPet = await models.selected_pet.findOne({
                user_id,
                pet_id
            });
            return response.success(res, 200, updatedSelectedPet, 'Data updated successfully!');
        }
        if (!findSelectedPet) {
            const newSelectedPet = await models.selected_pet.create({
                user_id,
                pet_id,
                is_selected: true
            });
            return response.success(res, 201, newSelectedPet, 'Data created successfully!');
        }
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllSelectedPets = async (req, res) => {
    try {
        const allSelectedPets = await models.selected_pet.findAll();
        return response.success(res, 200, allSelectedPets, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createSelectedPet,
    getAllSelectedPets
}