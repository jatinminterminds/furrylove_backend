const express = require('express');
const router = express.Router();
const selectedPetController = require('../controllers/selected_pet');

router.post('/create', selectedPetController.createSelectedPet);
router.get('/getAllSelectedPets', selectedPetController.getAllSelectedPets);
router.get('/getSelectedPetById/:id', selectedPetController.getSelectedPetById);
router.put('/update/:id', selectedPetController.updateSelectedPet);

module.exports = router;