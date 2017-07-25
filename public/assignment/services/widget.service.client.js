(function () {
    angular.module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;

        function createWidget($pageId, $widgetType) {
            var $widget = {};
            $widget.pageId = $pageId;
            $widget.widgetType = $widgetType;
            $widget._id = Date.now().toString();

            widgets.push($widget);

            return $widget._id;
        }

        function findWidgetsByPageId($pageId) {
            var found = [];
            widgets.forEach(function(w) {
                if (w.pageId === $pageId) {
                    found.push(w);
                }
            });

            return found;
        }

        function findWidgetById($widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                var w = widgets[i];
                if (w._id === $widgetId) {
                    return w;
                }
            }

            return null;
        }

        function updateWidget($widgetId, $widget) {
            var oldWidget = findWidgetById($widgetId);
            if (oldWidget) {
                if ($widget.size) {
                    oldWidget.size = $widget.size;
                }

                if ($widget.text) {
                    oldWidget.text = $widget.text;
                }

                if ($widget.url) {
                    oldWidget.url = $widget.url;
                }

                if ($widget.width) {
                    oldWidget.width = $widget.width;
                }
            }
        }

        function deleteWidget($widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                var current = widgets[i];
                if (current._id === $widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }
    }
})();