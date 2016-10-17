
var rutas = angular.module('rutasApp',['ngRoute']);
rutas.controller('onecontroler',['$location',function(location){
  location.path('/ima/imagen1');
}]);
rutas.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/ima/imagen1', {
        templateUrl: 'tpl/imagen1.html'
    }).
    when('/ima/imagen2', {
        templateUrl: 'tpl/imagen2.html'
    }).
        when('/home/about', {
            templateUrl: 'home/about'
        }).otherwise({ url: '/' });
}]).run(function($location){
  $location.path('/ima/imagen2');
});
