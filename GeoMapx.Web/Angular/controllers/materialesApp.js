//"use strict";

var materialesApp = angular.module('materialesApp', ['GeoMapxWebApi']);
var materialesController = function (scope, http, geoDataFactory) {
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
    d.proyectosData = undefined;
    d.uniconsData = undefined;
    d.materialesData = undefined;
    d.newUnicons = {};
    d.selectedMaterial = undefined;
    d.isWatching = true;
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
        d.newUnicons = {};
    };
    d.newEntrada = function () {
        d.selectedMaterial = null;
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Editar.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Cancelar.show = true;
        d.control.btns.Eliminar.show = false; 
        d.control.state = 'add';
        d.selectedMaterial = undefined;
        d.clearFields();
    };
    d.cancelEntrada = function () {
        d.control.state = 'view'
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;
        d.control.btns.Eliminar.show = false;
        d.clearFields();
        d.selectedProyect = null;
        if (d.selectedMaterial) {
            d.setSelectedMaterial(d.selectedMaterial.MaterialID);
        }
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
        d.control.btns.Eliminar.show = false;
        //d.postesData = undefined;
        var aactividad = {};
        aactividad.ActividadID = d.newUnicons.ActividadID;
        aactividad.ProyectoID = d.selectedProyect.ProyectoID;
        aactividad.CodigoMaterial = d.newUnicons.CodigoMaterial;
        aactividad.Descripcion = d.newUnicons.Descripcion;
        aactividad.Cantidad = d.newUnicons.Cantidad;
        aactividad.PrecioUnitario = d.newUnicons.PrecioUnitario;
        
        if (d.control.state === 'add') {
            postMaterial(aactividad)
            .then(function (data) {
                getMateriales();
                d.control.state = 'view';
                alert("OK");
                d.clearFields();
                d.selectedProyect = null;
            }, function (error) {
                d.control.fieldsReadOnly = false;
                d.control.btns.Nuevo.show = false;
                d.control.btns.Cancelar.show = true;
                scope.error = error.data.Message;
                alert(scope.error);
            });
        }
        else {
            aactividad.MaterialID = d.newUnicons.MaterialID;
            putMaterial(aactividad).then(function (data) {
                d.control.btns.Editar.show = true;
                getMateriales();
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
        d.control.btns.Eliminar.show = false;
        d.control.btns.Editar.show = false;
        deleteUnicons(d.newUnicons.ActividadID).then(
            function (result) {
                getMateriales();
                alert("Materialeliminada.");
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
    var postMaterial = function (material) {
        return geoDataFactory.insertMaterial(material);
    };
    var putMaterial = function (material) {
        return geoDataFactory.updateMaterial(material);
    };
    var deleteMaterial = function (materialid) {
        return geoDataFactory.deleteMaterial(materialid);
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
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    var getMateriales = function () {
        return geoDataFactory.getMateriales().then(
            function (data) {
                d.materialesData = data;
                d.setGrid(d.grid1, d.materialesData);
                d.setFilterGrid1();
            }, function (error) {
                d.error = error.data.Message;
            });
    };
    //#endregion GETs
    d.setSelectedMaterial = function (materialid) {
        var tempMaterial = Object.create(d.materialesData.filter(function (item) { return item.MaterialID == materialid; })[0]);
        var tempProyect = Object.create(d.proyectosData.filter(function (item) { return item.ProyectoID == tempMaterial.ProyectoID; })[0]);
        var unic = d.uniconsData.filter(function (item) { return item.ActividadID == tempMaterial.ActividadID; })[0];
        var tempUnicons = Object.create(unic);
        d.selectedMaterial = tempMaterial;
        d.selectedProyect = tempProyect;
        d.selectedUnicons = tempUnicons;
        d.newUnicons = tempMaterial;
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
        getMateriales();
    };
};

materialesApp.controller('materialesController', ['$scope', '$http', 'geoDataFactory', materialesController]);