module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        model.websiteModel
            .createWebsiteForUser(req.params.userId, req.body)
            .then(function (website) {
                res.status(200).send(website);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findAllWebsitesForUser(req, res) {
        model.websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.status(200).send(websites);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findWebsiteById(req, res) {
        model.websiteModel
            .findWebsiteById(req.params.websiteId)
            .then(function (website) {
                res.status(200).send(website);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function updateWebsite(req, res) {
        model.websiteModel
            .updateWebsite(req.params.websiteId, req.body)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function deleteWebsite(req, res) {
        model.websiteModel
            .deleteWebsite(req.params.websiteId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(404).send(err);
            });
    }
};