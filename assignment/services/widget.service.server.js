module.exports = function (app, model) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    // extra for sort widget
    app.put("/api/page/:pid/widget", sortWidget);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        model.widgetModel
            .createWidget(req.params.pageId, req.body)
            .then(function (widget) {
                res.status(200).send(widget);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findAllWidgetsForPage(req, res) {
        model.widgetModel
            .findAllWidgetsForPage(req.params.pageId)
            .then(function (widgets) {
                res.status(200).send(widgets);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findWidgetById(req, res) {
        model.widgetModel
            .findWidgetById(req.params.widgetId)
            .then(function (widget) {
                res.status(200).send(widget);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function updateWidget(req, res) {
        model.widgetModel
            .updateWidget(req.params.widgetId, req.body)
            .then(function () {
                res.status(200).send();
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function deleteWidget(req, res) {
        model.widgetModel
            .deleteWidget(req.params.widgetId)
            .then(function () {
                res.status(200).send();
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function sortWidget(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pid = req.params['pid'];

        model.widgetModel
            .reorderWidget(pid, initial, final)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.uid;
        var websiteId = req.body.wid;
        var pageId = req.body.pid;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var callbackUrl = '/assignment/#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';

        res.redirect(callbackUrl);
    }
};