const eventModel = require('../models/Events');
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');

exports.create = (req, res, next) => {
    eventModel.findOne({
            name: req.body.name
        })
        .exec()
        .then(event => {
            console.log(event)
            if (event) {
                return res.status(403).send({
                    error: 'Sorry, that event name is in use. Maybe you already made it?'
                })
            } else {
                var eventObject = new eventModel({
                    name: req.body.name,
                    owner: req.userData.accountId,
                    managers: [req.userData.accountId],
                    description: req.body.description,
                    location: req.body.location,
                    reward: parseInt(req.body.reward),
                    imageUrl: req.body.imageUrl
                });
                eventObject.save().then(eventObj => {
                    // Add event to database
                    res.status(201).send({
                        message: "Successfully created an event!",
                        event: eventObj
                    });
                }).catch(err => {
                    res.status(500).send({
                        error: err
                    });
                })
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).send({
                error: error
            });
        });
}

exports.delete = (req, res, next) => {
    eventModel.findByIdAndDelete(req.body.eventId, (err, result) => {
        if (!result) {
            res.status(404).send({
                message: "Event not found."
            });
        } else if (err) {
            console.log(err)
        } else {
            res.status(200).send({
                message: "Event successfully deleted!"
            });
        }
    })
}

// /events/:eventId - viewing event
// /events/:eventId/register (authenticated)
// /events/:eventId/unregister (authenticated)
// DELETE /events/:eventId - delete event (authenticated)


exports.findEventById = (req, res, next) => {
    eventModel.findById(req.params.eventId, (err, event) => {
        if (err) console.log(err);
        if (event) {
            return res.status(200).send({
                message: 'Event found!',
                data: event
            })
        } else {
            return res.status(403).send({
                error: 'Event not found!'
            })
        }
    })
};

exports.register = (req, res, next) => {
    eventModel.findById(req.params.eventId, (err, event) => {
        if (err) console.log(err);
        if (event) {
            if(event.participants.indexOf(req.userData.accountId) < 0) {
                event.participants.push(req.userData.accountId);
                event.save().then(() => {
                    userModel.findById(req.userData.accountId)
                        .exec()
                        .then(user => {
                            user.registeredEvents.push(event._id);
                            user.save();
                        });
                    return res.status(200).send({
                        message: 'Successfully registered!',
                        data: event
                    })
                }).catch(err => {                
                    return res.status(500).send({
                        error: err
                    })
                });
            } else {
                return res.status(403).send({
                    error: "You are already registered for this event."
                });
            }
        } else {
            return res.status(403).send({
                error: 'Event not found!'
            });
        }
    })
}

exports.unregister = (req, res, next) => {
    eventModel.findById(req.params.eventId, (err, event) => {
        if (err) console.log(err);
        if (event) {
            if (event.participants.indexOf(req.userData.accountId) >= 0){
                event.participants.splice(event.participants.indexOf(req.params.eventId), 1);
                event.save().then(() => {
                    return res.status(200).send({
                        message: 'Successfully unregistered!',
                        data: event
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        error: err
                    });
                })
            } else {
                return res.status(403).send({
                    message: "You are not registered to this event."
                });
            }
        } else {
            return res.status(403).send({
                error: 'Event not found!'
            })
        }
    })
}

exports.listEvents = (req, res, next) => {
    eventModel.find({}, (err, result) => {
        return res.status(200).send({
            message: 'Found all events!',
            data: result
        })
    }).catch((err) => {
        return res.status(500).send({
            error: err
        });
    })
}

exports.confirmPoints = (req, res, next) => {
    eventModel.findById(req.params.eventId)
        .exec() // yessir
        .then(event => {
            if(req.userData.accountId == event.owner) {
                userModel.findById(req.params.recipientId)
                    .exec()
                    .then(user => {
                        user.currency += event.reward
                        user.save().then(user => {
                            return res.status(200).send({
                                message
                                : 'Added your fucking currency, happy?',
                                data: user.currency
                            });
                        });
                    })
            }
        })
        .catch(err => {
            return res.status(500).send({
                error: err
            });
        })    
}

/**
 * {
                "name": "",
                "managers": req.body.managers,
                "description": req.body.description,
                "location": req.body.location
            }
 */