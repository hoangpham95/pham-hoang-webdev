var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUserName);
    app.get("/api/user", findUserByCredential);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get('/api/loggedin', loggedin);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/profile',
        failureRedirect: '/assignment/#/login',
        enableProof: true
    }));

    console.log("User service");

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID: '1327093684061150',
        clientSecret: '68dc3deeb95fca81a2337ceb52716db9',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function serializeUser(user, callback) {
        callback(null, user);
    }

    function deserializeUser(user, callback) {
        model.userModel.findUserById(user._id)
            .then(function (user) {
                callback(null, user);
            }, function (err) {
                callback(err, null);
            });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("Profile: " + JSON.stringify(profile));
        model.userModel.findUserByFacebookId(profile.id)
            .then(function (user) {
                if (!user || user === null) {
                    var newUser = {
                        username: profile.displayName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    model.userModel.createUser(newUser)
                        .then(function(usr) {
                            done(null, usr);
                        }, function(error) {
                            done(error, null);
                        });
                } else {
                    done(null, user);
                }
            }, function (error) {
                done(error, null);
            })
    }

    function localStrategy(username, password, callback) {
        model.userModel.findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    callback(null, user);
                }
            }, function (error) {
                callback(error, null);
            });
    }

    /*
     * Done implementing passport feature. Implementing user api call
     */

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        
        model.userModel.createUser(user)
            .then(function (usr) {
                if (user) {
                    req.login(usr, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(usr);
                        }
                    })
                }
            })
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.body;
        model.userModel.findUserByCredentials(user.username, user.password)
            .then(function (usr) {
                res.json(usr);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.password) {
            var newPwd = bcrypt.hashSync(newUser.password);
            console.log(newPwd)
            newUser.password = newPwd;
        }
        model.userModel
            .createUser(newUser)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function findUserByCredential(req, res) {
        model.userModel
            .findUserByCredentials(req.query['username'], req.query['password'])
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findUserByUserName(req, res) {
        model.userModel
            .findUserByUsername(req.query['username'])
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findUserById(req, res) {
        model.userModel
            .findUserById(req.params['userId'])
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateUser(req, res) {
        model.userModel
            .updateUser(req.params['userId'], req.body)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function deleteUser(req, res) {
        model.userModel
            .deleteUser(req.params.userId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }
};