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

module.exports = {
    createRejectedPet
}