(function() {
    angular.module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        vm.gotoWeb = gotoWeb;
        vm.updateUser = updateUser;
        vm.logout = logout;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        function gotoWeb() {
            $location.url('/user/' + vm.userId + '/website');
        }

        function updateUser() {
            UserService.updateUser(vm.userId, vm.user);
        }

        function logout() {
            $location.url('/login');
        }

        init();
    }
})();