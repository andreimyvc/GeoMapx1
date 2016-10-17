
var app = angular.module('myApp', []);

var appGente = function ($scope, $http) {

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

app.controller('appGente', appGente);

