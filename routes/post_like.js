const express = require('express');
const router = express.Router();
const postLikeController = require('../controllers/post_like');

router.post('/create', postLikeController.createPostLike);
router.get('/getAllPostLikes', postLikeController.getAllPostLikes);
router.get('/getPostLikeById/:id', postLikeController.getPostLikeById);
router.put('/update/:id', postLikeController.updatePostLike);

module.exports = router;