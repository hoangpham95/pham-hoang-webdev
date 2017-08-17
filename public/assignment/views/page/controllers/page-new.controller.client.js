(function() {
    angular.module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        vm.newPage = newPage;

        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .success(function(pages) {
                    vm.pages = pages;
                }).error(function(error) {
                    console.log("Can't get page");
                });
        }

        function newPage(page) {
            if (!page || !page.name || page.name === "") {
                vm.error = "Cannot create page with empty name";
            } else {
                PageService.createPage(vm.wid, vm.page)
                    .success(function(res) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    })
                    .error(function() {
                        console.log("can't create page");
                    })
            }
        }

        init();
    }
})();