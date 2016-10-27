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
            indexRow: 1,
            app: ""
        };
    d.selectedProyect = undefined;
    d.proyectosData = undefined;
    d.secuenciasData = undefined;
    d.actividadesPrimariasData = undefined;
    d.actividadesSecundariasData = undefined;
    d.estadosActividadData = ["Todas", "Certificadas", "No Certificadas"];
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
        d.selectedSecuencia = undefined;
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
        if (!d.selectedProyect) { alert("Seleccione el proyecto a cubicar."); return; }
        if (!d.selectedSecuencia) { alert("Seleccione el número de cubicación a asignar."); return; }
        if (!d.model.FechaInicio) { alert("Seleccione la fecha de inicio."); return; }
        if (!d.model.FechaFin) { alert("Seleccione la fecha final."); return; }
        if (!d.model.Estado) { alert("Seleccione el estado de las actividades."); return; }
        if (!d.model.ActividadPrimaria) { alert("Seleccione la actividad primaria."); return; }
        if (!d.model.ActividadSecundaria) { alert("Seleccione la actividad secundaria."); return; }

        var estado = d.model.Estado == "Todos" ? null : (d.model.Estado == "Certificadas");
        var cubicacion = {
            ProyectoID: d.selectedProyect.ProyectoID,
            SecuenciaID: d.selectedSecuencia.SecuenciaID,
            FechaInicio: d.model.FechaInicio,
            FechaFin: d.model.FechaFin,
            EstadoActividades: estado,
            ActividadPrimaria: d.model.ActividadPrimaria,
            ActividadSecundaria: d.model.ActividadSecundaria
        };

        geoDataFactory.insertCubicacion([cubicacion]).then(
            function (data) {
                alert("OK");
                d.control.fieldsReadOnly = true;
                d.control.btns.Nuevo.show = true;
                d.control.btns.Cancelar.show = false;
                d.control.btns.Guardar.show = false;
            }, function (error) {
                d.error = error.data.Message;
                alert(d.error);
            });
    };
    d.onProyectChange = function (proyecto) {
        geoDataFactory.getCubSecuenciaByProyecto(proyecto.ProyectoID).then(
            function (data) {
                d.secuenciasData = data.filter(function (element) { return element.Estado == true; });
                d.setGrid("#jqGridNCubicaciones", data);
            });
        if (d.control.app = "cubicaciones") {
            geoDataFactory.getActividadesPrimariasByProyecto(proyecto.ProyectoID).then(
                function (data) {
                    data = data.reverse();
                    data.push("Todos");
                    d.actividadesPrimariasData = data = data.reverse();
                });
            geoDataFactory.getActividadesSecundariasByProyecto(proyecto.ProyectoID).then(
                function (data) {
                    data = data.reverse();
                    data.push("Todos");
                    d.actividadesSecundariasData = data = data.reverse();
                });
        }
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