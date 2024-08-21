const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const storyController = require('../controllers/story');

router.post('/create', uploads.array('content'), storyController.createStory);
router.get('/getAllStories', storyController.getAllStories);
router.get('/getStoryById/:id', storyController.getStoryById);
router.put('/update/:id', uploads.array('content'), storyController.updateStory);
router.delete('/delete/:id', storyController.deleteStory);

module.exports = router;