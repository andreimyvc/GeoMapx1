
var app = angular.module('POS', []);
var rutas = angular.module('rutasApp', ['ngRoute']);
/*
rutas.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/ima/imagen1', {
        templateUrl: 'plantillas/imagen1.html'
    }).
        when('/ima/imagen2', {
            templateUrl: 'plantillas/imagen2.html'
        }).otherwise({ url: 'plantillas/imagen2.html' });
}]);
*/
app.controller('posController', ['$scope', function ($scope) {
    $scope.seleccionado = { Nombre: "", Precio: 0, Seleccionado: false };
    $scope.Cantidad = 1;
    $scope.Precio = 4.99;
    $scope.visible = false;
    $scope.imagenx = "imagenes/imagen1.png";
    $scope.CheckOut = function () {
        alert("La orden fue procesada!");
        $scope.Cantidad = 0;
    };
    $scope.LoadArticulos = function () {

        $scope.Articulos = [
        { Nombre: "Yoyo 1", Precio: 100, Seleccionado: false },
        { Nombre: "Kendama Simple", Precio: 240, Seleccionado: false },
        { Nombre: "Trompo Acrobatico", Precio: 350, Seleccionado: false },
        { Nombre: "Cla Cla", Precio: 30, Seleccionado: false }
        ];
    };

    $scope.FSeleccionado = function (aArticulo) {
        $scope.seleccionado.Precio = aArticulo.Precio;
    };

    $scope.SetClass = function () {
        $scope.miclase = 'tabla';
    };

    $scope.SetStyle = function () {
        $scope.miestilo = { 'font-family': 'Calibri cursive', 'font-size': '15px',
            'background-color': 'white'
        };
    };

    $scope.RemoveStyle = function () {
        $scope.miestilo = "";
        $scope.miclase = "";
    };

    $scope.ShowOrHidden = function () {
        $scope.visible = !$scope.visible;
        if ($scope.visible) {
            $scope.imagenx = "imagenes/imagen2.png";
        }
        else
        {
            $scope.imagenx = "imagenes/imagen1.png";
        }
    };
} ]);

app
  .directive('mySaludo', function(){
    return {
      template: '<span>Hola: {{seleccionado.Precio}}  </span>'
    };
  });
