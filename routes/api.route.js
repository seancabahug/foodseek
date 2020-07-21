const express = require('express');
const router = new express.Router();

const routes = {
    users: require('./user.route'),
    locations: require('./locations.route')
}

router.use('/users', routes.users);
router.use('/locations', routes.locations);

module.exports = router;