(function () {
    angular.module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.getTrustedHtmlSource = getTrustedHtmlSource;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pid)
                .success(function(res) {
                    vm.widgets = res;
                    console.log(vm.widgets);
                })
                .error(function() {
                    console.log("Cannot find widgets by page id");
                });
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
            return $sce.trustAs($sce.HTML, htmlText);
        }

        init();
    }
})();