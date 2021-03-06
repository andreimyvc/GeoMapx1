﻿//"use strict";

var diariasApp = angular.module('diariasApp', ['GeoMapxWebApi']);
var diariasController = function (scope, http, geoDataFactory) {    
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
    d.allUniconsData = undefined;
    d.planillasOfDayData = undefined;
    d.proyectosData = undefined;
    d.postesData = undefined;
    d.uniconsData = undefined;
    d.fichasData = undefined;
    d.postesHastaData = undefined;
    d.contratistasData = undefined;
    d.actividadesByproyectosData = undefined;
    d.selectedPlanilla = undefined;
    d.selectedProyect = undefined;
    d.selectedPoste = undefined;
    d.selectedPoste2 = undefined;
    d.selectedUnicons = undefined;
    d.selectedPosteHasta = undefined;
    d.selectedContratista = undefined;
    d.selectedFicha = undefined;
    d.isWatching = true;
    //#endregion SetVariables
    //#region botones
    d.clearFields = function () {
        //d.proyectosData = undefined;
        d.postesData = undefined;
        d.contratistasData = undefined;
        d.postesData = undefined;
        d.fichasData = undefined;
        d.postesHastaData = undefined;
        d.selectedProyect = undefined;
        d.selectedPoste = undefined;
        d.selectedFicha = undefined;
        d.selectedContratista = undefined;
        d.selectedPosteHasta = undefined;
        d.selectedPosteHasta = undefined;
        d.cantidad = undefined;
        d.fecha = undefined;
        d.selectedUnicons = undefined;
        d.observacion = undefined;
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
        d.postesData = undefined;
    };
    d.cancelEntrada = function () {
        d.diarias.state = 'view'
        d.diarias.fieldsReadOnly = true;
        d.diarias.btns.Nuevo.show = true;
        d.diarias.btns.Cancelar.show = false;
        d.diarias.btns.Guardar.show = false;
        d.clearFields();
        if (d.selectedPlanilla) {
            d.setSelectedPlanilla(d.selectedPlanilla.PlanillaID);
        }

        //d.postesData = undefined;
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
        if (d.diarias.state === 'add') {
            postPlanilla(aplanilla)
            .then(function (data) {
                getPlanillasOfDay();
                d.diarias.state = 'view'
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
            aplanilla.PlanillaID = d.selectedPlanilla.PlanillaID;
            putPlanilla(aplanilla).then(function (data) {
                d.diarias.btns.Editar.show = true;
                getPlanillasOfDay();
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
            getPostesByProyecto();
            getUniconsByProyecto();
            getContratistasByProyecto();
            getActividadesByProyecto();
        }
    });
    d.$watch('selectedUnicons', function () {
        if (d.diarias.state === 'add') {
            getPostesByProyectoDiferenteDe();
        }
    });
    d.$watch('selectedContratista', function () {
        if (d.diarias.state === 'add') {
            getFichasByContratista();
        }
        //d.isWatching = true;
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
    var postPlanilla = function (aplanilla) {
        return geoDataFactory.insertPlanilla(aplanilla);
    };
    var putPlanilla = function (aplanilla) {
        return geoDataFactory.updatePlanilla(aplanilla);
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
    var getPostesByProyecto = function () {
        if (scope.selectedProyect && scope.selectedProyect.ProyectoID > 0) {
            geoDataFactory.getPostesByProyecto(d.selectedProyect.ProyectoID).then(
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
    var getPostesByProyectoID = function (proyectoid) {
        geoDataFactory.getPostesByProyecto(proyectoid).then(
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
    d.changeGuiPlanilla = function (planilla) {
        d.selectedPlanilla = planilla;
        if (planilla) {
            d.setSelectedPoste2(planilla.ProyectoID, planilla.PosteID);
            d.isWatching = false;
            d.setSelectedProyect(planilla.ProyectoID)
            d.setSelectedPoste(planilla.ProyectoID, planilla.PosteID);
            d.setSelectedPoste(planilla.ProyectoID, planilla.PosteID);
            //d.setSelectedPoste2(planilla.ProyectoID, planilla.PosteID);
            d.setSelectedUnicons(planilla.ProyectoID, planilla.UniCons);
            d.setSelectedPosteHasta(planilla.ProyectoID,planilla.PosteID, planilla.PosteIDHasta);;
            d.setSelectedContratista(planilla.ProyectoID, planilla.ContratistaID);
            d.setSelectedFicha(planilla.ContratistaID, planilla.FichaID);
            d.cantidad = planilla.Cantidad;
            d.observacion = planilla.Observacion;
            var strDate = planilla.Fecha.substring(3, 5) + "/" + planilla.Fecha.substring(0, 2) + "/" + planilla.Fecha.substring(6, 10);
            d.fecha = new Date(strDate);//moment().format(planilla.Fecha);// Date.parse(planilla.Fecha);
            //d.isWatching = true;

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
    d.setSelectedPlanilla = function (id) {
        d.clearFields();
        if (d.planillasOfDayData) {
            d.selectedPlanilla = d.planillasOfDayData.filter(function (elemento) { return elemento.PlanillaID == id; })[0];
            if (d.selectedPlanilla) {
                d.changeGuiPlanilla(d.selectedPlanilla);
            } else {
                getPlanillaByIDWithCallback(id, d.changeGuiPlanilla, function (error) { d.error = error.data.Message;});
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
            geoDataFactory.getPostesByProyecto(proyectoid).then(
                function (data) {
                    d.postesData = data;
                    d.selectedPoste = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
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
            };
        } else {
            getPostesData(proyectoid, posteid);
        }
        function getPostesData(proyectoid, posteid) {
            geoDataFactory.getPostesByProyecto(proyectoid).then(
                    function (data) {
                        d.postesData = data;
                        d.selectedPoste2 = d.postesData.filter(function (elemento) { return elemento.PosteID == posteid; })[0];
                    }, function (error) {
                        scope.error = error.data.Message;
                    });
        }
    };
    d.setSelectedPosteHasta = function (proyectoid, posteid, posteidHasta) {
        d.selectedPosteHasta = null;
        if (d.postesHastaData) {
            d.selectedPosteHasta = d.postesHastaData.filter(function (elemento) { return elemento.PosteID == posteidHasta; })[0];
            if (!d.selectedPosteHasta) { getPosteHasta(proyectoid, posteid); }
        } else {
            getPosteHasta(proyectoid, posteid);
        }
        function getPosteHasta(proyectoid, posteid) {
            geoDataFactory.getPostesByProyectoDiferenteDe(proyectoid, posteid).then(
                    function (data) {
                        d.postesHastaData = data;
                        d.selectedPosteHasta = d.postesHastaData.filter(function (elemento) { return elemento.PosteID == posteidHasta; })[0];
                    }, function (error) {
                        scope.error = error.data.Message;
                    });

        };
    };
    d.setSelectedUnicons = function (proyectoid, unicons) {
        d.selectedUnicons = null;
        if (d.uniconsData) {
            d.selectedUnicons = d.uniconsData.filter(function (elemento) { return elemento.UniCons == unicons; })[0];
            if (!d.selectedUnicons) {
                getUnicons(proyectoid, unicons);
            }
        }
        else {
            getUnicons(proyectoid, unicons);
        }
        function getUnicons(proyectoid, unicons) {
            geoDataFactory.getUniconsByProyecto(proyectoid).then(
             function (data) {
                 d.uniconsData = data;
                 d.selectedUnicons = d.uniconsData.filter(function (elemento) { return elemento.UniCons == unicons; })[0];
             }, function (error) {
                 d.error = error.data.Message;
             });
        }
    };
    d.setSelectedContratista = function (proyectoid, contratistaid) {
        d.selectedContratista = null;
        if (d.contratistasData) {
            d.selectedContratista = d.contratistasData.filter(function (elemento) { return elemento.ContratistaID == contratistaid; })[0];
            if (!d.selectedContratista) {
                getContratistas(proyectoid, contratistaid);
            }
        } else if (contratistaid && contratistaid > 0) {
            getContratistas(proyectoid, contratistaid);
        }
        function getContratistas() {
            geoDataFactory.getContratistasByProyecto(proyectoid).then(
              function (data) {
                  d.contratistasData = data;
                  d.selectedContratista = d.contratistasData.filter(function (elemento) { return elemento.ContratistaID == contratistaid; })[0];
              }, function (error) {
                  d.error = error.data.Message;
              });
        }
    };
    d.setSelectedFicha = function (contratistaid, fichaid) {
        d.selectedFicha = null;
        if (contratistaid && contratistaid > 0) {
            if (d.fichasData) {
                d.selectedFicha = d.fichasData.filter(function (elemento) { return elemento.FichaID == fichaid; })[0];
                if (!d.selectedFicha) { getFichas(contratistaid, fichaid); }
            } else {
                getFichas(contratistaid, fichaid);
            }
            function getFichas(contratistaid, fichaid) {
                geoDataFactory.getFichasByContratista(contratistaid).then(
                    function (data) {
                        d.fichasData = data;
                        d.selectedFicha = d.fichasData.filter(function (elemento) { return elemento.FichaID == fichaid; })[0];
                    }, function (error) {
                        d.error = error.data.Message;
                    });
            };
        }
    };
    //#endregion SetSelected

    d.FiltroN = function (car) {
        if (car.PosteID > 0) { return true; }
        return false;
    };

    d.startAppDiarias = function () {
        //d.getPostes1();
        getPoryectos();
        getPlanillasOfDay();
        //getPostes()
        //    .success(function (data) {
        //        d.setGrid("#jqGridCodigoPostes", data);
        //    })
        //    .error(function (data) {
        //        d.error = data.Message;
        //    });
    };
};

//app.filter('postesByProyectoFilter', function () {
//    return function (selectedProyect) {
//        getPostesByProyecto(selectedProyect.ProyectoID);
//        return postesData;
//        }
//    }
//);
diariasApp.controller('diariasController', ['$scope', '$http', 'geoDataFactory', diariasController]);

//d.$watch('uniconsData', function () {
// if (d.uniconsData)
//{
//$('#gs_UniCons').empty().html('<option value="">Todos</option>');
//for (i = 0; i < d.uniconsData.length; i++)
//{
//    $('#gs_UniCons').append($('<option value="' + d.uniconsData[i].UniCons + '">' + d.uniconsData[i].UniCons + '</option>'));
//}

//$('#jqGridCodigoActividades').setColProp('CodigoPoste', { searchoptions: { sopt: ['eq', 'ne'], value: arr } });
// $('#jqGridCodigoActividades').trigger('reloadGrid');
//}
//});
//d.$watch('actividadesByproyectosData', function () {
//    //d.setGrid("#jqGridCodigoActividades", d.actividadesByproyectosData);
//});