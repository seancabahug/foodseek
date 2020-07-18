const express = require('express');
const router = new express.Router();

const routes = {
    users: require('./user.route'),
}

router.use('/users', routes.users);

module.exports = router;