(function() {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    // var secret = process.env.FLICKR_SECRET;
    function FlickrService($http) {
        var vm = this;

        var key = '8b85f64f70166ca906f64126b3ffcac6';
        var secret = '9be9185d26d7d848';

        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();