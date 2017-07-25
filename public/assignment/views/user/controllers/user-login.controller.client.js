(function() {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        vm.register = register;
        
        function login(user) {
            if (!user || !user.username || !user.password || user.username === "" || user.password === "") {
                vm.error = "Wrong username/password";
            }

            var validUser = UserService.findUserByCredentials(user.username, user.password);
            console.log(validUser);
            if (validUser) {
                $location.url("/user/" + validUser._id);
            } else {
                vm.error = "Unable to login";
            }
        }

        function register(user) {
            $location.url("/register");
        }


    }

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