(function () {
    angular.module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.getTrustedHtmlSource = getTrustedHtmlSource;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }

        function getYoutubeEmbedUrl(widgetUrl) {

            var urlParts = widgetUrl.split('/');
            var lastPart = urlParts[urlParts.length - 1];
            var urlParts2 = lastPart.split('=');
            var id = urlParts2[urlParts2.length - 1];

            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtmlSource(htmlText) {
            $sce.trustAs($sce.HTML, htmlText);
        }

        init();
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        vm.newWidget = newWidget;

        function newWidget(widgetType) {
            var widgetId = WidgetService.createWidget(vm.pid, widgetType);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + widgetId);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams['wgid'];
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        function updateWidget(widget) {
            if (!widget || !widget.text) {
                vm.error = "Empty content is not allowed";
            } else {
                WidgetService.updateWidget(vm.widgetId, widget);
                $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
            }

        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
        }

        init();
    }
})();