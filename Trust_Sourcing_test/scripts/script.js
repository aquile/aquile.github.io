var app = angular.module("tsApp", []); //'luegg.directives'

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
    $scope.switch = true;

    getJSON();

    $scope.loadMore = function () {
        getJSON();
    };

    $scope.switchScroll = function (event) {
        var el = angular.element(event.target);
        el.toggleClass("active");
        $scope.switch = !el.hasClass("active");

        if (el.hasClass("active")) getJSON(); getJSON(); getJSON();
    };


    window.onscroll = function () {
        var displayHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            scrolled = displayHeight + (window.pageYOffset || document.documentElement.scrollTop),
            body = document.body,
            html = document.documentElement,
            height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);

        console.log(scrolled + ' === ' + height);
        if ((scrolled === height) && !$scope.switch) getJSON();

    };

    function getJSON() {
        $http.get("json/items.json").then(function (response) {
            if (response.data) {
                $scope.items = $scope.items.concat(response.data);
            }
        });
    }
}]);
