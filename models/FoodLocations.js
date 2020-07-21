const Mongoose = require('mongoose');

var foodLocationSchema = new Mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    isSource: { // if false, the food location is a request
        type: Boolean,
        required: true
    },

    description: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                return /^[\w\-\s]+$/.test(v);
            },
            message: props => "Request description is invalid"
        }
    },

    location: {
        longitude: {
            type: Number,
            required: true,
            validate: {
                validator: v => {
                    for(i in v) {
                        if (v.toString().replaceAll(".", "").length <= 7) {
                            return false;
                        }
                    }
                    return true;
                },
                message: props => "Invalid location"
            }
        },
        latitude: {
            type: Number,
            required: true,
            validate: {
                validator: v => {
                    for(i in v) {
                        if (v.toString().replaceAll(".", "").length <= 7) {
                            return false;
                        }
                    }
                    return true;
                },
                message: props => "Invalid location"
            }
        }
    }
    
})

module.exports = new Mongoose.model('FoodLocations', foodLocationSchema);