module.exports = function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var websiteId = req.params['websiteId'];
        var page = req.body;

        page.websiteId = websiteId;
        page._id = (new Date()).getTime().toString();
        pages.push(page);

        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var websitePages = [];

        pages.forEach(function (page) {
            if (page.websiteId === websiteId) {
                websitePages.push(page);
            }
        });

        if (websitePages.length > 0) {
            res.send(websitePages);
        } else {
            res.status(404)
                .send("No page for website with id: " + websiteId);
        }
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];

        var page = pages.find(function(p) {
            return p._id === pageId;
        });

        if (page) {
            res.send(page);
        } else {
            res.status(404)
                .send("No page with id " + pageId);
        }
    }

    function updatePage(req, res) {
        var pageId = req.param['pageId'];
        var newPage = req.body;

        for (var i = 0; i < pages.length; i++) {
            var current = pages[i];
            if (current._id === pageId) {
                current.name = newPage.name;
                current.description = newPage.description;

                res.status(200);
                return;
            }
        }

        res.status(404);
    }

    function deletePage(req, res) {
        var pageId = req.param['pageId'];

        for (var i = 0; i < pages.length; i++) {
            var current = pages[i];
            if (current._id === pageId) {
                pages.splice(i, 1);
                res.status(200);
                return;
            }
        }

        res.status(404);
    }
};