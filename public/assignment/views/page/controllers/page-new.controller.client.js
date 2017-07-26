(function() {
    angular.module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        vm.newPage = newPage;

        function newPage(page) {
            if (!page || !page.name || !page.description || page.name === "" || page.description === "") {
                vm.error = "Cannot create empty page";
            } else {
                PageService.createPage(vm.wid, page);
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }
        }
    }
})();