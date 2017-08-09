(function() {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.gobackLogin = gobackLogin;

        function register(user) {
            console.log("Register user");
            if (user.password === user.verifyPassword) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        console.log("User: " + user);
                        vm.error = "sorry that username is taken"
                    })
                    .error(function(){
                        console.log("Creating user");
                        UserService
                            .createUser(user)
                            .success(function(user){
                                console.log('create user successfully');
                                $location.url('/user/' + user._id);
                            })
                            .error(function () {
                                vm.error = 'sorry could not register';
                            });
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