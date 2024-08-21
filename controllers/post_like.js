const models = require('../models');
const response = require('../utils/response');
const { validationResult } = require('express-validator');
const { pagination } = require('../utils/pagination');

const createPostLike = async (req, res) => {
    try {
        const { post_id, user_id } = req.body;
        const findPostLike = await models.post_like.findOne({
            where: {
                post_id,
                user_id
            }
        });

        if (!findPostLike) {
            const newPostLike = await models.post_like.create({
                post_id,
                user_id,
                is_like: true
            });

            return response.success(res, 200, newPostLike, 'Data created successfullly!');
        }
        if (findPostLike && findPostLike.is_like == true) {
            await models.post_like.update({
                is_like: false
            }, {
                where: {
                    post_id,
                    user_id
                }
            });
            const updatedPostLike = await models.post_like.findOne({
                where: {
                    post_id,
                    user_id
                }
            });
            return response.success(res, 200, updatedPostLike, 'Data updated successfully!');
        }
        if (findPostLike && findPostLike.is_like == false) {
            await models.post_like.update({
                is_like: true
            }, {
                where: {
                    post_id,
                    user_id
                }
            });
            const updatedPostLike = await models.post_like.findOne({
                where: {
                    post_id,
                    user_id
                }
            });
            return response.success(res, 200, updatedPostLike, 'Data updated successfully!');
        }
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllPostLikes = async (req, res) => {
    try {
        const allPostLikes = await pagination(models.post_like, req.query);
        return response.success(res, 200, allPostLikes, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getPostLikeById = async (req, res) => {
    try {
        const postLikeId = req.params.id;
        const findPostLike = await models.post_like.findByPk(postLikeId);
        if (!findPostLike) {
            return response.error(res, 404, 'Data not found!');
        }
        return response.success(res, 200, findPostLike, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updatePostLike = async (req, res) => {
    try {
        const postLikeId = req.params.id;
        const findPostLike = await models.post_like.findByPk(postLikeId);
        if (!findPostLike) {
            return response.error(res, 404, 'Data not found!');
        }
        const { post_id, user_id, is_like } = req.body;
        await models.post_like.update(
            {
                post_id,
                user_id,
                is_like
            },
            {
                where: {
                    id: postLikeId
                }
            }
        );
        const updatedPostLike = await models.post_like.findByPk(postLikeId);
        return response.success(res, 200, updatedPostLike, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createPostLike,
    getAllPostLikes,
    getPostLikeById,
    updatePostLike
}