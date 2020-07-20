const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const searchController = require('../controllers/search.controller');

router.post('/create', auth, searchController.create);
router.get('/all', auth, searchController.listEvents);
router.get('/:searchId', auth, searchController.findEventById);

module.exports = router;