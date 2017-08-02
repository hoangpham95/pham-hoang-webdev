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

    var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]
    ;

    function createWidget(req, res) {
        var newWidget = req.body;

        if (newWidget) {
            newWidget._id = (new Date()).now().toString();
            newWidget.pageId = req.params['pageId'];

            widgets.push(newWidget);
            res.status(200)
                .send(newWidget._id);
        } else {
            res.sendStatus(404);
        }
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pageId'];
        var wids = widgets.filter(function (wg) {
            return wg.pageId === pageId;
        });

        if (wids.length > 0) {
            res.send(wids);
        } else {
            res.status(404)
                .send("No widgets found for page " + pageId);
        }
    }

    function findWidgetById(req, res) {
        var wid = req.params['widgetId'];
        var widget = widgets.find(function(w) {
            return w._id === wid;
        });
        if (widget) {
            res.send(widget);
        } else {
            res.status(404)
                .send("No widget found");
        }
    }

    function updateWidget(req, res) {
        var wid = req.params['widgetId'];
        var newWid = req.body;

        var widget = widgets.find(function(w) {
            return w._id === wid;
        });

        if (widget) {
            for (var k in newWid) {
                widget[k] = newWid[k];
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (var w in widgets) {
            var wg = widgets[w];
            if (wg._id === widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }

    function sortWidget(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pid = req.params['pid'];

        var pageWidgets = widgets.filter(function(wid) {
            return wid.pageId === pid;
        });

        var remainingWidgets = widgets.filter(function(wid) {
            return wid.pageId !== pid;
        });

        var item = pageWidgets.splice(initial, 1)[0];
        if (item) {
            pageWidgets.splice(final, 0, item);
        }

        widgets = remainingWidgets.concat(pageWidgets);
        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body._id;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var callbackUrl = '/assignment/#/user/' + userId + '/website' + websiteId;

        res.redirect();
    }
};