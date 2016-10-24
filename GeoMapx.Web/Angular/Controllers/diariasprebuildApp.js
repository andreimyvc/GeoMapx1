//"use strict";

var diariasprebuildApp = angular.module('diariasprebuildApp', ['GeoMapxWebApi']);
var diariasprebuildController = function (scope, http, geoDataFactory) {
    var d = scope;
    d.control =
        {
            fieldsReadOnly: false,
            state: 'add',
            btns:
                {
                    Nuevo: { show: true },
                    Editar: { show: false },
                    Eliminar: { show: false },  
                    Cancelar: { show: false },
                    Guardar: { show: false }
                },
            lesstype:
                {
                    proyecto: false,
                    poligono: false,
                    supervisor: false,
                    poste: false,
                    fecha: false,
                    contratista: false,
                    ficha: false
                }
        };
    d.model = 
        {
            Fecha: null,
            Observacion: null,
            SerialTransformador: null,
        };
    //#region SetVariables
    d.config = undefined;
    d.allPostesData = undefined;
    d.allUniconsData = undefined;
    d.actividadesPrebuildsData = undefined;
    d.poligonosData = undefined;
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
    d.ftest = function () {
        d.setSelectedPoligono({ PoligonoID: 1, ProyectoID: 1 });
    };
    d.clearFields = function () {
        //d.proyectosData = undefined;
        d.postesData = undefined;
        d.contratistasData = undefined;
        d.postesData = undefined;
        d.fichasData = undefined;
        d.selectedPoligono = undefined;
        d.selectedProyect = undefined;
        d.selectedPoste = undefined;
        d.selectedFicha = undefined;
        d.selectedContratista = undefined;
        d.selectedSupervisor = undefined;
        d.cantidad = undefined;
        //d.model.Fecha = Date();

        d.setGrid("#tblPrebuild", []);
    };
    d.newEntrada = function () {
        d.selectedPlanilla = null;
        d.control.fieldsReadOnly = false;
        d.control.btns.Nuevo.show = false;
        d.control.btns.Editar.show = false;
        d.control.btns.Guardar.show = true;
        d.control.btns.Cancelar.show = true; 
        d.control.state = 'add';
        d.clearFields();
        d.restoreState();
    };
    d.cancelEntrada = function () {
        d.control.state = 'view'
        d.control.fieldsReadOnly = true;
        d.control.btns.Nuevo.show = true;
        d.control.btns.Cancelar.show = false;
        d.control.btns.Guardar.show = false;
        d.clearFields();

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
        d.diarias.fieldsReadOnly = true;
        d.diarias.btns.Nuevo.show = true;
        d.diarias.btns.Cancelar.show = false;
        //d.postesData = undefined;
        var aplanilla = {
            ProyectoID: d.selectedProyect ? d.selectedProyect.ProyectoID : undefined,
            PoligonoID: d.selectedPoligono ? d.selectedPoligono.PoligonoID : undefined,
            PosteID: d.selectedPoste ? d.selectedPoste.PosteID : undefined,
            ActividadID: d.selectedUnicons ? d.selectedUnicons.ActividadID : undefined,
            Cantidad: d.cantidad || undefined,
            Fecha: d.fecha || undefined,
            Observacion: d.observacion || undefined,
            PosteIDHasta: d.selectedPosteHasta ? d.selectedPosteHasta.PosteID : undefined,
            FichaID: d.selectedFicha ? d.selectedFicha.FichaID : undefined,
            ContratistaID: d.selectedContratista ? d.selectedContratista.ContratistaID : undefined,
            SupervisorID: d.selectedSupervisor ? d.selectedSupervisor.SupervisorID : undefined,
            SerialTransformador: d.model.SerialTransformador || undefined
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
        //d.control.fieldsReadOnly = true;
        //d.control.btns.Nuevo.show = true;
        //d.control.btns.Cancelar.show = false;
        //d.postesData = undefined;
    };
    //#endregion Botones
    //#region watches
    d.$watch('selectedProyect', function () {
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
    //d.$watch('planillasOfDayData', function () {
    //    if (d.planillasOfDayData)
    //    {
    //        d.setGrid("#jqGridActividadUsuario", d.planillasOfDayData);           
    //    }
    //});
   
//#endregion watches
    d.initMapAndMarker = function (poste) {
        if (poste) {
            initMapAndMarker(poste.Lat, poste.Lon, poste.CodigoPoste);
        }
    };
    d.initGridActividadesByPoste = function (posteid) {
        getActividadesByPoste(posteid);
    };
    d.onProyectChange = function (proyect) {
        getPoligonosByProyecto(proyect);
        getContratistasByProyecto();
        getSupervisoresByProyecto(proyect);
    }
    d.onPoligonoChange = function (poligono) {
        getPostesByPoligono(poligono);
    }
    d.onContratistaChange = function (contratista) {
        getFichasByContratista(contratista);
    }
    d.onPosteChange = function (poste) {
        if (poste) {
            getActividadesPrebuildsByPoste();
            d.initMapAndMarker(poste);
            d.initGridActividadesByPoste(poste.PosteID);
        } else if (!d.selectedPoste) {
            d.setGrid("#jqGridPostes", []);
        }
    }
/*********************BEGIN CRUD*************************************/
    var postPlanilla = function (aplanilla) {
        //return geoDataFactory.insertPlanilla(aplanilla);
    };
    var putPlanilla = function (aplanilla) {
        //return geoDataFactory.updatePlanilla(aplanilla);
    };
    /*********************END CRUD*************************************/
   //#region GETs
    var getPoryectos = function () {
        geoDataFactory.getProyectosByEmpresas().then(function (data) {
            scope.proyectosData = data;
        },function (error) {
            scope.error = error.data.Message;
        });
    };
    var getActividadesByPoste = function (posteid) {
        geoDataFactory.getActividadesByPoste(posteid).then(
            function (data) {
                d.actividadesBypostesData = data;
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
    var getPoligonosByProyecto = function (proyecto) {
        if (proyecto) {
            geoDataFactory.getPoligonosByProyecto(proyecto.ProyectoID).then(
                function (data) {
                    d.poligonosData = data;
                }, function (error) {
                    d.error = error.data.Message;
                });
        }
        else {
            d.poligonosData = [];
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
    var getPostesByPoligono = function (poligono) {
        if (poligono && poligono.PoligonoID > 0) {
            geoDataFactory.getPostesByPoligono(poligono.PoligonoID).then(
                function (data) {
                    d.postesData = data;
                }, function (error) {
                    d.error = error.data.Message;
                });
        }
        else {
            d.postesData = [];
        }
    };
    var getPostesByPoligonoWCB = function (poligonoid, onSuccess, onError) {
        if (poligonoid > 0) {
            geoDataFactory.getPostesByPoligono(poligonoid).then(onSuccess,onError);
        }
        else {
            d.postesData = [];
        }
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
    var getSupervisoresByProyecto = function (supervisor) {
        if (supervisor) {
            geoDataFactory.getSupervisoresByProyecto(supervisor.ProyectoID).then(
                function (data) {
                d.supervisoresData = data;
            },function (error) {
                d.error = error.data.Message;
            });
        }
        else {
            d.contratistasData = undefined;
        }
    };
    var getContratistasByProyectoWCB = function (proyectoid, onSuccess, onError) {
        if (proyectoid > 0) {
            geoDataFactory.getContratistasByProyecto(proyectoid).then(onSuccess, onError);
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
    var getActividadesPrebuildsByPoste = function () {
        if (d.selectedProyect.ProyectoID && d.selectedPoste.PosteID) {
            geoDataFactory.getActividadesPrebuildsByPoste(d.selectedPoste.PosteID).then(
                function (data) {
                    d.actividadesPrebuildsData = data;
                    d.setGrid("#tblPrebuild", data);
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
    };

    d.setGrid = function (idGrid, xdata) {
        $(idGrid).jqGrid('clearGridData')
            .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

        $(idGrid).jqGrid("setFrozenColumns");
    };

    //#region SetSelected
    d.setSelectedProyect = function (proyectid) {
        d.selectedProyect = null;
        if (d.proyectosData) {
            d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectid; })[0];
            if (!d.selectedProyect) {
                getProyect(proyectid);
            } else {
                getContratistasByProyecto();
            }
        } else {
            getProyect(proyectid);
        }
        function getProyect(proyectid) {
            geoDataFactory.getProyectosByEmpresas().then(function (data) {
                d.proyectosData = data;
                d.selectedProyect = d.proyectosData.filter(function (elemento) { return elemento.ProyectoID == proyectid; })[0];
                getContratistasByProyecto();
            }, function (error) {
                d.error = error.data.Message;
            });
        }
    };
    d.setSelectedPoligono = function (poligono) {
        d.selectedPoligono = null;
        if (d.poligonosData && poligono) {
            d.selectedPoligono = d.poligonosData.filter(function (elemento) { return elemento.PoligonoID == poligono.PoligonoID; })[0];
            if (!d.selectedPoligono) { internalGet(); }
        } else if(poligono) {
            internalGet();
        }
        function internalGet() {
            geoDataFactory.getPoligonosByProyecto(poligono.ProyectoID).then(
                    function (data) {
                        d.poligonosData = data;
                        d.selectedPoligono = d.poligonosData.filter(function (elemento) { return elemento.PoligonoID == poligono.PoligonoID; })[0];
                    }, function (error) {
                        d.error = error.data.Message;
                    });
        };
    };
    d.setSelectedPoste = function (poste) {
        d.selectedPoste = null;
        if (d.postesData && poste) {
            d.selectedPoste = d.postesData.filter(function (elemento) { return elemento.PosteID == poste.PosteID; })[0];
            if (d.selectedPoste) {
                getActividadesPrebuildsByPoste();
            }else {
                geInternal();
            }
        } else {
            geInternal();
        }
        function geInternal() {
            geoDataFactory.getPostesByProyecto(poste.ProyectoID).then(
                function (data) {
                    d.postesData = data;
                    d.selectedPoste = d.postesData.filter(function (elemento) { return elemento.PosteID == poste.PosteID; })[0];
                    if (d.selectedPoste) {
                        getActividadesPrebuildsByPoste();
                    }
                }, function (error) {
                    scope.error = error.data.Message;
                });
        }
    }
    d.setSelectedContratista = function (contratista) {
        d.selectedContratista = null;
        if (d.contratistasData && contratista) {
            d.selectedContratista = d.contratistasData.filter(function (elemento) { return elemento.ContratistaID == contratista.ContratistaID; })[0];
            if (!d.selectedContratista) {
                geInternal();
            } 
        } else if (contratista) {
            geInternal();
        }
        function geInternal() {
            geoDataFactory.getContratistasByProyecto(contratista.ProyectoID).then(
              function (data) {
                  d.contratistasData = data;
                  d.selectedContratista = d.contratistasData.filter(function (elemento) { return elemento.ContratistaID == contratista.ContratistaID; })[0];
              }, function (error) {
                  d.error = error.data.Message;
              });
        }
    };
    d.setSelectedFicha = function (ficha) {
        d.selectedFicha = null;
        if (d.fichasData && fichas) {
            d.selectedFicha = d.fichasData.filter(function (elemento) { return elemento.FichaID == ficha.FichaID; })[0];
            if (!d.selectedFicha) { geInternal(); }
        } else if (ficha) {
            geInternal();
        }
        function geInternal() {
            geoDataFactory.getFichasByContratista(ficha.ContratistaID).then(
                function (data) {
                    d.fichasData = data;
                    d.selectedFicha = d.fichasData.filter(function (elemento) { return elemento.FichaID == ficha.FichaID; })[0];
                }, function (error) {
                    d.error = error.data.Message;
                });
        };
    }
    d.setSelectedSupervisor = function (supervisor) {
        d.selectedSupervisor = null;
        if (d.supervisoresData && supervisor) {
            d.selectedSupervisor = d.supervisoresData.filter(function (elemento) { return elemento.SupervisorID == supervisor.SupervisorID; })[0];
            if (!d.selectedSupervisor) { geInternal(); }
        } else if (supervisor) {
            geInternal();
        }
        function geInternal() {
            geoDataFactory.getSupervisoresByProyecto(supervisor.ProyectoID).then(
                function (data) {
                    d.supervisoresData = data;
                    d.selectedSupervisor = d.supervisoresData.filter(function (elemento) { return elemento.SupervisorID == supervisor.SupervisorID; })[0];
                }, function (error) {
                    d.error = error.data.Message;
                });
        };
    }
    //#endregion SetSelected
    d.setGrid = function (idGrid, xdata) {
        d.setGrid = function (idGrid, xdata) {
            $(idGrid).jqGrid('clearGridData')
                .jqGrid('setGridParam', { data: xdata }).trigger('reloadGrid');

            $(idGrid).jqGrid("setFrozenColumns");
        };
    }
    d.setDataTableData = function (tableid, data) {
        //$(tableid).DataTable({
        //    data: data,
        //    columns: [
        //        { data: 'CodigoPoste' },
        //        { data: 'CodigoProyecto' },
        //        { data: 'Cantidad' },
        //        { data: 'UniCons' }
        //    ]
        //});
        //var xdata = [];
        //    var k = {};
        //for (x in data) {
        //    for (j in data[x]) {
        //        k[j] = data[x][j];
        //    }
        //    xdata.push(k);
        //}
        var table = $(tableid).DataTable();
        table.clear();
        table.rows.add(data).draw();
    }
    d.saveState = function () {
        var obj = {
            data: {
                proyecto: null,
                poligono: null,
                supervisor: null,
                poste: null,
                fecha: null,
                contratista: null,
                ficha: null
            }
        };
        if (d.control.lesstype.proyecto) {
            obj.data.proyecto = d.selectedProyect;
        } else {
            obj.data.proyecto = null;
        }
        if (d.control.lesstype.poligono) {
            obj.data.poligono = d.selectedPoligono;
        } else {
            obj.data.poligono = null;
        }
        if (d.control.lesstype.poste) {
            obj.data.poste = d.selectedPoste;
        } else {
            obj.data.poste = null;
        }
        if (d.control.lesstype.fecha) {
            obj.data.fecha = d.model.Fecha;
        } else {
            obj.data.fecha = null;
        }
        if (d.control.lesstype.supervisor) {
            obj.data.supervisor = d.selectedSupervisor;
        } else {
            obj.data.supervisor = null;
        }
        if (d.control.lesstype.contratista) {
            obj.data.contratista = d.selectedContratista;
        } else {
            obj.data.contratista = null;
        }
        if (d.control.lesstype.contratista) {
            obj.data.ficha = d.selectedFicha;
        } else {
            obj.data.ficha = null;
        }
        obj.lesstype = d.control.lesstype;
        sessionStorage.config = angular.toJson(obj);
    }

    d.restoreState = function () {//777
        d.config = angular.fromJson(sessionStorage.config);
        var config = d.config;
        if (config && config.lesstype) {
            d.control.lesstype = config.lesstype;
            if (d.control.lesstype.proyecto) {
                d.setSelectedProyect(config.data.proyecto.ProyectoID);
                //d.selectedProyect = config.data.proyecto;
            }
            if (d.control.lesstype.poligono) {
                //d.selectedPoligono = config.data.poligono;
                d.setSelectedPoligono(config.data.poligono);
            }
            if (d.control.lesstype.poste) {
                d.setSelectedPoste(config.data.poste);
                d.initGridActividadesByPoste(config.data.poste.PosteID);
            }
            if (d.control.lesstype.contratista) {
                d.setSelectedContratista(config.data.contratista);
            }
            if (d.control.lesstype.ficha) {
                d.setSelectedFicha(config.data.ficha);
            }
            if (d.control.lesstype.supervisor) {
                d.setSelectedSupervisor(config.data.supervisor)
            }
            if (d.control.lesstype.fecha) {
                var fecha = config.data.fecha;
               // var strDate = fecha.substring(3, 5) + "/" + fecha.substring(0, 2) + "/" + fecha.substring(6, 10);
                d.model.Fecha = new Date(config.data.fecha);
            }
        }
    }
    d.prebuildUndo = function (prebuildid) {
        if (d.control.state === 'edit') {
            var r = confirm("¿Desmarcar esta unidad constructiva?");
            if (r) {
                var prebuild = { PreBuildID: prebuildid, Ejecutado: false };
                geoDataFactory.updateActividadPrebuild(prebuild).then(
                    function (data) {
                        getActividadesPrebuildsByPoste();
                    }, function (error) {
                        d.error = error.Message;
                    });
            }
        } else {
            alert("Para corregir la unidad constructiva debe presionar el botón editar.");
        }
    };
    d.clearState = function () {
        //var config = angular.fromJson(sessionStorage.config);
    }
    d.startApp = function () {
        getPoryectos();
        getPlanillasOfDay();
    };
};

diariasprebuildApp.controller('diariasprebuildController', ['$scope', '$http', 'geoDataFactory', diariasprebuildController]);