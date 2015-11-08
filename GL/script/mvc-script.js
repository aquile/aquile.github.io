//Declare angular module
var app = angular.module("app", []);

//Declare angular controller
app.controller("bowlingScore", ["$scope", function ($scope) {

    $scope.show = {};
    $scope.show.number = 3;

    getContent();

    function getContent() {
        var data = null;

        try {
            data = storage.load();
            data.forEach(function (item) {
                item.date = moment(item.date).startOf("minute").fromNow();
            });
            $scope.show.data = data;
        } catch (e) {
            localStorage.clear();
            console.log("error fetched - localStorage.clear() used");
            $scope.show.data = [];
        }
    }
}]);

