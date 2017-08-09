module.exports = function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        model.pageModel
            .createPage(req.params.websiteId, req.body)
            .then(function (page) {
                res.status(200).send(page);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findAllPagesForWebsite(req, res) {
        model.pageModel
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function (pages) {
                res.status(200).send(pages);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findPageById(req, res) {
        model.pageModel
            .findPageById(req.params.pageId)
            .then(function (page) {
                res.status(200).send(page);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function updatePage(req, res) {
        model.pageModel
            .updatePage(req.params.pageId, req.body)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function deletePage(req, res) {
        model.pageModel
            .deletePage(req.params.pageId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(404).send(err);
            });
    }
};