const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const postController = require('../controllers/product');

router.post('/create', uploads.array('images'), postController.createProduct);
router.get('/getAllProducts', postController.getAllProducts);
router.get('/getProductById/:id', postController.getProductById);
router.put('/update/:id', uploads.array('images'), postController.updateProduct);
router.delete('/delete/:id', postController.deleteProduct);

module.exports = router;