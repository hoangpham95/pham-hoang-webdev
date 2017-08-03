module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        var userId = req.params['userId'];
        var website = req.body;

        if (website) {
            website._id = (new Date()).getTime().toString();
            website.developerId = userId;

            websites.push(website);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }

    function findAllWebsitesForUser(req, res) {
        var webs = [];
        var userId = req.params['userId'];

        websites.forEach(function (web) {
            if (web.developerId === userId) {
                webs.push(web);
            }
        });

        if (webs.length > 0) {
            res.send(webs);
        } else {
            res.status(404)
                .send("No website found for user with id: " + userId);
        }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        var website = websites.find(function(w) {
            return w._id === websiteId;
        });

        if (website) {
            res.send(website);
        } else {
            res.status(404)
                .send("No website found with id: " + websiteId);
        }
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;

        var oldWeb = websites.find(function(w) {
            return w._id === websiteId;
        });

        if (oldWeb) {
            oldWeb.name = newWebsite.name;
            oldWeb.description = newWebsite.description;
            res.status(200);
        } else {
            res.status(404)
                .send("Website not found");
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        for (var i = 0; i < websites.length; i++) {
            var current = websites[i];
            if (current._id === websiteId) {
                websites.splice(i, 1);
                res.status(200);
                return;
            }
        }

        res.status(404);
    }
};