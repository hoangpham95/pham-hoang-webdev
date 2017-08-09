const userService = require("./services/user.service.server.js");
const websiteService = require("./services/website.service.server.js");
const pageService = require("./services/page.service.server.js");
const widgetService = require("./services/widget.service.server.js");

const userModel = require('./model/user/user.model.server')();
const websiteModel = require('./model/website/website.model.server')();
const pageModel = require('./model/page/page.model.server')();
const widgetModel = require('./model/widget/widget.model.server')();

module.exports = function(app) {
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userService(app, model);
    websiteService(app, model);
    pageService(app, model);
    widgetService(app, model);

    console.log("App is called");
};
