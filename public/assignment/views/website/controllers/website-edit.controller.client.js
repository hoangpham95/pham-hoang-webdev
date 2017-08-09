(function() {
    angular.module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.websiteId =  $routeParams['wid'];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function(res) {
                    vm.websites = res;
                })
                .error(function() {
                    vm.error("Can't find websites by user id: " + vm.uid);
                });

            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function(res) {
                    console.log(res);
                    vm.website = res;
                })
                .error(function() {
                    vm.error = "Can't find websites by website id: " + vm.wid;
                })
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
                .success(function(res) {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function() {
                    console.log("Cannot update website");
                });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function(res) {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function() {
                    console.log("can't delete website");
                });
        }

        init();
    }
})();