const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileUpload');
const petController = require('../controllers/pet');

router.post('/create', uploads.array('images'), petController.createPet);
router.get('/getAllPets', petController.getAllPets);
router.get('/getPetById/:id', petController.getPetById);
router.put('/update/:id', uploads.array('images'), petController.updatePet);
router.delete('/delete/:id', petController.deletePet);

module.exports = router;