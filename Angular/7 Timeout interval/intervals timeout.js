//timeout ===========================================

var myapp1 = angular.module("myapp", []);

myapp1.controller("MyController", function ($scope, $timeout) {

    $timeout(callAtTimeout, 3000);

});

function callAtTimeout() {
    console.log("Timeout occurred");
}






var myapp2 = angular.module("myapp", []);

myapp2.controller("DIController", function ($scope, $timeout) {

    $scope.callAtTimeout = function () {
        console.log("$scope.callAtTimeout - Timeout occurred");
    };

    $timeout(function () {
        $scope.callAtTimeout();
    }, 3000);
});








//interval ==========================================

var myapp3 = angular.module("myapp", []);

myapp3.controller("MyController", function($scope, $interval){

    $interval(callAtInterval, 5000);

});

function callAtInterval() {
    console.log("Interval occurred");
}





var myapp4 = angular.module("myapp", []);

myapp4.controller("DIController", function($scope, $interval){

    $scope.callAtInterval = function() {
        console.log("$scope.callAtInterval - Interval occurred");
    }

    $interval( function(){ $scope.callAtInterval(); }, 3000);
});


/*Both $timeout and $interval have a third, optional parameter which can specify if the $digest() method is to be executed after the scheduled function finishes. Actually, the third parameter specifies if the call to the scheduled function should be done inside an $apply() call. Here is an example of how to use this third parameter:*/

$interval( function(){ $scope.callAtInterval(); }, 3000, true);

$interval( function(){ $scope.callAtInterval(); }, 3000, false);

/*These two $interval examples both have a third parameter passed to the $interval service. This parameter can be either true or false. A value of true means that the scheduled function should be called inside an $apply() call. A value of false means that it should not be called inside an $apply() call (meaning $digest() will not get called after the scheduled function finishes).*/

