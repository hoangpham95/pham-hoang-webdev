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
                PageService.findPageByWebsiteId(vm.wid)
                    .success(function(res) {
                        vm.pages = res;
                    })
                    .error(function() {
                        console.log("Can't find page by website id: " + vm.wid);
                    });
            }
        }
    }
})();