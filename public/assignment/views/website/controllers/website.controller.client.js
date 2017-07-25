(function() {
    angular.module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        vm.goback = goback;
        vm.newWebsite = newWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        function goback() {
            $location.url('/user/' + vm.userId);
        }

        function newWebsite() {
            $location.url('/user/' + vm.userId + '/website/new');
        }

        init();
    }

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