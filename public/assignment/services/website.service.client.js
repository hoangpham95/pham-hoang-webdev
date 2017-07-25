(function () {
    angular.module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        function createWebsite($userId, $website) {
            if ($website) {
                $website._id = Date.now().toString();
                $website.developerId = $userId;

                websites.push($website);
            }
        }

        function findWebsitesByUser($userId) {
            var webs = [];
            websites.forEach(function ($web) {
                if ($web.developerId === $userId) {
                    webs.push($web);
                }
            });

            return webs;
        }

        function findWebsiteById($websiteId) {
            for (var i = 0; i < websites.length; i++) {
                var $web = websites[i];
                if ($web._id === $websiteId) {
                    return $web;
                }
            }

            return null;
        }

        function updateWebsite($websiteId, $website) {
            var $oldWeb = findWebsitesByUser($websiteId);
            if ($oldWeb) {
                $oldWeb.name = $website.name;
                $oldWeb.description = $website.description;
            }
        }

        function deleteWebsite($websiteId) {
            console.log("Length 1: " + websites.length);
            for (var i = 0; i < websites.length; i++) {
                var current = websites[i];
                if (current._id === $websiteId) {
                    websites.splice(i, 1);
                }
            }

            console.log("Length 2: " + websites.length);
        }
    }
})();