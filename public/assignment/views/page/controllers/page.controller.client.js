(function() {
    angular.module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }

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