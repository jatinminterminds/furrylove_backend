const models = require('../models');
const response = require('../utils/response');
const { validationResult } = require('express-validator');
const { pagination } = require('../utils/pagination');

const createSavedPost = async (req, res) => {
    try {
        const { user_id, post_id } = req.body;
        const findSavedPost = await models.saved_post.findOne({
            where: {
                user_id,
                post_id
            }
        });
        if (!findSavedPost) {
            const newSavedPost = await models.saved_post.create({
                user_id,
                post_id,
                is_saved: true
            });
            return response.success(res, 200, newSavedPost, 'Data created successfullly!');
        }
        if (findSavedPost && findSavedPost.is_saved == true) {
            await models.saved_post.update({
                is_saved: false
            }, {
                where: {
                    user_id,
                    post_id
                }
            });
            const updatedSavedPost = await models.saved_post.findOne({
                where: {
                    user_id,
                    post_id
                }
            });
            return response.success(res, 200, updatedSavedPost, 'Data updated successfullly!');
        }

        if (!findSavedPost) {
            const newSavedPost = await models.saved_post.create({
                user_id,
                post_id,
                is_saved: true
            });
            return response.success(res, 200, newSavedPost, 'Data created successfullly!');
        }
        if (findSavedPost && findSavedPost.is_saved == false) {
            await models.saved_post.update({
                is_saved: true
            }, {
                where: {
                    user_id,
                    post_id
                }
            });
            const updatedSavedPost = await models.saved_post.findOne({
                where: {
                    user_id,
                    post_id
                }
            });
            return response.success(res, 200, updatedSavedPost, 'Data updated successfullly!');
        }
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllSavedPosts = async (req, res) => {
    try {
        const allSavedPosts = await models.saved_post.findAll();
        return response.success(res, 200, allSavedPosts, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}


module.exports = {
    createSavedPost,
    getAllSavedPosts
}