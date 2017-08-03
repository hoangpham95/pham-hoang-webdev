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
            WidgetService.createWidget(vm.pid, widgetType)
                .success(function(res) {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget/' + res._id);
                }).error(function() {
                    vm.error = "Cannot create widget";
                });
        }
    }
})();