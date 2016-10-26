
function initGridCubicaciones() {
    var tableid = "#jqGridActividadUsuario";
    $(tableid).jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PlanillaID', name: 'PlanillaID', key: true, hidden: true },
            { label: 'ProyectoID', name: 'ProyectoID', key: true, hidden: true },
            { label: 'PoligonoID', name: 'PoligonoID', key: true, hidden: true },
            { label: 'PosteID', name: 'PosteID', key: true, hidden: true },
            { label: 'PosteIDHasta', name: 'PosteIDHasta', key: true, hidden: true },
            { label: 'ActividadID', name: 'ActividadID', key: true, hidden: true },
            { label: 'Poligono', name: 'CodigoPoligono', width: 70 },
            { label: 'Poste', name: 'CodigoPoste', width: 70 },
            { label: 'UniCons', name: 'UniCons', width: 75 },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 175 },
            { label: 'Cantidad', name: 'Cantidad', width: 60 },
            { label: 'Hasta', name: 'CodigoPosteHasta', width: 60 },
            { label: 'Transformador', name: 'SerialTransformador', width: 90 },
            { label: 'Fecha', name: 'Fecha', width: 75 },
            {
                label: '', name: ' ', search: false, sortable: true, width: 80,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    var callback = function (data) {
                        angular.element(document.getElementById('certificacionesApp')).scope().certificate(data);
                    };//
                    var cmll = String.fromCharCode(39);
                    return '<button onclick="ShowObserva(' + xdata.PlanillaID + ')" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
                        '</i>&nbsp;Observación</button>';
                }
            },
            {
                label: '', name: ' ', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    var callback = function (data) {
                        angular.element(document.getElementById('certificacionesApp')).scope().certificate(data);
                    };
                    var cmll = String.fromCharCode(39);
                    return '<button onclick="jqgridDeleteRow(' + cmll + '#' + option.gid + cmll + ',' + option.rowId + ','
                        + xdata.PlanillaID + ',' + callback + ')"><i class="fa fa-certificate" aria-hidden="true"></i>&nbsp;Certificar</button>';
                }
            }
        ],
        colMenu: true,
        gridview: true,
        rowNum: 6,
        width: 1100,
        //autowidth: true,
        shrinkToFit: true,
        autoheight: true,
        rowList: [10, 20, 30],
        pager: '#jqGridActividadUsuarioPager',
        sortname: 'invdate',
        viewrecords: true,
        sortorder: "desc",
        caption: "ACTIVIDADES PENDIENTES DE CERTIFICAR"
    });
}

function initGridNCubicaciones() {
    var tableid = "#jqGridNCubicaciones";
    $(tableid).jqGrid({
        datatype: "local",
        colModel: [
            { label: 'ProyectoID', name: 'ProyectoID', key: true, hidden: true },
            { label: 'Proyecto', name: 'CodigoProyecto', width: 55 },
            { label: 'Número de Cubicación', name: 'Numero', width: 140 },
            { label: 'Fecha', name: 'Fecha', width: 80 },
            { label: 'Estado', name: 'Estado', width: 45, align: 'center', formatter: function(cellValue, option, xdata){
                if(xdata.Estado){ return "Activo "; }
                return "Inactivo";
            } }, 
            {
                label: 'Cambiar Estaddo', name: '', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    var cmll = String.fromCharCode(39);
                    if(xdata.Estado){
                        return '<button onclick="xChanState('+ xdata.SecuenciaID +','+ xdata.Estado + ')' +
                                    '"><i class="fa fa-long-arrow-up" aria-hidden="true"></i>&nbsp;Inactivar</button>';
                    }
                    return '<button onclick="xChanState(' + xdata.SecuenciaID + ',' + xdata.Estado + ')' +
                                '"><i class="fa fa-long-arrow-down" aria-hidden="true"></i>&nbsp;Activar</button>';
                    }
            }
        ],
        colMenu: true,
        gridview: true,
        rowNum: 6,
        //width: 1100,
        autowidth: true,
        shrinkToFit: true,
        autoheight: true,
        rowList: [10, 20, 30],
        pager: '#jqGridNCubicacionesPager',
        sortname: 'invdate',
        viewrecords: true,
        sortorder: "desc",
        caption: "DETALLE DE ACTIVIDADES CERTIFICADAS"
    });
}

