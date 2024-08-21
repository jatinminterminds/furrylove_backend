const models = require('../models');
const response = require('../utils/response');
const { validationResult } = require('express-validator');
const { pagination } = require('../utils/pagination');

const createStoryView = async (req, res) => {
    try {
        const { story_id, viewer_id, is_like } = req.body;
        const newStoryView = await models.story_view.create({
            story_id,
            viewer_id,
            is_like
        });
        return response.success(res, 200, newStoryView, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllStoryViews = async (req, res) => {
    try {
        const paginatedData = await pagination(models.story_view, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getStoryViewById = async (req, res) => {
    try {
        const storyViewId = req.params.id;
        const findStoryView = await models.story_view.findByPk(storyViewId);
        if (!findStoryView) {
            return response.error(res, 404, 'Data not found!');
        }
        return response.success(res, 200, findStoryView, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateStoryView = async (req, res) => {
    try {
        const storyViewId = req.params.id;
        const findStoryView = await models.story_view.findByPk(storyViewId);
        if (!findStoryView) {
            return response.error(res, 404, 'Data not found!');
        }
        const { story_id, viewer_id, is_like } = req.body;
        await models.story_view.update(
            {
                story_id,
                viewer_id,
                is_like
            },
            {
                where: {
                    id: storyViewId
                }
            }
        );

        const updatedStoryView = await models.story_view.findByPk(storyViewId);
        return response.success(res, 200, updatedStoryView, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteStoryView = async (req, res) => {
    try {
        const storyViewId = req.params.id;
        const findStoryView = await models.story_view.findByPk(storyViewId);
        if (!findStoryView) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.story_view.destroy({
            where: {
                id: storyViewId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, "Internal srver error!");
    }
}

module.exports = {
    createStoryView,
    getAllStoryViews,
    getStoryViewById,
    updateStoryView,
    deleteStoryView
};