(function() {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        vm.register = register;
        vm.logout = logout;
        
        function login(user) {
            if (!user || !user.username || !user.password || user.username === "" || user.password === "") {
                vm.error = "Wrong username/password";
            }

            UserService.login(user)
                .success(function(validUser) {
                    $location.url("/user/" + validUser._id);
                }).error(function(error) {
                    vm.error = "Cannot login";
            })
        }

        function register(user) {
            $location.url("/register");
        }

        function logout() {
            UserService.logout()
                .success(function() {
                    $location.url("/");
                }).error(function(error) {
                    vm.error = "Cannot logout";
            })
        }
    }
})();