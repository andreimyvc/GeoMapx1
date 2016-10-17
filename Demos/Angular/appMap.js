
var app = angular.module('appMap', []);
function addMarker(map, lat, lng, title) {
    var myLatLng = { lat: lat, lng: lng };
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: title
    });
}
var mapControlller = function ($scope, $http) {

    var getGentes = function () {
        $http({ method: 'GET', url: '/Home/Postes' })
		.success(function (data) {
		    //$scope.gentes = data;
		    //angular.forEach(data, function(value, key) {		        
		    //    addMarker(map, value.latitude, value.longitude, "Uno:" + key);
		    //})
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

app.controller('mapControlller', mapControlller);

