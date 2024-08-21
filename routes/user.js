var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const uploads = require('../middleware/fileUpload');
const userValidations = require('../validations/userValidations');
const { jwtAuthMiddleware } = require('../middleware/jwt');

router.post('/login', userValidations.loginValidations, userController.loginUser);
router.post('/verifyOtp', userValidations.varifyOtpValidations, userController.verifyOtp);
router.post('/resendOtp', userValidations.resendOtpValidations, userController.resendOtp);
router.use(jwtAuthMiddleware);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.put('/update/:id', uploads.array('images'), userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
