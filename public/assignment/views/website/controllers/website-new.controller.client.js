(function() {
    angular.module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];

        vm.addNewWebsite = addNewWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        function addNewWebsite(website) {
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }

        init();
    }
})();