const express = require('express');
const router = express.Router();
const rejectedPetController = require('../controllers/rejected_pet');

router.post('/create', rejectedPetController.createRejectedPet)
router.get('/getAllRejectedPets', rejectedPetController.getAllRejectedPets);
router.get('/getRejectedPetById/:id', rejectedPetController.getRejectedPetById);
router.put('/update/:id', rejectedPetController.updateRejectedPet);
router.delete('/delete/:id', rejectedPetController.deleteRejectedPet);

module.exports = router;