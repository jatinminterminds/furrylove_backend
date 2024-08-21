const express = require('express');
const router = express.Router();
const rejectedPetController = require('../controllers/rejected_pet');

router.post('/create', rejectedPetController.createRejectedPet)

module.exports = router;