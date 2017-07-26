(function() {
    angular.module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.uid = $routeParams['uid'];


        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pid);
        }

        function updatePage(page) {
            PageService.updatePage(vm.pid, page);
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

        init();
    }
})();