(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDiv);

    console.log('directive');
    function sortableDiv(WidgetService) {
        function sortLinking(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    initial = ui.item.index();
                },
                stop: function (event, ui) {
                    final = ui.item.index();
                    WidgetService.sortWidget(attributes.wbdvSortable, initial, final)
                        .success(function(res) {
                            console.log("Success sorting widget");
                        })
                        .error(function() {
                            console.log("Cannot sort widget");
                        });
                }
            });
        }

        return {
            link: sortLinking
        };
    }
})();