/**
 * Created by hpham on 8/7/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    return mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
        dateCreated: {type: Date, default: Date.now}
    },
        {collection: 'page'});
};
