(function() {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.register = register;
        vm.gobackLogin = gobackLogin;

        function register(user) {
            if (!user.username || !user.password ||!user.verifyPassword
                || user.username.length === 0
                || user.password.length === 0
                || user.verifyPassword.length === 0) {
                vm.error = "All the fields are required";
                return;
            }
            console.log("Register user");
            if (user.password === user.verifyPassword) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        console.log("User: " + user);
                        vm.error = "sorry that username is taken"
                    })
                    .error(function(){
                        UserService.register(user)
                            .success(function(usr) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + usr._id);
                            }).error(function(error) {
                                vm.error = "Cannot register user";
                        })
                    });
            } else {
                vm.error = "Password do not match";
            }
        }

        function gobackLogin() {
            $location.url("/default");
        }
    }
})();