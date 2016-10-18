(function () {
    'use strict';
    var vmc = angular.module('GeoMapxWebApi', []);

    vmc.factory('geoDataFactory', ['$http','$q', GeoMapxDataFactory]);
    function GeoMapxDataFactory(http, q) {
        var interfaz = {};
        //#region Planilla
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
        //#endregion Planilla
        //#region Unicons
        interfaz.insertUnicons = function (entity) {
            var defer = q.defer();
            http({ method: 'POST', url: '/api/actividades/post', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.updateUnicons = function (entity) {
            var defer = q.defer();
            http({ method: 'PUT', url: '/api/actividades/put', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.deleteUnicons = function (id) {
            var defer = q.defer();
            http.delete('/api/actividades/delete', { params: { actividadid: id } }).then(function (response) {
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
        //#endregion Unicons
        //#region Proyectos
        interfaz.getProyectosByEmpresas = function () {
            var defer = q.defer();
            http.get('/api/proyectos/GetProyectosByEmpresas').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        //#endregion Proyectos
        //#region Postes
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
        //#endregion Postes
        //#region Contratistas
        interfaz.getContratistasByProyecto = function (id) {
            var defer = q.defer();
            http.get('/api/contratistas/getContratistasByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        //#endregion Contratistas
        //#region Fichas
        interfaz.getFichasByContratista = function (id) {
            var defer = q.defer();
            http.get('/api/fichas/getFichasByContratista', { params: { contratistaid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        //#endregion Fichas
        //#region Unicons
        interfaz.insertMaterial = function (entity) {
            var defer = q.defer();
            http({ method: 'POST', url: '/api/materiales/post', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.updateMaterial = function (entity) {
            var defer = q.defer();
            http({ method: 'PUT', url: '/api/materiales/put', data: entity }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.deleteMaterial = function (id) {
            var defer = q.defer();
            http.delete('/api/materiales/delete', { params: { actividadid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getMateriales = function () {
            var defer = q.defer();
            http.get('/api/materiales/get').then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        interfaz.getMaterialesByProyecto = function (id) {
            var defer = q.defer();
            http.get('/api/materiales/getMaterialesByProyecto', { params: { proyectoid: id } }).then(function (response) {
                defer.resolve(response.data);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        };
        //#endregion Materiales
        return interfaz;
    }
})();