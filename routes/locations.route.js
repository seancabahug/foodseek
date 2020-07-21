const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const locationsController = require('../controllers/locations.controller');

router.post('/create', auth, locationsController.create);
router.get('/near', auth, locationsController.searchNearLocation);
router.get('/all', auth, locationsController.listLocations);
router.get('/:searchId', auth, locationsController.findLocationById);

module.exports = router;