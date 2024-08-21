const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const postController = require('../controllers/post');

router.post('/create', uploads.array('images'), postController.createPost);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/getPostById/:id', postController.getPostById);
router.put('/update/:id', uploads.array('images'), postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;