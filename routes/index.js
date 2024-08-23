var express = require('express');
var router = express.Router();
const { jwtAuthMiddleware } = require('../middleware/jwt');
const userRoutes = require('./user');
const petRoutes = require('./pet');
const productRoutes = require('./product');
const storyRoutes = require('./story');
const storyViewRoutes = require('./story_view');
const favouriteRoutes = require('./favourite');
const postLikeRoutes = require('./post_like');
const rejectedPetRoutes = require('./rejected_pet');
const postRoutes = require('./post');
const savedPostRoutes = require('./saved_post');
const selectedPetRoutes = require('./selected_pet');

router.use('/user', userRoutes);
router.use(jwtAuthMiddleware);
router.use('/pet', petRoutes);
router.use('/product', productRoutes);
router.use('/story', storyRoutes);
router.use('/storyView', storyViewRoutes);
router.use('/favourite', favouriteRoutes);
router.use('/rejectedPet', rejectedPetRoutes);
router.use('/postLike', postLikeRoutes);
router.use('/post', postRoutes);
router.use('/savedPost', savedPostRoutes);
router.use('/selectedPet', selectedPetRoutes);

module.exports = router;
