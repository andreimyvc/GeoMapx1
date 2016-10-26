
function initGridActividadUsuario() {
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
                        '&nbsp;Observación</button>';
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

function initGridConfirmadas() {
    var tableid = "#jqGridConfirmadas";
    $(tableid).jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PlanillaID', name: 'PlanillaID', key: true, hidden: true },
            { label: 'ProyectoID', name: 'ProyectoID', key: true, hidden: true },
            { label: 'PoligonoID', name: 'PoligonoID', key: true, hidden: true },
            { label: 'Verificado', name: 'Verificado', key: true, hidden: true },
            { label: 'PosteID', name: 'PosteID', key: true, hidden: true },
            { label: 'PosteIDHasta', name: 'PosteIDHasta', key: true, hidden: true },
            { label: 'ActividadID', name: 'ActividadID', key: true, hidden: true },
            { label: 'Poligono', name: 'CodigoPoligono', width: 55 },
            { label: 'Poste', name: 'CodigoPoste', width: 55 },
            { label: 'UniCons', name: 'UniCons', width: 55 },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 140 },
            { label: 'Cantidad', name: 'Cantidad', width: 45 },
            { label: 'Hasta', name: 'CodigoPosteHasta', width: 55 },
            { label: 'Transformador', name: 'SerialTransformador', width: 70 },
            { label: 'Observación', name: 'ObservacionVerificador', width: 70 },
            { label: 'Fecha', name: 'Fecha', width: 80 },  {
                label: '', name: '', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    //alert(objToString(xdata));

                    var cmll = String.fromCharCode(39);
                    return '<button onclick="xUndoCert(' + cmll + '#' + option.gid + cmll + ',' + option.rowId + ',' + xdata.PlanillaID + ')' +
                                '"><i class="fa fa-undo" aria-hidden="true"></i>&nbsp;Cancelar</button>';
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
        pager: '#jqGridConfirmadasPager',
        sortname: 'invdate',
        viewrecords: true,
        sortorder: "desc",
        caption: "DETALLE DE ACTIVIDADES CERTIFICADAS"
    });
}

