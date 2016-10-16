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
    d.selected = undefined;
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
        //if (d.selectedPlanilla) {
        //    d.setSelectedPlanilla(d.selectedPlanilla.PlanillaID);
        //}

        //d.postesData = undefined;
    };
    d.editarEntrada = function () {
        d.control.state = 'edit'
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Cancelar.show = true;
        d.control.btns.Editar.show = false;
        d.control.btns.Guardar.show = true;
    };
    d.guardarEntrada = function () {
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        //d.postesData = undefined;
        var aplanilla = {
            ProyectoID: d.selectedProyect ?  d.selectedProyect.ProyectoID : undefined,
            ActividadID: d.selectedUnicons ? d.selectedUnicons.ActividadID : undefined,
            Cantidad: d.cantidad || undefined,
            Fecha: d.fecha || undefined,
            Observacion: d.observacion || undefined,
            PosteIDHasta: d.selectedPosteHasta ? d.selectedPosteHasta.PosteID : undefined,
            PosteID: d.selectedPoste ? d.selectedPoste.PosteID : undefined,
            FichaID: d.selectedFicha ? d.selectedFicha.FichaID : undefined,
            ContratistaID: d.selectedContratista ? d.selectedContratista.ContratistaID : undefined
        };
        if (d.control.state === 'add') {
            postPlanilla(aplanilla)
            .then(function (data) {
                getPlanillasOfDay();
                d.control.state = 'view'
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
            aplanilla.PlanillaID = d.selectedPlanilla.PlanillaID;
            putPlanilla(aplanilla).then(function (data) {
                d.control.btns.Editar.show = true;
                getPlanillasOfDay();
            }, function (error) {
                d.error = error.data.Message;
                alert(d.error)
            });
        }
        d.control.btns.Guardar.show = false;
    };

    d.eliminarEntrada = function () {
        //d.control.fieldsReadOnly = true;
        //d.control.btns.Nuevo.show = true;
        //d.control.btns.Cancelar.show = false;
        //d.postesData = undefined;
    };
    //#endregion Botones
    //#region watches
    //d.$watch('selectedProyect', function () {
    //    if (d.control.state === 'add') {
    //        getPostesByProyecto();
    //        getUniconsByProyecto();
    //        getContratistasByProyecto();
    //        getActividadesByProyecto();
    //    }
    //});   
    //#endregion watches

    //#region Crud
    var postUnicons = function (unicons) {
        return geoDataFactory.insertUnicons(unicons);
    };
    var putUnicons = function (unicons) {
        return geoDataFactory.updatePlanilla(unicons);
    };
    //#endregion Crud
   //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            d.proyectosData = data;
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
    //#endregion GETs

    d.startApp = function () {
        getPoryectos();
        getUnicons();
    };
};

uniconsApp.controller('uniconsController', ['$scope', '$http', 'geoDataFactory', uniconsController]);