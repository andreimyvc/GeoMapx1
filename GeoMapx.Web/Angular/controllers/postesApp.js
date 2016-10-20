//"use strict";

var postesApp = angular.module('postesApp', ['GeoMapxWebApi']);
var postesController = function (scope, http, geoDataFactory) {    
    var d = scope;
    d.diarias =
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
    d.allPostesData = undefined;
    d.proyectosData = undefined;
    d.postesData = undefined;
    d.poligonosData = undefined;
    d.uniconsData = undefined;
    d.actividadesByproyectosData = undefined;
    d.selectedProyect = undefined;
    d.selectedPoligono = undefined;
    d.selectedTipoPoste = undefined;
    d.selectedPoste = undefined;
    d.selectedPoste2 = undefined;
    d.isWatching = true;
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
        d.selectedPoste = undefined;
        d.selectedProyect = undefined;
        d.selectedPoligono = undefined;
        d.selectedTipoPoste = undefined;
        d.model = {};
    };
    d.newEntrada = function () {
        d.selectedPlanilla = null;
        d.diarias.fieldsReadOnly = false;
        d.diarias.btns.Nuevo.show = false;
        d.diarias.btns.Editar.show = false;
        d.diarias.btns.Guardar.show = true;
        d.diarias.btns.Cancelar.show = true; 
        d.diarias.state = 'add';
        d.selectedProyect = undefined;
        d.actividadesByproyectosData = undefined;
        d.clearFields();
    };
    d.cancelEntrada = function () {
        d.diarias.state = 'view'
        d.diarias.fieldsReadOnly = true;
        d.diarias.btns.Nuevo.show = true;
        d.diarias.btns.Cancelar.show = false;
        d.diarias.btns.Guardar.show = false;
        d.clearFields();
        if (d.selectedPoste) {
            d.setSelectedPoste(d.selectedPoste.PosteID);
        }
    };
    d.editarEntrada = function () {
        d.diarias.state = 'edit'
        d.diarias.fieldsReadOnly = false;
        d.diarias.btns.Nuevo.show = false;
        d.diarias.btns.Cancelar.show = true;
        d.diarias.btns.Editar.show = false;
        d.diarias.btns.Guardar.show = true;
    };
    d.guardarEntrada = function () {
        d.diarias.fieldsReadOnly = true;
        d.diarias.btns.Nuevo.show = true;
        d.diarias.btns.Cancelar.show = false;
        //d.postesData = undefined;
        var aposte = {
            ProyectoID: d.selectedProyect ? d.selectedProyect.ProyectoID : undefined,
            Lat : d.model.Lat || undefined,
            Lon: d.model.Lon || undefined,
            ObservacionPoste: d.model.ObservacionPoste || undefined,
            PoligonoID: d.selectedPoligono.PoligonoID || undefined,
            ProyectoID: d.selectedProyect ? d.selectedProyect.ProyectoID : undefined,
            TipoPosteID: d.selectedTipoPoste.TipoPosteID || undefined,
            CodigoPoste: d.model.CodigoPoste || undefined,
            X: d.model.X || undefined,
            Y: d.model.Y || undefined,
            Z: d.model.Z || undefined,            
        };
        if (d.diarias.state === 'add') {
            postPoste(aposte)
            .then(function (data) {
                getPostes();
                d.diarias.state = 'view'
                setGritPostes1();
                alert("OK");
                d.clearFields();
            }, function (error) {
                d.diarias.fieldsReadOnly = false;
                d.diarias.btns.Nuevo.show = false;
                d.diarias.btns.Cancelar.show = true;
                scope.error = error.data.Message;
                alert(scope.error);
            });
        }
        else {
            aposte.PosteID = d.selectedPoste.PosteID;
            putPoste(aposte).then(function (data) {
                d.diarias.btns.Editar.show = true;
                setGritPostes1();
            }, function (error) {
                d.error = error.data.Message;
                alert(d.error)
            });
        }
        d.diarias.btns.Guardar.show = false;
    };

    d.eliminarEntrada = function () {
        //d.diarias.fieldsReadOnly = true;
        //d.diarias.btns.Nuevo.show = true;
        //d.diarias.btns.Cancelar.show = false;
        //d.postesData = undefined;
    };
    //#endregion Botones
    //#region watches
    d.$watch('proyectosData', function () {
        if (d.proyectosData) {
            $('#gs_CodigoProyecto').empty().html('<option value="">Todos</option>');
            var strOption = '<option value="">Todos</option>';
                //$("select[name='CodigoProyecto2']")[0].empty().html('<option value="">Todos</option>');
                //$('#gs_CodigoProyecto').append($('<option data-ng-repeat="p in proyectosData" value="{{p.CodigoProyecto}}">{{p.CodigoProyecto}}</option>'));

                for (i = 0; i < d.proyectosData.length; i++) {
                    $('#gs_CodigoProyecto').append($('<option value="' + d.proyectosData[i].CodigoProyecto + '">' + d.proyectosData[i].CodigoProyecto + '</option>'));
                    strOption += '<option value="' + d.proyectosData[i].CodigoProyecto + '">' + d.proyectosData[i].CodigoProyecto + '</option>';
                    //$("select[name='CodigoProyecto2']")[0].append($('<option value="' + d.proyectosData[i].CodigoProyecto + '">' + d.proyectosData[i].CodigoProyecto + '</option>'));
                }
                //$("select[name='CodigoProyecto']")[1].width('95%');
                $("select[name='CodigoProyecto']")[1].innerHTML = strOption;
            getUnicons().then(function (data) {
                if (data) {
                    d.allUniconsData = data;
                    d.setGrid("#jqGridCodigoActividades", d.allUniconsData);
                    $('#gs_UniCons').empty().html('<option value="">Todos</option>');
                    for (i = 0; i < d.allUniconsData.length; i++) {
                        $('#gs_UniCons').append($('<option value="' + d.allUniconsData[i].UniCons + '">' + d.allUniconsData[i].UniCons + '</option>'));
                    }
                } else { d.allUniconsData = undefined;}
            },function (error) {
                d.error = error.data.Message;
            })
                .catch(function (data) {
                    d.error = data.Message;
                });

            getPostes().then(function (data) {
                    if (data) {
                        d.allPostesData = data;
                        d.setGrid("#jqGridCodigoPostes", d.allPostesData);
                        $('#gs_CodigoPoste').empty().html('<option value="">Todos</option>');
                        for (i = 0; i < d.allPostesData.length; i++) {
                            $('#gs_CodigoPoste').append($('<option value="' + d.allPostesData[i].CodigoPoste + '">' + d.allPostesData[i].CodigoPoste + '</option>'));
                        }
                    } else { d.allPostesData = undefined; }
                },function (error) {
                    d.error = error.data.Message;
                });
        }
    });
    d.$watch('selectedProyect', function () {
        if (d.diarias.state === 'add') {
            //getPostesByProyecto();
            getPoligonosByProyecto();
            getUniconsByProyecto();
            getContratistasByProyecto();
            getActividadesByProyecto();
        }
    });
    d.$watch('selectedPoste', function () {
        //if (d.diarias.state === 'add') {
            if (d.selectedPoste) {
                d.initMapAndMarker(d.selectedPoste);
                d.initGridActividadesByPoste(d.selectedPoste.PosteID);
            }
            else if (!d.selectedPoste2) {
                d.setGrid("#jqGridPostes", []);
            }
        //}
    });
    d.$watch('selectedPoste2', function () {
        if (d.selectedPoste2) {
            d.initMapAndMarker(d.selectedPoste2);
            d.initGridActividadesByPoste(d.selectedPoste2.PosteID);
        }
        else
        {
            d.setGrid("#jqGridPostes", []);
        }
    });
    d.$watch('planillasOfDayData', function () {
        if (d.planillasOfDayData)
        {
            d.setGrid("#jqGridActividadUsuario", d.planillasOfDayData);           
        }
    });
   
//#endregion watches
    d.initMapAndMarker = function (poste) {
        if (poste) {
            initMapAndMarker(poste.Lat, poste.Lon, poste.CodigoPoste);
        }
    };
    d.initGridActividadesByPoste = function (posteid) {
        getActividadesByPoste(posteid);
    };

/*********************BEGIN CRUD*************************************/
    var postPoste = function (aposte) {
        return geoDataFactory.insertPoste(aposte);
    };
    var putPoste = function (aposte) {
        return geoDataFactory.updatePoste(aposte);
    };
    /*********************END CRUD*************************************/
   //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            scope.proyectosData = data;
        },function (error) {
            scope.error = error.data.Message;
        });
        //http.get('/api/GenteApi')
        //.then(function (response) {
        //    $scope.gentes = response.data;
        //});
    };
    var getActividadesByPoste = function (posteid) {
        geoDataFactory.getActividadesByPoste(posteid).then(
            function (data) {
                d.setGrid("#jqGridPostes", data);
            },
        function (error) {
            scope.error = error.data.Message;
        });
    };
    var getActividadesByProyecto = function () {
        if (d.selectedProyect) {
            geoDataFactory.getActividadesByProyecto(d.selectedProyect.ProyectoID).then(
                function (data) {
                d.actividadesByproyectosData = data;
            },function (error) {
                scope.error = error.data.Message;
            });
        }
    };
    var getPlanillaByID = function (planillaid) {
        geoDataFactory.getPlanillaByID(id).then(
            function (data) {
                d.selectedPlanilla = data;
            }, function (error) {
                scope.error = error.data.Message;
            });
    };
    var getPoteByIDWithCallback = function (posteid, successCallback, errorCallback) {
        geoDataFactory.getPosteByID(posteid).then(successCallback, errorCallback);
    };
    var getPlanillasOfDay = function () {
        geoDataFactory.getPlanillasOfDay().then(
            function (data) {
                d.planillasOfDayData = data;
            }, function (error) {
                scope.error = error.data.Message;
            });
    };
    var getPostesByProyecto = function () {
        if (scope.selectedProyect && scope.selectedProyect.ProyectoID > 0) {
            geoDataFactory.getPostesByProyectoALlField(d.selectedProyect.ProyectoID).then(
                function (data) {
                scope.postesData = data;
            },function (error) {
                scope.error = error.data.Message;
            });
        }
        else {
            scope.postesData = undefined;
        }
    };
    var getPoligonosByProyecto = function () {
        if (scope.selectedProyect && scope.selectedProyect.ProyectoID > 0) {
            geoDataFactory.getPoligonosByProyecto(d.selectedProyect.ProyectoID).then(
                function (data) {
                d.poligonosData = data;
            },function (error) {
                d.error = d.data.Message;
            });
        }
        else {
            scope.postesData = undefined;
        }
    };
    var getTiposPoste = function () {
        geoDataFactory.getTiposPoste().then(
            function (data) {
                d.tiposPostesData = data;
            }, function (error) {
                d.error = d.data.Message;
            });
    }
    var getPostesByProyectoID = function (proyectoid) {
        geoDataFactory.getPostesByProyectoALlField(proyectoid).then(
                function (data) {
                    scope.postesData = data;
                }, function (error) {
                    scope.error = error.data.Message;
                });
    };
    var getPostesByProyectoDiferenteDe = function () {
        if (d.selectedProyect && d.selectedProyect.ProyectoID > 0
            && d.selectedPoste) {
            geoDataFactory.getPostesByProyectoDiferenteDe(d.selectedProyect.ProyectoID,
                d.selectedPoste.PosteID).then(
                function (data) {
                    d.postesHastaData = data;
                    if (d.selectedPosteHasta) {
                        d.selectedPosteHasta = d.postesHastaData.filter(function (elemento) { return elemento.PosteID == d.selectedPosteHasta.PosteID; })[0];
                    }
            },function (error) {
                d.error = error.data.Message;
            });
        }
        else {
            d.postesHastaData = undefined;
        }
    };
    var getUniconsByProyecto = function () {
        if (scope.selectedProyect) {
            geoDataFactory.getUniconsByProyecto(scope.selectedProyect.ProyectoID).then(
                function (data) {
                scope.uniconsData = data;
            },function (error) {
                scope.error = error.data.Message;
            });
        }
        else {
            d.uniconsData = undefined;
        }
    };
    var getUnicons = function () {
            return geoDataFactory.getUnicons();
    };
    var getPostes = function () {
        return geoDataFactory.getPostes();
    };

    var setGritPostes1 = function ()
    {

        getPostes().then(function (data) {
            if (data) {
                d.allPostesData = data;
                d.setGrid("#jqGridCodigoPostes", d.allPostesData);
                $('#gs_CodigoPoste').empty().html('<option value="">Todos</option>');
                for (i = 0; i < d.allPostesData.length; i++) {
                    $('#gs_CodigoPoste').append($('<option value="' + d.allPostesData[i].CodigoPoste + '">' + d.allPostesData[i].CodigoPoste + '</option>'));
                }
            } else { d.allPostesData = undefined; }
        },function (error) {
            d.error = error.data.Message;
        });

    };
    var getContratistasByProyecto = function () {
        if (d.selectedProyect  && d.selectedProyect.ProyectoID > 0) {
            geoDataFactory.getContratistasByProyecto(d.selectedProyect.ProyectoID).then(
                function (data) {
                d.contratistasData = data;
            },function (error) {
                d.error = error.data.Message;
            });
        }
        else {
            d.contratistasData = undefined;
        }
    };
    var getFichasByContratista = function () {
        if (d.selectedContratista && d.selectedContratista.ContratistaID > 0) {
            geoDataFactory.getFichasByContratista(d.selectedContratista.ContratistaID).then(
                function (data) {
                d.fichasData = data;
            },function (error) {
                d.error = error.data.Message;
            });
        }
        else {
            scope.fichasData = undefined;
        }
    };
    //#endregion Gets
    d.changeGuiPostes = function (aposte) {
        d.selectedPoste = aposte;
        if (aposte) {
            d.setSelectedProyect(aposte.ProyectoID);
            d.setSelectedPoligono(aposte.ProyectoID, aposte.PoligonoID);
            d.setSelectedTipoPoste(aposte.TipoPosteID);
            //d.selectedProyect = null;
            //d.selectedPoligono = null;
            //d.selectedTipoPoste = null;
            d.model.ObservacionPoste = aposte.ObservacionPoste;
            d.model.X = aposte.X;
            d.model.Y = aposte.Y;
            d.model.Z = aposte.Z;
            d.model.Lat = aposte.Lat;
            d.model.Lon = aposte.Lon;
            d.model.CodigoPoste = aposte.CodigoPoste

            d.diarias.btns.Guardar.show = false;
            d.diarias.btns.Editar.show = true;
        };
    };

    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };

    //#region SetSelected
    d.setSelectePoste = function (id) {
        d.clearFields();
        if (d.allPostesData) {
            d.selectedPoste = d.allPostesData.filter(function (elemento) { return elemento.PosteID == id; })[0];
            if (d.selectedPoste) {
                d.changeGuiPostes(d.selectedPoste);
            } else {
                getPoteByIDWithCallback(id, d.changeGuiPostes, function (error) { d.error = error.data.Message; });
            }
        }
    };
    d.setSelectedProyect = function (proyectid) {
        d.selectedProyect = null;
        if (d.proyectosData) {
            d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectid; })[0];
            getProyect(proyectid);
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
    d.setSelectedPoste = function (proyectoid, posteid) {
        d.selectedPoste = null;
        if (d.postesData) {
            d.selectedPoste = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
            if (!d.selectedPoste) {
                getPostesByProyecto(proyectoid, posteid);
            }
        } else {
            getPostesByProyecto(proyectoid, posteid);
        }
        function getPostesByProyecto(proyectoid, posteid) {
            geoDataFactory.getPostesByProyectoALlField(proyectoid).then(
                function (data) {
                    d.postesData = data;
                    d.selectedPoste = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
                }, function (error) {
                    scope.error = error.data.Message;
                });
        }
    }
    d.setSelectedPoligono = function (proyectoid,poligonoid) {
        d.selectedPoligono = null;
        if (d.poligonosData) {
            d.selectedPoligono = d.poligonosData.filter(function (elemento) { return elemento.PoligonoID == poligonoid; })[0];
            if (!d.selectedPoligono) {
                getPoligono(proyectoid, poligonoid);
            }
        } else {
            getPoligono(proyectoid, poligonoid);
        }
        function getPoligono(proyectoid,poligonoid) {
            geoDataFactory.getPoligonosByProyecto(proyectoid).then(
                function (data) {
                    d.poligonosData = data;
                    d.selectedPoligono = d.poligonosData.filter(function (elemento) { return elemento.PoligonoID == poligonoid; })[0];
                }, function (error) {
                    scope.error = error.data.Message;
                });
        }
    }
    d.setSelectedTipoPoste = function (tipoPosteID) {
        d.selectedTipoPoste = null;
        if (d.tiposPostesData) {
            d.selectedTipoPoste = d.tiposPostesData.filter(function (elemento) { return elemento.TipoPosteID == tipoPosteID; })[0];
            if (!d.selectedTipoPoste) {
                getTipoPoste(tipoPosteID);
            }
        } else {
            getTipoPoste(tipoPosteID);
        }
        function getTipoPoste(tipoPosteID) {
            geoDataFactory.getTiposPoste().then(
                function (data) {
                    d.tiposPostesData = data;
                    d.selectedTipoPoste = d.tiposPostesData.filter(function (elemento) { return elemento.TipoPosteID == tipoPosteID; })[0];
                }, function (error) {
                    scope.error = error.data.Message;
                });
        }
    }
    d.setSelectedPoste2 = function (proyectoid, posteid) {
        d.selectedPoste2 = null;
        //d.clearFields();
        if (d.postesData) {
            d.selectedPoste2 = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
            if (!d.selectedPoste2) {
                getPostesData(proyectoid, posteid);
            } else { d.setSelectePoste(posteid); };
        } else {
            getPostesData(proyectoid, posteid);
        }
        function getPostesData(proyectoid, posteid) {
            geoDataFactory.getPostesByProyectoALlField(proyectoid).then(
                    function (data) {
                        d.postesData = data;
                        d.selectedPoste2 = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
                        d.setSelectePoste(posteid);
                    }, function (error) {
                        scope.error = error.data.Message;
                    });
        }
    };
    //#endregion SetSelected

    d.FiltroN = function (car) {
        if (car.PosteID > 0) { return true; }
        return false;
    };

    d.startApp = function () {
        //d.getPostes1();
        getPoryectos();
        getTiposPoste();
        //getPostes();
        setGritPostes1();
        //getPlanillasOfDay();
    };
};

postesApp.controller('postesController', ['$scope', '$http', 'geoDataFactory', postesController]);

