(function() {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.gobackLogin = gobackLogin;

        function register(user) {
            if (user.password === user.verifyPassword) {
                UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
        }

        function gobackLogin() {
            $location.url("/default");
        }
    }
})();