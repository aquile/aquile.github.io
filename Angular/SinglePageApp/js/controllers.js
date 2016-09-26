/**
 * Created by aquile_bernadotte on 06.12.15.
 */
app.controller('Homepage',['$scope',function($scope){
    $scope.homepage = "Главная";
}]);
app.controller('About',['$scope', function($scope){
    $scope.about = "Lorem ipsum...";
}]);
app.controller('Date',['$scope', function($scope) {
    $scope.now = new Date();
}]);
