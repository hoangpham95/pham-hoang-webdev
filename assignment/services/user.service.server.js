module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUserName);
    app.get("/api/user", findUserByCredential);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    console.log("User service");

    function createUser(req, res) {
        var newUser = req.body;
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