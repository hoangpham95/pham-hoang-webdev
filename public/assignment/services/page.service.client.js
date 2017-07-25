(function () {
    angular.module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];



        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage($websiteId, $page) {
            $page.websiteId = $websiteId;
            $page._id = Date.now().toString();
            pages.push($page);
        }

        function findPageByWebsiteId($websiteId) {
            var websitePages = [];
            pages.forEach(function ($page) {
                if ($page.websiteId === $websiteId) {
                    websitePages.push($page);
                }
            });

            return websitePages;
        }

        function findPageById($pageId) {
            for (var i = 0; i < pages.length; i++) {
                var $page = pages[i];
                if ($page._id === $pageId) {
                    return $page;
                }
            }

            return null;
        }

        function updatePage($pageId, $page) {
            var oldPage = findPageById($pageId);
            if (oldPage) {
                oldPage.name = $page.name;
                oldPage.description = $page.description;
            }
        }

        function deletePage($pageId) {
            for (var i = 0; i < pages.length; i++) {
                var current = pages[i];
                if (current._id === $pageId) {
                    pages.splice(i, 1);
                    return;
                }
            }
        }
    }
})();