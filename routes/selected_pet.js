const express = require('express');
const router = express.Router();
const selectedPetController = require('../controllers/selected_pet');

router.post('/create', selectedPetController.createSelectedPet);
router.get('/getAllSelectedPets', selectedPetController.getAllSelectedPets);

module.exports = router;