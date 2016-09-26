function validationCtrl($scope) {
   var validUsername = "Тодорис Баис";
   var validEmail = "thodoris.bais@gmail.com";
   
   $scope.reset = function(){
		$scope.username = validUsername;
		$scope.email = validEmail;
   };
   
   $scope.checkData = function() {
		if ($scope.username != validUsername || $scope.email != validEmail) {
			alert("Предоставленные данные не совпадают с владельцем по умолчанию");
		} else {
			alert("Вроде нормально!");
		}
	}
}