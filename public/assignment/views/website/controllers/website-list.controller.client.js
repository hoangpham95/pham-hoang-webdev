(function() {
    angular.module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        vm.goback = goback;
        vm.newWebsite = newWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(res) {
                    vm.websites = res;
                })
                .error(function() {
                    console.log("can't find websites by with userId: " + vm.userId);
                });
        }

        function goback() {
            $location.url('/user/' + vm.userId);
        }

        function newWebsite() {
            $location.url('/user/' + vm.userId + '/website/new');
        }

        init();
    }
})();