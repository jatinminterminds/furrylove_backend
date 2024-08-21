const express = require('express');
const router = express.Router();
const storyViewController = require('../controllers/story_view');

router.post('/create', storyViewController.createStoryView);
router.get('/getAllStoryViews', storyViewController.getAllStoryViews);
router.get('/getStoryViewById/:id', storyViewController.getStoryViewById);
router.put('/update/:id', storyViewController.updateStoryView);
router.delete('/delete/:id', storyViewController.deleteStoryView);

module.exports = router;