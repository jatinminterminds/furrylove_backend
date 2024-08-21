const express = require('express');
const router = express.Router();
const favouritePostController = require('../controllers/favourite');

router.post('/create', favouritePostController.createFavouritePost);
router.get('/getAllFavourites', favouritePostController.getAllFavouritePosts);
router.get('/getFavouriteById/:id', favouritePostController.getFavouritePostById);
router.put('/update/:id', favouritePostController.updateFavouritePost);
router.delete('/delete/:id', favouritePostController.deleteFavouritePost);

module.exports = router;