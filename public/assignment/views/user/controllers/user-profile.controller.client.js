(function() {
    angular.module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        vm.gotoWeb = gotoWeb;
        vm.updateUser = updateUser;
        vm.logout = logout;

        function init() {
            if (!vm.userId) {
                vm.user = $rootScope.currentUser;
            } else {
                UserService.findUserById(vm.userId)
                    .success(function (user) {
                        vm.user = user;
                    });
            }
        }

        function gotoWeb() {
            $location.url('/user/' + vm.userId + '/website');
        }

        function updateUser() {
            UserService.updateUser(vm.user._id, vm.user)
                .success(function(res) {
                    console.log("Update user success");
                    vm.message = "User successfully updated";
                }).error(function (err) {
                    vm.error = "Unable to update user";
                })
        }

        function logout() {
            $location.url('/login');
        }

        init();
    }
})();