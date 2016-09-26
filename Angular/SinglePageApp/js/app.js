/**
 * Created by aquile_bernadotte on 06.12.15.
 */
var app=angular.module('app',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        // страница по умолчанию
        .when('/',{
            templateUrl : 'pages/homepage.html',
            controller : 'Homepage'
        })
        // страница о нас
        .when('/about',{
            templateUrl : 'pages/about.html',
            controller : 'About'
        })
        // страница с датой
        .when('/date',{
            templateUrl : 'pages/date.html',
            controller : 'Date'
        });
});