//"use strict";

var uniconsApp = angular.module('uniconsApp', ['GeoMapxWebApi']);
var uniconsController = function (scope, http, geoDataFactory) {
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
                }
        };
    //#region SetVariables
    d.grid1 = "#jqGridCodigoActividades";
    d.selectedProyect = undefined;
    d.proyectosData;
    d.uniconsData = undefined;
    d.newUnicons = {};
    d.selectedUnicons = undefined;
    d.isWatching = true;
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
        d.newUnicons = {};
    };
    d.newEntrada = function () {
        d.selectedUnicons = null;
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Editar.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Cancelar.show = true; 
        d.control.state = 'add';
        d.selectedUnicons = undefined;
        d.clearFields();
    };
    d.cancelEntrada = function () {
        d.control.state = 'view'
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;
        d.clearFields();
        d.selectedProyect = null;
    };
    d.editarEntrada = function () {
        d.control.state = 'edit'
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Cancelar.show = true;
        d.control.btns.Editar.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Eliminar.show = false;
    };
    d.guardarEntrada = function () {
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        //d.postesData = undefined;
        var aactividad = d.newUnicons;
        aactividad.ProyectoID = d.selectedProyect.ProyectoID;
        
        if (d.control.state === 'add') {
            postUnicons(aactividad)
            .then(function (data) {
                getUnicons();
                d.control.state = 'view';
                alert("OK");
                d.clearFields();
            }, function (error) {
                d.control.fieldsReadOnly = false;
                d.control.btns.Nuevo.show = false;
                d.control.btns.Cancelar.show = true;
                scope.error = error.data.Message;
                alert(scope.error);
            });
        }
        else {
            putUnicons(aactividad).then(function (data) {
                d.control.btns.Editar.show = true;
                getUnicons();
            }, function (error) {
                d.control.fieldsReadOnly = false;
                d.control.btns.Nuevo.show = false;
                d.control.btns.Cancelar.show = true;
                d.error = error.data.Message;
                alert(d.error)
            });
        }
        d.control.btns.Guardar.show = false;
    };

    d.deleteEntrada = function () {
        d.control.state = 'view'
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;
        deleteUnicons(d.newUnicons.ActividadID).then(
            function (result) {
                getUnicons();
                alert("Unidad constructiva eliminada.");
                d.clearFields();
                d.selectedProyect = null;
            }, function (error) {
                d.error = error.data.Message;
                alert(d.error);
            });
    };
    //#endregion Botones
    //#region watches
    //#endregion watches

    //#region Crud
    var postUnicons = function (unicons) {
        return geoDataFactory.insertUnicons(unicons);
    };
    var putUnicons = function (unicons) {
        return geoDataFactory.updateUnicons(unicons);
    };
    var deleteUnicons = function (actividadid) {
        return geoDataFactory.deleteUnicons(actividadid);
    }
    //#endregion Crud
   //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            d.proyectosData = data;
            d.setFilterGrid1();
        },function (error) {
            d.error = error.data.Message;
        });
    };
    var getUnicons = function () {
        return geoDataFactory.getUnicons().then(
            function (data) {
                d.uniconsData = data;
                d.setGrid(d.grid1, d.uniconsData);
                d.setFilterGrid1();
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    //#endregion GETs
    d.setSelectedUnicons = function (actividadID) {
        var tempUnicons = d.uniconsData.filter(function (item) { return item.ActividadID == actividadID; })[0];
        var tempProyect = d.proyectosData.filter(function (item) { return item.ProyectoID == tempUnicons.ProyectoID; })[0];
        d.selectedUnicons = tempUnicons;
        d.selectedProyect = tempProyect;
        d.newUnicons = tempUnicons;
        d.control.btns.Editar.show = true;
        d.control.btns.Eliminar.show = true;
        d.control.state = "view";
    }
    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };
    d.setFilterGrid1 = function () {
        if (d.proyectosData) {
            $('#gs_CodigoProyecto').empty().html('<option value="">Todos</option>');
            for (i = 0; i < d.proyectosData.length; i++) {
                $('#gs_CodigoProyecto').append($('<option value="' + d.proyectosData[i].CodigoProyecto + '">' + d.proyectosData[i].CodigoProyecto + '</option>'));
            }
        } else { $('#gs_CodigoProyecto').empty().html('<option value="">Todos</option>'); }
        if (d.uniconsData) {
            $('#gs_UniCons').empty().html('<option value="">Todos</option>');
            for (i = 0; i < d.uniconsData.length; i++) {
                $('#gs_UniCons').append($('<option value="' + d.uniconsData[i].UniCons + '">' + d.uniconsData[i].UniCons + '</option>'));
            }
        } else { $('#gs_UniCons').empty().html('<option value="">Todos</option>'); }
    }
    d.startApp = function () {
        getPoryectos();
        getUnicons();
    };
};

uniconsApp.controller('uniconsController', ['$scope', '$http', 'geoDataFactory', uniconsController]);