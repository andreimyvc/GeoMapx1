(function () {
    'use strict';
    var vmc = angular.module('GeoMapxWebApi', []);

    vmc.factory('geoDataFactory', ['$http','$q', GeoMapxDataFactory]);
    function GeoMapxDataFactory(http, q) {
        var interfaz = {};
        interfaz.insertPlanilla = function (entity) {
            var defer = q.defer();
            http({ method:'POST', url:'/api/planillas/post', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.updatePlanilla = function (entity) {
            var defer = q.defer();
            http({ method:'PUT', url:'/api/planillas/put', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getPlanillaByID = function (id) {
            var defer = q.defer();
            http.get('/api/planillas/GetPlanillaByID', { params: { planillaid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getPlanillasOfDay = function () {
            var defer = q.defer();  
            http.get('/api/planillas/getPlanillasOfDay').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getActividades = function (){
            var defer = q.defer();  
            http.get('/api/actividades/getActividades').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getUnicons = function () {
            var defer = q.defer();  
            http.get('/api/actividades/get').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getActividadesByProyecto = function (id) {
            var defer = q.defer();  
            http.get('/api/actividades/getActividadesByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getActividadesByPoste = function (id) {
            var defer = q.defer();  
            http.get('/api/actividades/getActividadesByPoste', { params: { posteid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getUniconsByProyecto = function (id) {
            var defer = q.defer();  
            http.get('/api/actividades/getUniconsByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getProyectosByEmpresas = function () {
            var defer = q.defer();
            http.get('/api/proyectos/GetProyectosByEmpresas').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }; 
        interfaz.getPostes = function () {
            var defer = q.defer();  
            http.get('/api/postes/get').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }; 
        interfaz.getPostesByProyecto = function (id) {
            var defer = q.defer();  
            http.get('/api/postes/getPostesByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };    
        interfaz.getPostesByProyectoDiferenteDe = function (proyectoid,posteid) {
            var defer = q.defer();  
            http.get('/api/postes/getPostesByProyectoDiferenteDe', { params: { proyectoid: proyectoid, diferenteDe: posteid } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getContratistasByProyecto = function (id) {
            var defer = q.defer();
            http.get('/api/contratistas/getContratistasByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getFichasByContratista = function (id) {
            var defer = q.defer();
            http.get('/api/fichas/getFichasByContratista', { params: { contratistaid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        return interfaz;
    }
})();