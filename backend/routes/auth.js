const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { register, login, user, updateProfile, verifyFirebaseToken, verifyEmail } = require('../controllers/authController');

router.post('/register', upload.single('profilePicture'),  register);
router.post('/login',  login);
router.post('/user', user);
router.put('/update-profile/:id', upload.single('profilePicture'), updateProfile);
router.get("/verify-email", verifyEmail); 

module.exports = router;
