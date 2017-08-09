/**
 * Created by hpham on 8/7/17.
 */
var mongoose = require('mongoose');

module.exports = function() {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now},
        websites: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'website'}
        ]
    }, {collection: 'user'});
};