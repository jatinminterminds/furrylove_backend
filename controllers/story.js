const models = require('../models');
const response = require('../utils/response');
const { validationResult } = require('express-validator');
const {pagination} = require('../utils/pagination');

const createStory = async (req, res) => {
    try {
        const { user_id, text } = req.body;
        const createData = {
            user_id,
            text
        }

        if (req.files && req.files.length > 0) {
            var contentData = [];
            for (let content of req.files) {
                contentData.push(content.path);
            }
            createData.content = JSON.stringify(contentData);
        }

        const newStory = await models.story.create(createData);
        if (req.files && req.files.length > 0) {
            newStory.content = contentData;
        }

        return response.success(res, 200, newStory, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllStories = async (req, res) => {
    try {
        const paginatedData = await pagination(models.story, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getStoryById = async (req, res) => {
    try {
        const storyId = req.params.id;
        const findStory = await models.story.findByPk(storyId);
        if (!findStory) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findStory.content != null) {
            findStory.content = JSON.parse(findStory.content);
        }
        return response.success(res, 200, findStory, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const { user_id, text } = req.body;
        const updateData = {
            user_id,
            text
        }

        if (req.files && req.files.length > 0) {
            const contentData = [];
            for (let content of req.files) {
                contentData.push(content.path);
            }
            updateData.content = JSON.stringify(contentData);
        }

        await models.story.update(
            updateData,
            {
                where: {
                    id: storyId
                }
            });

        const updatedStory = await models.story.findByPk(storyId);
        return response.success(res, 200, updatedStory, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const findStory = await models.story.findByPk(storyId);
        if (!findStory) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.story.destroy({
            where: {
                id: storyId
            }
        });
        return response.success(res, 200, null, 'Data deleted succesfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = { 
    createStory, 
    getAllStories, 
    getStoryById, 
    updateStory, 
    deleteStory 
};