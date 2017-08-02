module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUserName);
    app.get("/api/user", findUserByCredential);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    console.log("User service");

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date()).now().toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByCredential(req, res) {
        console.log("Find user by credentials");

        var username = req.query['username'];
        var password = req.query['password'];

        var user = users.find(function(u) {
            return u.username === username && u.password === password;
        });

        if (user) {
            res.send(user);
        } else {
            res.status(404)
                .send("User not found for username \"" + username + "\" and password \"" + password);
        }
    }

    function findUserByUserName(req, res) {
        var username = req.query['username'];

        var user = users.find(function(u) {
           return u.username === username;
        });

        if (user) {
            res.send(user);
        } else {
            res.status(404)
                .send("User not found for username \"" + username + "\"");
        }
    }

    function findUserById(req, res) {
        var id = req.params['userId'];

        var user = users.find(function(u) {
            return u._id === id;
        });

        if (user) {
            res.send(user);
        } else {
            res.status(404)
                .send("User not found for id \"" + id + "\"");
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user._id === newUser._id) {
                user.username = newUser.username;
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;

                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var id = req.params['userId'];
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);
    }
};