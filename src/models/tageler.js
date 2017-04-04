const mongoose = require('mongoose');

// Tageler Schema
const TagelerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    group: {
        type: [String],
        required: true
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    bring_along: {
        type: String,
        required: true
    },
    uniform: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    checkout: {
        deadline: {
            type: Date,
            required: false
        },
        contact: [{
            name: {
                type: String,
                required: false
            },
            phone: {
                type: String,
                required: false
            },
            mail: {
                type: String,
                required: false
            },
            other: {
                type: String,
                required: false
            }
        }]
    }
});

const Tageler = module.exports = mongoose.model('Tageler', TagelerSchema);

/** TODO: SHOULDN'T THIS BE IN CONTROLLER? **/
module.exports.getTagelersByGroup = function (group, callback) {
    Tageler.find({group: group}, callback);
};

module.exports.addTageler = function (newTageler, callback) {
    // if (newTageler.picture){
    //     console.log("pic-url: " +
    //     JSON.stringify(newTageler, null, 4));
    // }
    newTageler.save(callback);
};

module.exports.getTagelerById = function (_id, callback) {
    Tageler.findOne({_id: _id}, callback);
};

module.exports.getTagelers = function (callback) {
    Tageler.find(callback);
};