const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const savedPostController = require('../controllers/saved_post');

router.post('/create', savedPostController.createSavedPost);
router.get('/getAllSavedPosts', savedPostController.getAllSavedPosts);

module.exports = router;