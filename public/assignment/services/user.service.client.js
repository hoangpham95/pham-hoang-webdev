(function () {
    angular.module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;
        
        function createUser($user) {
            $user._id = Date.now().toString();

            users.push($user);
        }
        
        function findUserById($userId) {
            for (var i = 0; i < users.length; i++) {
                var $user = users[i];
                if ($user._id === $userId) {
                    return $user;
                }
            }
            
            return null;
        }
        
        function findUserByUsername($username) {
            for (var i = 0; i < users.length; i++) {
                var $user = users[i];
                if ($user.username === $username) {
                    return $user;
                }
            }

            return null;
        }

        function findUserByCredentials($username, $password) {
            for (var i = 0; i < users.length; i++) {
                var $user = users[i];
                if ($user.username === $username && $user.password === $password) {
                    return $user;
                }
            }

            return null;
        }

        function updateUser($userId, $user) {
            var $localUser = findUserById($userId);

            if ($localUser) {
                $localUser.username = $user.username;
                $localUser.email = $user.email;
                $localUser.firstName = $user.firstName;
                $localUser.lastName = $user.lastName;
            }
        }

        function deleteUser($userId) {
            for (var i = 0; i < $user.length; i++) {
                var $current = $user[i];
                if ($current._id === $userId) {
                    $user.splice(i, 1);
                    return;
                }
            }
        }
    }
})();