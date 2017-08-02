(function() {
    angular.module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];

        vm.addNewWebsite = addNewWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(res) {
                    vm.websites = res;
                })
                .error(function() {
                    console.log("can't find websites by user with id: " + vm.uid);
                });
        }

        function addNewWebsite(website) {
            if (website) {
                WebsiteService
                    .createWebsite(vm.uid, website)
                    .success(function (res) {
                        $location.url("/user/" + vm.uid + "/website");
                    })
                    .error(function () {
                        console.log("Fail to create website");
                    });
            }
        }

        init();
    }
})();