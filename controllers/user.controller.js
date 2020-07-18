const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const notAllowedUserNames = require('./notAllowed.json').taken;

exports.login = (req, res, next) => {
    console.log(notAllowedUserNames.indexOf(req.body.username))
    if (notAllowedUserNames.indexOf(req.body.username) < 0) {
        userModel.findOne(req.body.username ? {
                username: req.body.username
            } : {
                email: req.body.email
            })
            .exec()
            .then(identification => {
                if (!identification) {
                    return res.status(401).send({
                        // Discord
                        // yessir
                        error: "Inncorrect credentials"
                    })
                } else {
                    bcrypt.compare(req.body.password, identification.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({
                                accountId: identification._id
                            }, process.env.JWT_SECRET, {
                                expiresIn: "3h"
                            });
                            return res.status(201).send({
                                message: "Login successful!",
                                token: token
                            })
                        } else {
                            return res.status(401).send({
                                error: "Authentication failed. (ERR:02)"
                            })
                        }
                    });
                }
            });
    } else {
        return res.status(401).send({
            error: "Authentication failed. (ERR:03)"
        })
    }
}

exports.register = (req, res, next) => {
    if (!notAllowedUserNames.indexOf(req.body.username) < 0) {
        return res.status(401).send({
            error: "Authentication failed. (ERR:03)"
        })
    }
    userModel.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) console.log(err);
        if (user) {
            return res.status(403).send({
                error: 'Sorry, that username is in use!'
            })
        } else {
            if (req.body.password) {
                bcrypt.genSalt(10, function (err, salt) {
                    // Generate salt
                    bcrypt.hash(req.body.password, salt).then(hash => {
                        var userObject = new userModel({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            currency: 0
                        });
                        userObject.save().then(userObj => { // Add user to database
                            res.status(201).send({
                                message: "User successfully registered!",
                                user: userObj
                            });
                        }).catch(errrrrrr => {
                            res.status(500).send({
                                error: errrrrrr
                            });
                        })
                    }).catch(err => {
                        console.error(err);
                    });

                })
            } else {
                return res.status(400).send({
                    error: "Oops, your password field is blank!"
                });
            }
        }
    });
}

exports.getSelfInfo = (req, res, next) => {
    userModel.findById(req.userData.accountId)
        .then(user => {
            if (user) {
                return res.status(201).send(user);
            } else {
                return res.status(404).send({
                    error: "Something's definitely broken, contact sysadmins, like sean, wendys, or those other people with no life (wendys)"
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                error: err
            });
        });
}

exports.leaderboard = (req, res, next) => {
    userModel.find({
            currency: {
                $gte: -1
            }
        })
        .then(users => {
            if (users) {
                users.sort((a, b) => {
                    return a.currency - b.currency;
                });
                return res.status(201).send(users.reverse())
            } else {
                return res.status(404).send({
                    error: "Something's definitely broken, contact sysadmins, like sean, wendys, or those other people with no life (wendys)"
                })
            }
        })
        .catch(err => {
            return res.status(500).send({
                error: err
            });
        });
}