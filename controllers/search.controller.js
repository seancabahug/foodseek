const foodLocationModel = require('../models/FoodLocations');
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');

exports.create = (req, res, next) => {
    var foodLocationObject = new foodLocationModel({
        userId: req.userData.accountId,
        isSource: req.userData.isFoodProvider,
        description: req.body.description,
        location: req.body.location
    });
    foodLocationObject.save().then(eventObj => {
        // Add event to database
        res.status(201).send({
            message: "Successfully saved food location!",
            event: eventObj
        });
    }).catch(err => {
        res.status(500).send({
            error: err
        });
    })
}

exports.delete = (req, res, next) => {
    foodLocationModel.findByIdAndDelete(req.body.eventId, (err, result) => {
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

exports.findLocationById = (req, res, next) => {
    foodLocationModel.findById(req.params.eventId, (err, event) => {
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

exports.listEvents = (req, res, next) => {
    foodLocationModel.find({}, (err, result) => {
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

/**
 * {
                "name": "",
                "managers": req.body.managers,
                "description": req.body.description,
                "location": req.body.location
            }
 */