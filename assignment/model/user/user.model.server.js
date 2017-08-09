/**
 * Created by hpham on 8/7/17.
 */
var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server')();

module.exports = function() {

    var userModel = mongoose.model('user', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function findUserById(userId) {
       var deferred = q.defer();
       userModel.findById(userId, function(err, actor) {
           if (err) {
               console.log(err);
               deferred.reject(err);
           } else {
               deferred.resolve(actor);
           }
       });

       return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, user) {
            if (err) {
                console.log('error', err.message);
                defered.reject(err);
            } else {
                if (user === null) {
                    deferred.reject('User not found');
                } else {
                    deferred.resolve(user);
                }
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        userModel
            .findOne({username: username, password: pasword})
            .exec(function(error, user) {
                if (error) {
                    deferred.abort(error);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel
            .findOneAndUpdate({_id: userId}, user, function(err, doc) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function(err, user) {
            if (err) {
                deferred.abort();
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};