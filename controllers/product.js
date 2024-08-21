const models = require('../models');
const { pagination } = require('../utils/pagination');
const response = require('../utils/response');
const { validationResult } = require('express-validator');


const createProduct = async (req, res) => {
    try {
        const { user_id, brand, size, color, product_condition, product_title, description, item_price, location, latitude, longitude } = req.body;
        const createData = {
            user_id,
            brand,
            size,
            color,
            product_condition,
            product_title,
            description,
            item_price,
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

        const newProduct = await models.product.create(createData);

        if (req.files && req.files.length > 0) {
            newProduct.images = imageData;
        }

        return response.success(res, 200, newProduct, 'Data created successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getAllProducts = async (req, res) => {
    try {
        // const include = [
        //     {
        //         model: models.post_like,
        //         as: 'post_likes'
        //     }
        // ]

        const paginatedData = await pagination(models.product, req.query);
        return response.success(res, 200, paginatedData, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const findProduct = await models.product.findByPk(productId);
        if (!findProduct) {
            return response.error(res, 404, 'Data not found!');
        }
        if (findProduct.dataValues.images != null) {
            findProduct.dataValues.images = JSON.parse(findProduct.dataValues.images);
        }
        return response.success(res, 200, findProduct, 'Data fetched successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const findProduct = await models.product.findByPk(productId);
        if (!findProduct) {
            return response.error(res, 404, 'Data not found!');
        }
        const { user_id, brand, size, color, product_condition, product_title, description, item_price, location, latitude, longitude } = req.body;
        const updateData = {
            user_id,
            brand,
            size,
            color,
            product_condition,
            product_title,
            description,
            item_price,
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

        await models.product.update(
            updateData,
            {
                where: {
                    id: productId
                }
            });

        const updatedProduct = await models.product.findByPk(productId);
        return response.success(res, 200, updatedProduct, 'Data updated successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const findProduct = await models.product.findByPk(productId);
        if (!findProduct) {
            return response.error(res, 404, 'Data not found!');
        }
        await models.product.destroy({
            where: {
                id: productId
            }
        });
        return response.success(res, 200, null, 'Data deleted successfully!');
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

