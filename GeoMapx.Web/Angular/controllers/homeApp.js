//"use strict";

var homeApp = angular.module('homeApp', ['GeoMapxWebApi']);
var homeController = function (scope, http, geoDataFactory) {
    var d = scope;
    d.selectedProyect = undefined;
    d.avenceProyectoData = undefined;
    d.proyectosData = undefined;
    d.uniconsData = undefined;
    d.montosEAP = undefined;
    d.model = { MontonEAP: { Instalacion: '', Remocion: '', Tranferencia: '', }, montosCantidadEASData : [] };
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
        d.model = {};
    };
    //#endregion Crud
    d.$watch('proyectosData', function () {
        if (d.proyectosData && d.proyectosData.length > 0) {
            var proyectoid = d.proyectosData[0].ProyectoID;
            d.setChartAvanceProyecto(proyectoid);
        }
    });
    //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            d.proyectosData = data;
        }, function (error) {
            d.error = error.data.Message;
        });
    };
    var getUnicons = function () {
        return geoDataFactory.getUnicons().then(
            function (data) {
                d.uniconsData = data;
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    var getAvanceByProyecto = function (proyectoid) {
        return geoDataFactory.getAvanceByProyecto(proyectoid)
    };

    //var scope = angular.element(document.getElementById('homeApp')).scope();
    //scope.getMontosEAPByProyecto(event.item.dataContext.ProyectoID, event.item.dataContext.Mes);
    //scope.getMontosCantidadEAS(event.item.dataContext.ProyectoID, event.item.dataContext.Mes);
    //scope.$apply();
    d.sendActividadPrimaria = function (actividadPrimaria) {
        d.model.ActividadPrimaria = actividadPrimaria;
        d.getMontosCantidadEAS(d.model.ProyectoID, d.model.Mes, d.model.ActividadPrimaria);
    };
    d.getMontosEAPByProyecto = function (proyectoid, mes) {
        d.model.ProyectoID = proyectoid;
        d.model.Mes = mes;
        return geoDataFactory.getMontosEAPByProyecto(proyectoid, mes).then(
            function (data) {
                d.model.montosEAP = data;
                d.model.MontonEAP = { Instalacion: { monto: "0", label: "INSTALACIÓN" }, Remocion: { monto: "0", label: "REMOCIÓN" }, Tranferencia: { monto: "0", label: "TRANFERENCIA" } };
                for (i in data) {
                    var m = data[i];
                    if (m.ActividadPrimaria.indexOf('INS') >= 0) {
                        d.model.MontonEAP.Instalacion = { monto: m.MontoEAP, label: m.ActividadPrimaria }
                    }
                    else if (m.ActividadPrimaria.indexOf('REM') >= 0) {
                        d.model.MontonEAP.Remocion = { monto: m.MontoEAP, label: m.ActividadPrimaria }
                    }
                    else if (m.ActividadPrimaria.indexOf('TRAN') >= 0) {
                        d.model.MontonEAP.Tranferencia = { monto: m.MontoEAP, label: m.ActividadPrimaria }
                    }
                }
                if (data && d.model.ActividadPrimaria) {
                    d.getMontosCantidadEAS(d.model.ProyectoID, d.model.Mes, d.model.ActividadPrimaria);
                }
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    d.getMontosCantidadEAS = function (proyectoid, mes, actividadPrimaria) {
        //alert(actividadPrimaria);
        return geoDataFactory.getMontosCantidadEAS(proyectoid, mes, actividadPrimaria).then(
            function (data) {
                d.model.montosCantidadEASData = data;
                initChartCantidadesByActividad(data);
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    //#endregion GETS
    d.setSelectedProyect = function (proyectoid) {
        if (d.proyectosData) {
            d.model.ProyectoID = proyectoid;
            d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectoid; })[0];
            d.setChartAvanceProyecto(proyectoid);
        }
    }
    d.setChartAvanceProyecto = function (proyectoid) {
        getAvanceByProyecto(proyectoid).then(
            function (data) {
                d.avenceProyectoData = data;
                initChartAvanceProyecto(data);
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };
    d.startApp = function () {
        getPoryectos();
    };
};

homeApp.controller('homeController', ['$scope', '$http', 'geoDataFactory', homeController]);