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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/' + vm.website.developerId + '/website');
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/' + vm.website.developerId + '/website');
        }

        init();
    }
})();