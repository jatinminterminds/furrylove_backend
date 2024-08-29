const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const savedPostController = require('../controllers/saved_post');

router.post('/create', savedPostController.createSavedPost);
router.get('/getAllSavedPosts', savedPostController.getAllSavedPosts);
router.get('/getSavedPostById/:id', savedPostController.getSavedPostById);
router.put('/update/:id', savedPostController.updateSavedPost);
router.delete('/delete/:id', savedPostController.deleteSavedPost);

module.exports = router;