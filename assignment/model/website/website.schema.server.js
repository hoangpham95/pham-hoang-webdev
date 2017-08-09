/**
 * Created by hpham on 8/7/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    return mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default: Date.now}
    },
        {collection: 'website'});
};