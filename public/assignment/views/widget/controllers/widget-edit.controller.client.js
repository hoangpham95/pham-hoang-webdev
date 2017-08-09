(function () {
    angular.module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams['wgid'];
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadImage = uploadImage;

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function(res) {
                    vm.widget = res;
                    vm.widget.userId = vm.uid;
                    vm.widget.pageId = vm.pid;
                    vm.widget.websiteId = vm.wid;
                })
                .error(function() {
                    console.log("Cannot find widget by id");
                });
        }

        function updateWidget(widget) {
            if (!widget) {
                vm.error = "Empty content is not allowed";
            } else {
                WidgetService.updateWidget(vm.widgetId, widget)
                    .success(function(res) {
                        $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                    })
                    .error(function() {
                        vm.error = "Cannot update widget";
                    });
            }

        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function(res) {
                    $location.url('/user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                })
                .error(function() {
                    vm.error = "Cannot delete widget";
                });
        }

        function uploadImage() {
            WidgetService.uploadImage(vm.widget)
                .success(function(res) {
                    console.log(res);
                })
                .error(function(err) {
                    console.log(err);
                });
        }

        init();
    }
})();