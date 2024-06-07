const express = require('express');
const authController = require('../controllers/auth');


const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/userinfo', authController.getUserInfo);
router.post('/letoken', authController.readToken);

module.exports = router;