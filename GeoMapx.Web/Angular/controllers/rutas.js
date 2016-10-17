var rutas = angular.module('rutasApp',['ngRoute']);
rutas.controller('onecontroler',['$location',function(location){
    location.path('/diarias');
}]);
rutas.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/dashboard', {
        templateUrl: 'dashboard/'
    }).
    when('/home/about', {
        templateUrl: 'home/about'
    }).
        when('/diarias', {
            templateUrl: 'diarias/'
        }).otherwise({ redirectTo: '/' });
}]).run(function($location){
  $location.path('/diarias');
});