(function () {
    angular.module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

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
})();