const Mongoose = require('mongoose');

// mm/dd/yyyy
// `${mm},${dd},${yyyy}`
var eventSchema = new Mongoose.Schema({

    asker: {
        type: String,
        required: true
    },

    hero: {
        type: String,
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
})

module.exports = new Mongoose.model('Events', eventSchema);