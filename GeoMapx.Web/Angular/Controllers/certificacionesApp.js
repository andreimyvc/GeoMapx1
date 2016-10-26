//"use strict";

var certificacionesApp = angular.module('certificacionesApp', ['GeoMapxWebApi']);
var certificacionesController = function (scope, http, geoDataFactory) {
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
            indexRow: 0,
        };
    //#region SetVariables
    d.planillasOfDayData = undefined;
    d.planillasData = undefined;
    d.planillasNoCData = undefined;
    d.planillasSiCData = undefined;
    d.proyectosData = undefined;
    d.selectedPlanilla = undefined;
    d.selectedProyect = undefined;
    d.dataforCommit = [];
    d.isWatching = true;
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
    };
    d.guardarEntrada = function () {
        d.control.fieldsReadOnly = true;
        var aplanilla = {
            ProyectoID: d.selectedProyect ? d.selectedProyect.ProyectoID : undefined,
            ActividadID: d.selectedUnicons ? d.selectedUnicons.ActividadID : undefined,
            Cantidad: d.cantidad || undefined,
            Fecha: d.fecha || undefined,
            Observacion: d.observacion || undefined,
            PosteIDHasta: d.selectedPosteHasta ? d.selectedPosteHasta.PosteID : undefined,
            PosteID: d.selectedPoste ? d.selectedPoste.PosteID : undefined,
            FichaID: d.selectedFicha ? d.selectedFicha.FichaID : undefined,
            ContratistaID: d.selectedContratista ? d.selectedContratista.ContratistaID : undefined
        };
        aplanilla.PlanillaID = d.selectedPlanilla.PlanillaID;
        putPlanilla(aplanilla).then(function (data) {
            d.control.btns.Editar.show = true;
            getPlanillasOfDay();
        }, function (error) {
            d.error = error.data.Message;
            alert(d.error)
        });
    };
//#endregion Botones
//#region watches

//#endregion watches
    d.initMapAndMarker = function (poste) {
        if (poste) {
            initMapAndMarker(poste.Lat, poste.Lon, poste.CodigoPoste);
        }
    };

/*********************BEGIN CRUD*************************************/
     var putPlanilla = function (aplanilla) {
        return geoDataFactory.updatePlanilla(aplanilla);
    };
    /*********************END CRUD*************************************/
   //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            d.proyectosData = data;
        },function (error) {
            d.error = error.data.Message;
        });
    };
    var getPlanillaByID = function (planillaid) {
        geoDataFactory.getPlanillaByID(id).then(
            function (data) {
                d.selectedPlanilla = data;
            }, function (error) {
                scope.error = error.data.Message;
            });
    };
    var getPlanillaToCertByProyecto = function (proyectoid) {
        geoDataFactory.getPlanillaToCertByProyecto(proyectoid).then(
            function (data) {  //787
                d.planillasData = data;
                d.planillasNoCData = data.filter(function (element) { return element.Verificado == false; });
                d.planillasSiCData = data.filter(function (element) { return element.Verificado == true; });
                d.setGrid("#jqGridActividadUsuario", d.planillasNoCData);
                d.setGrid("#jqGridConfirmadas", d.planillasSiCData);
            }, function (error) {
                scope.error = error.data.Message;
            });
    };
    var getPlanillaByIDWithCallback = function (planillaid, successCallback, errorCallback) {
        geoDataFactory.getPlanillaByID(planillaid).then(successCallback, errorCallback);
    };
    var getPlanillasOfDay = function () {
        geoDataFactory.getPlanillasOfDay().then(
            function (data) {
                d.planillasOfDayData = data;
            }, function (error) {
                scope.error = error.data.Message;
            });
    };
    
    //#endregion Gets
    //#region SetSelected
    d.setSelectedProyect = function (proyectid) {
        d.selectedProyect = null;
        if (d.proyectosData) {
            d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectid; })[0];
            if(d.selectedProyect){
                getPlanillaToCertByProyecto(d.selectedProyect.ProyectoID);
            }
            else {
                getProyect(proyectid);
            }
        } else {
            getProyect(proyectid);
        }
        function getProyect(proyectid) {
            geoDataFactory.getProyectosByEmpresas().then(function (data) {
                d.proyectosData = data;
                d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectid; })[0];
            }, function (error) {
                d.error = error.data.Message;
            });
        }
    };
    d.certificate = function (planillaid) {  //888
        var xdata = d.planillasData.filter(function (element) { return element.PlanillaID == planillaid; })[0];
        xdata.Verificado = true;
        geoDataFactory.certificacionPlanillas(xdata).then(null, function (error) {
            d.error = error.data.Message;
            alert(d.error);
            jqgridDeleteRow('#jqGridConfirmadas', d.control.indexRow);
            d.control.indexRow++;
            xdata.Verificado = false;
            jqgridAddRowData('#jqGridActividadUsuario', d.control.indexRow, { data: xdata }, null);
        });
        //d.planillasNoCData.push(xdata);
        //d.planillasSiCData = d.planillasSiCData.filter(function (element) { return element.PlanillaID != planillaid; });
        xdata.Verificado = true;
        //Update
        d.control.indexRow++;
        jqgridAddRowData('#jqGridConfirmadas',  d.control.indexRow, { data: xdata }, null);
    }
    d.removeFromCommit = function (gridid, rowId, data) { 
        var xdata = d.planillasData.filter(function (element) { return element.PlanillaID == data; })[0];
        xdata.Verificado = false;
        //Update
        //alert(data);
        d.dataforCommit = d.dataforCommit.filter(function (element) { return element.PlanillaID != data; });
        jqgridDeleteRow(gridid, rowId);
        d.control.indexRow++;
        jqgridAddRowData('#jqGridActividadUsuario',  d.control.indexRow, { data: xdata });
    }
    d.confirmVerificar = function () {
        if (d.dataforCommit.length > 0) {
            var r = confirm("¿Está seguro que desea confirmar estas transacciones?");
            if (r) {
                geoDataFactory.certificacionPlanillas(d.dataforCommit).then(
                    function (data) {
                        alert("OK");
                        d.setGrid("#jqGridConfirmadas", []);
                    }, function (error) {
                        d.error = error.data.Message;
                        alert(d.error);
                    });
            }
        } else {
            alert("¡No se han seleccionado actividades¡");
        }
    }
    d.undoCert = function (gridid, rowid, id) {
        if (confirm("¿Está seguro que desea deshacer esta certificación?")) {
            var xdata = d.planillasData.filter(function (element) { return element.PlanillaID == id; })[0];
            xdata.Verificado = false;
            geoDataFactory.updatePlanilla(xdata).then(
                function (data) {
                    jqgridDeleteRow(gridid,rowid);
                    alert("OK");
                    jqgridAddRowData('#jqGridActividadUsuario', 0, { data: xdata });
                    jqgridDeleteRow(gridid, rowid);
                }, function (error) {
                    d.error = error.data.Message;
                    alert(d.error);
                });
        }
    }
    d.setObserva = function (id, observa) {
        var xdata = d.planillasData.filter(function (element) { return element.PlanillaID == id; })[0];
        xdata.ObservacionVerificador = observa;
    }
    //#endregion SetSelected
    d.setDataTableData = function (tableid, data) {
        $(tableid).DataTable({
            data: data
        });
    }
    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };
    d.startApp = function () {
        getPoryectos();
        getPlanillasOfDay();
    };
};

certificacionesApp.controller('certificacionesController', ['$scope', '$http', 'geoDataFactory', certificacionesController]);
