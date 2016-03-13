var app = angular.module("tsApp", ['luegg.directives']);

app.directive("section", [function () {
    return {
        restrict: "E",
        templateUrl: "html-templates/data-block-template.html",
        link: function ($scope, element, attributes) {
            //console.log($scope)
        }
    }
}]);

app.controller("tsCntrl", ["$scope", "$http", function ($scope, $http) {

    $scope.items = [];

    getJSON();

    $scope.loadMore = function () {
        getJSON();
    };

    function getJSON() {
        $http.get("json/items.json").then(function (response) {
            if (response.data) {
                $scope.items = $scope.items.concat(response.data);
            }
        });
    }
}]);
