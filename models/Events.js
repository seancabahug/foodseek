const Mongoose = require('mongoose');

// mm/dd/yyyy
// `${mm},${dd},${yyyy}`
var eventSchema = new Mongoose.Schema({
    /**
     *     startingDate: {
            type: Date,
            required: true
        },
        endingDate: {
            type: Date,
            required: true
        },
     */
    name: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                return /^[\w\-\s]+$/.test(v);
            },
            message: props => "Event name is invalid"
        }
    },

    owner: {
        type: String,
        required: true
    },

    managers: [{ // Should be an array of user IDs
        type: String,
        required: true 
    }],

    description: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                return /^[\w\-\s]+$/.test(v);
            },
            message: props => "Event description is invalid"
        }
    },

    location: [{ 
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
    }],

    participants: [{ // Should be an array of user IDs
        type: String,
        required: true
    }],

    reward: {
        type: Number,
        required: true
    },

    imageUrl: {
        type: String,
        required: false
    }
})

module.exports = new Mongoose.model('Events', eventSchema);