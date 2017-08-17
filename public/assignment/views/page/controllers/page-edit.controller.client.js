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
            PageService.findPageById(vm.pid)
                .success(function(res) {
                    vm.page = res;
                })
                .error(function() {
                    console.log("Can't find page by id");
                });

            PageService.findPageByWebsiteId(vm.wid)
                .success(function (res) {
                    vm.pages = res;
                })
                .error(function () {
                    console.log("Can't find page by website id");
                });
        }

        function updatePage(page) {
            if (page && page.name && page.name.length > 0) {
                PageService.updatePage(vm.pid, vm.page)
                    .success(function(res) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    })
                    .error(function() {
                        console.log("Cannot update page");
                    });
            } else {
                vm.error = "Cannot update page with empty name";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pid)
                .success(function(res) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function() {
                    console.log("Cannot delete page");
                });
        }

        init();
    }
})();