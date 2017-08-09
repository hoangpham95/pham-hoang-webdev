/**
 * Created by hpham on 8/7/17.
 */

module.exports = function() {
    var connectionString = 'mongodb://127.0.0.1:27017/webdev';

    if(process.env.MONGODB_URI) { // check if running remotely
        connectionString = process.env.MONGODB_URI
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
};
