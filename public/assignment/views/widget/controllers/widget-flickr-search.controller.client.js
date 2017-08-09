(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, $location, WidgetService, $routeParams) {
        var vm = this;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm+".staticflickr.com/"
                + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";
            WidgetService.setPhoto(url);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
        }
    }
})();