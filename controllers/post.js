const models = require('../models');
const { pagination } = require('../utils/pagination');
const response = require('../utils/response');
const { validationResult } = require('express-validator');


const createPost = async (req, res) => {
    try {
        const { user_id, description, location, latitude, longitude } = req.body;
        const createData = {
            user_id,
            description,
            location,
            latitude,
            longitude
        }
        if (req.files && req.files.length > 0) {
            var imageData = [];
            for (let image of req.files) {
                imageData.push(image.path);
            }
            createData.images = JSON.stringify(imageData);
        }

        const newPost = await models.post.create(createData);

        if (req.files && req.files.length > 0) {
            newPost.images = imageData;
        }

        return response.success(res, 200, newPost, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllPosts = async (req, res) => {
    try {
        // const include = [
        //     {
        //         model: models.post_like,
        //         as: 'post_likes'
        //     }
        // ]

        const paginatedData = await pagination(models.post, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const findPost = await models.post.findByPk(postId);
        if (!findPost) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findPost.dataValues.images != null) {
            findPost.dataValues.images = JSON.parse(findPost.dataValues.images);
        }
        return response.success(res, 200, findPost, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const findPost = await models.post.findByPk(postId);
        if (!findPost) {
            return response.error(res, 404, 'Data not found!');
        }
        const { user_id, description, location, latitude, longitude } = req.body;
        const updateData = {
            user_id,
            description,
            location,
            latitude,
            longitude
        }

        if (req.files && req.files.length > 0) {
            var imageData = [];
            for (let image of req.files) {
                imageData.push(image.path);
            }
            updateData.images = JSON.stringify(imageData);
        }

        await models.post.update(
            updateData,
            {
                where: {
                    id: postId
                }
            });

        const updatedPost = await models.post.findByPk(postId);
        return response.success(res, 200, updatedPost, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const findost = await models.post.findByPk(postId);
        if (!findost) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.post.destroy({
            where: {
                id: postId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}