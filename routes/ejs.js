const express = require('express');
const router = express.Router();
const ejsController = require('../controllers/ejs');


router.get('/', ejsController.signin);
router.get('/signin', ejsController.sendOtp);
router.get('/verifyOtp', ejsController.verifyOtp);
router.get('/createPet', ejsController.createPet);
router.get('/createOwner', ejsController.createOwner);
router.get('/home', ejsController.home);
router.get('/products', ejsController.products);
router.get('/feed', ejsController.feed);
router.get('/createProduct', ejsController.createProduct);
router.get('/productDetails', ejsController.productDetails);
router.get('/createPost', ejsController.createPost);

module.exports = router;