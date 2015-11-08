angular.module('app', [])
    .controller('bowlingScore', ['$scope', function ($scope) {

        $scope.show = {};
        $scope.show.number = 3;
        $scope.show.data = [];

        getContent();

        function getContent() {
            var data = null;

            try {
                data = storage.load();
                $scope.show.data = data;
            } catch (e) {
                localStorage.clear();
                console.log("e catched");
                data = [];
            }
            console.log(data);

        }
    }]);

