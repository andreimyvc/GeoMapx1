//"use strict";

var cubicacionesApp = angular.module('cubicacionesApp', ['GeoMapxWebApi']);
var cubicacionesController = function (scope, http, geoDataFactory) {
    var d = scope;
    d.control =
        {
            fieldsReadOnly: true,
            state: 'view',
            btns:
                {
                    Nuevo: { show: true },
                    Editar: { show: false },
                    Eliminar: { show: false },
                    Cancelar: { show: false },
                    Guardar: { show: false }
                },
            indexRow:1
        };
    d.selectedProyect = undefined;
    d.proyectosData = undefined;
    d.secuenciasData = undefined;
    //#endregion SetVariables
    //#region botones

    d.newEntrada = function () {
        d.selectedMaterial = null;
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Cancelar.show = true;
        d.control.state = 'add';
        d.selectedProyect = undefined;
        d.clearFields();
    };
    d.newNCubicacion = function () {
        d.selectedMaterial = null;
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Cancelar.show = true;
        d.control.state = 'add';
        d.selectedProyect = undefined;
        d.clearFields();
    };
    d.cancelEntrada = function () {
        d.control.state = 'view'
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;
        d.clearFields();
    };
    d.editarEntrada = function () {
        d.control.state = 'edit'
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Cancelar.show = true;
        d.control.btns.Guardar.show = true;
    };    
    d.generarNCubicacion = function () {
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;

        geoDataFactory.insertCubSecuencia({ ProyectoID: d.selectedProyect.ProyectoID }).then(
            function (data) {
                d.onProyectChange(d.selectedProyect);
                //jqgridAddRowDataLast("#jqGridNCubicaciones", (d.control.indexRow++), data);
                d.control.state = 'view';
            }, function (error) {
                d.error = error.data.Message;
                alert(d.error);
                d.selectedMaterial = null;
                d.control.fieldsReadOnly = false;
                d.control.btns.Nuevo.show = false;
                d.control.btns.Guardar.show = true;
                d.control.btns.Cancelar.show = true;
                d.control.state = 'add';
            });
    };
    d.guardarEntrada = function () {
        var btnvisible = false;
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
    };
    d.onProyectChange = function (proyecto) {
        geoDataFactory.getCubSecuenciaByProyecto(proyecto.ProyectoID).then(
            function (data) {
                d.secuenciasData = data;
                d.setGrid("#jqGridNCubicaciones", data);
            });
    };
    d.xChanState = function (id, est) {
        var r = confirm("¿Seguro que desea cambiar el estado de este número de cubicación?");
        if (r) {
            geoDataFactory.updateCubSecuencia({ SecuenciaID: id }).then(
                function (data) {
                    d.onProyectChange(d.selectedProyect);
                });
        }
    };
    d.clearFields = function () {
        d.model = {};
    };
    //#endregion Crud
    //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            d.proyectosData = data;
        }, function (error) {
            d.error = error.data.Message;
        });
    };
    //#endregion GETS
    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };
    d.startApp = function () {
        getPoryectos();
    };
};

cubicacionesApp.controller('cubicacionesController', ['$scope', '$http', 'geoDataFactory', cubicacionesController]);