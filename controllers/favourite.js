const models = require('../models');
const { pagination } = require('../utils/pagination');
const response = require('../utils/response');
const { validationResult } = require('express-validator');

const createFavouritePost = async (req, res) => {
    try {
        const { user_id, product_id, pet_id } = req.body;

        // Determine which ID to use for the query
        const idCondition = product_id ? { product_id } : { pet_id };

        const findFavouritePost = await models.favourite.findOne({
            where: {
                user_id,
                ...idCondition
            }
        });

        if (!findFavouritePost) {
            const newFavouritePost = await models.favourite.create({
                user_id,
                ...idCondition,
                is_favourite: true
            });
            return response.success(res, 200, newFavouritePost, 'Data created successfully!');
        }

        const isCurrentlyFavourite = findFavouritePost.is_favourite;

        await models.favourite.update({
            is_favourite: !isCurrentlyFavourite
        }, {
            where: {
                user_id,
                ...idCondition
            }
        });

        const updatedFavouritePost = await models.favourite.findOne({
            where: {
                user_id,
                ...idCondition
            }
        });

        return response.success(res, 200, updatedFavouritePost, 'Data updated successfully!');
    } catch (error) {
        console.log(error);
        return response.error(res, 500, 'Internal server error!');
    }
}


const getAllFavouritePosts = async (req, res) => {
    try {
        const paginatedData = await pagination(models.favourite, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!')
    }
}

const getFavouritePostById = async (req, res) => {
    try {
        const favouritePostId = req.params.id;
        const findFavouritePost = await models.favourite.findByPk(favouritePostId);
        if (!findFavouritePost) {
            return response.error(res, 404, 'Data not found!');
        }
        return response.success(res, 200, findFavouritePost, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateFavouritePost = async (req, res) => {
    try {
        const favouritePostId = req.params.id;
        const findFavouritePost = await models.favourite.findByPk(favouritePostId);
        if (!findFavouritePost) {
            return response.error(res, 404, 'Data not found!');
        }
        const { user_id, post_id, product_id, is_favourite } = req.body;
        await models.favourite.update(
            {
                user_id,
                post_id,
                product_id,
                is_favourite
            },
            {
                where: {
                    id: favouritePostId
                }
            }
        );

        const updatedFavouritePost = await models.favourite.findByPk(favouritePostId);
        return response.success(res, 200, updatedFavouritePost, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteFavouritePost = async (req, res) => {
    try {
        const favouritePostId = req.params.id;
        const findFavouritePost = await models.favourite.findByPk(favouritePostId);
        if (!findFavouritePost) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.favourite.destroy({
            where: {
                id: favouritePostId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createFavouritePost,
    getAllFavouritePosts,
    getFavouritePostById,
    updateFavouritePost,
    deleteFavouritePost
};
