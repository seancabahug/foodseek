const express = require('express');
const router = new express.Router();

const routes = {
    users: require('./user.route'),
    search: require('./search.route')
}

router.use('/users', routes.users);
router.use('/search', routes.search);

module.exports = router;