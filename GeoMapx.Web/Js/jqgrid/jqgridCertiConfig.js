
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
            { label: 'UniCons', name: 'UniCons', width: 75 },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 175 },
            { label: 'Poligono', name: 'CodigoPoligono', width: 70 },
            { label: 'Poste', name: 'CodigoPoste', width: 70 },
            { label: 'Hasta', name: 'CodigoPosteHasta', width: 70 },
            { label: 'Transformador', name: 'SerialTransformador', width: 90 },
            { label: 'Cantidad', name: 'Cantidad', width: 60 },
            { label: 'Fecha', name: 'Fecha', width: 80 },
            {
                label: 'Estado', name: 'Verificado', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    if (xdata.Verificado) {
                        return '<i class="fa fa-check-circle" aria-hidden="true"></i>';
                    } else {
                        return '<i class="fa fa-circle-o" aria-hidden="true"></i>';
                    }
                }
            },
            {
                label: 'Ejecutada', name: 'Ejecutada', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    var callback = function (data) {
                        angular.element(document.getElementById('certificacionesApp')).scope().moveRowToCommit(data);
                    };
                    var cmll = String.fromCharCode(39);
                    return '<button onclick="jqgridDeleteRow(' + cmll + '#' + option.gid + cmll + ',' + option.rowId + ',' + xdata.PlanillaID + ',' + callback
                            + ')"><i class="fa fa-certificate" aria-hidden="true"></i>&nbsp;Verificar</button>';
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
        sortorder: "desc"
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
            { label: 'UniCons', name: 'UniCons', width: 75 },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 175 },
            { label: 'Poligono', name: 'CodigoPoligono', width: 70 },
            { label: 'Poste', name: 'CodigoPoste', width: 70 },
            { label: 'Hasta', name: 'CodigoPosteHasta', width: 70 },
            { label: 'Transformador', name: 'SerialTransformador', width: 90 },
            { label: 'Cantidad', name: 'Cantidad', width: 60 },
            { label: 'Fecha', name: 'Fecha', width: 80 }, {
                label: 'Opción', name: 'Opcion', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    //alert(objToString(xdata));

                    var cmll = String.fromCharCode(39);
                    if (xdata.Verificado) {
                        return '<button onclick="xUndoCert(' + cmll + '#' + option.gid + cmll + ',' + option.rowId + ',' + xdata.PlanillaID +
                            ')"><i class="fa fa-undo" aria-hidden="true"></i></button>';
                    } else {
                        return '<i class="fa fa-circle-o" aria-hidden="true"></i>';
                    }

                }
            }, {
                label: 'Ejecutada', name: 'Ejecutada', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    //alert(objToString(xdata));

                    var cmll = String.fromCharCode(39);
                        return '<button onclick="xRemoveFromCommit' +
                            '(' + cmll + '#' + option.gid + cmll + ',' + option.rowId + ',' + xdata.PlanillaID + ')' +
                                '"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Cancelar</button>';
                    }
            }
            //, {
            //    label: ' ', search: false, sortable: false, width: 30,
            //    align: 'center', formatter: function (cellValue, option, xdata) {
            //        if (xdata.Ejecutado) {
            //            return '<button onclick="prebuildUndo(' + xdata.PreBuildID + ')"><i class="fa fa-undo" aria-hidden="true"></i></button>';
            //        }
            //        return '';
            //    }
            //}
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
        sortorder: "desc"
    });
}

