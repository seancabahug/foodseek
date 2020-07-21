const foodLocationModel = require('../models/FoodLocations');

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

/*
    Location:
        - Latitude
        - Longitude
    Zoom
*/

const locationRangeOffset = 20;
exports.searchNearLocation = (req, res, next) => {
    foodLocationModel.find({ isSource: !req.userData.isFoodProvider })
        .where('location.latitude').gte(parseInt(req.query.latitude) - locationRangeOffset).lte(parseInt(req.query.latitude) + locationRangeOffset)
        .where('location.longitude').gte(parseInt(req.query.longitude) - locationRangeOffset).lte(parseInt(req.query.longitude) + locationRangeOffset)
    .then(foodLocations => {
        console.dir(foodLocations)
        res.status(200).send(foodLocations);
    }).catch(err => {
        res.status(500).send({
            error: err
        });
    });
}

exports.delete = (req, res, next) => {
    foodLocationModel.findByIdAndDelete(req.body.eventId, (err, result) => {
        if (!result) {
            res.status(404).send({
                message: "Food location not found."
            });
        } else if (err) {
            console.log(err)
        } else {
            res.status(200).send({
                message: "Food location successfully deleted!"
            });
        }
    })
}

exports.findLocationById = (req, res, next) => {
    foodLocationModel.findById(req.params.eventId, (err, event) => {
        if (err) console.log(err);
        if (event) {
            return res.status(200).send({
                message: 'Food location found!',
                data: event
            })
        } else {
            return res.status(403).send({
                error: 'Food location not found!'
            })
        }
    })
};

exports.listLocations = (req, res, next) => {
    foodLocationModel.find({ isSource: !req.userData.isFoodProvider }, (err, result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        return res.status(500).send({
            error: err
        });
    })
}