
var app = angular.module('repositoryBaseController', []);

var repositoryBaseController = function ($scope, $http) {
    var getPoryectos = function () {
        $http({ method: 'GET', url: '/diarias/GetProyectosByEmpresas' })
		.success(function (data) {
		    $scope.proyectosData = data;
		})
		.error(function (data) {
		    $scope.error = data.Message;
		});
        //$http.get('/api/GenteApi')
        //.then(function (response) {
        //    $scope.gentes = response.data;
        //});
    };
    var getGentes = function () {
        $http({ method: 'GET', url: '/api/GenteApi' })
		.success(function (data) {
		    $scope.gentes = data;
		})
		.error(function (data) {
		    $scope.error = data.Message;
		});
        //$http.get('/api/GenteApi')
        //.then(function (response) {
        //    $scope.gentes = response.data;
        //});
    };
    getGentes();
};

app.controller('repositoryBaseController',repositoryBaseController );

