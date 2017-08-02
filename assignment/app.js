const userService = require("./services/user.service.server.js");
const websiteService = require("./services/website.service.server.js");
const pageService = require("./services/page.service.server.js");
const widgetService = require("./services/widget.service.server.js");

module.exports = function(app) {
    userService(app);
    websiteService(app);
    pageService(app);
    widgetService(app);

    console.log("App is called");
};
