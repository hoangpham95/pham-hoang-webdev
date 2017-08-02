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

            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function(validUser) {
                console.log(validUser);
                if (validUser) {
                    $location.url("/user/" + validUser._id);
                } else {
                    vm.error = "Unable to login";
                }
            }).error(function(err) {
               vm.error = "User not found";
            });
        }

        function register(user) {
            $location.url("/register");
        }
    }
})();