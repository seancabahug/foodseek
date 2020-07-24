const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getSelfInfo);
router.get('/:userId', userController.getUserInfo);

module.exports = router;