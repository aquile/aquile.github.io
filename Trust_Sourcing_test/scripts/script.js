var app = angular.module("tsApp", []);

// each item template directive
app.directive("sections", [function () {
    return {
        restrict: "E",
        templateUrl: "html-templates/data-block-template.html"
    }
}]);

//  stars rating directive
app.directive('starRating', starRating);


//  main controller
app.controller("tsCntrl", ["$scope", "$http", function ($scope, $http) {

    $scope.items = [];
    $scope.switch = true;

    getJSON();

    //  load more btn onclick handler
    $scope.loadMore = function () {
        getJSON();
    };


    //  onscroll handler enabling if switched on and vice versa
    $scope.switchScroll = function (event) {
        var el = angular.element(event.target);

        el.toggleClass("active");
        $scope.switch = !el.hasClass("active");

        if (el.hasClass("active")) {
            fillDisplay();
            event.target.innerText = "Disable infinite scrolling"
        } else {
            event.target.innerText = "Enable infinite scrolling"
        }
    };


    //  onscroll handler
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

    function fillDisplay() {
        var displayHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            body = document.body,
            html = document.documentElement,
            documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (documentHeight <= displayHeight) {
            getJSON();
            setTimeout(fillDisplay, 500);
        }
    }
}]);


//  star rating directive function
function starRating() {
    return {
        restrict: 'EA',
        template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
        scope: {
            ratingValue: '=ngModel',
            max: '=?', // optional (default is 5)
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function (scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }

            scope.toggle = function (index) {
                if (scope.readonly == undefined || scope.readonly === false) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelect({
                        rating: index + 1
                    });
                }
            };
            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (newValue) {
                    updateStars();
                }
            });
        }
    };
}

