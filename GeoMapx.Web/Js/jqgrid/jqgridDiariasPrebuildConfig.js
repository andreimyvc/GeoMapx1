
function initGridPrebuild() {
    var tableid = "#tblPrebuild";
    $(tableid).jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PreBuildID', name: 'PreBuildID', key: true, hidden: true },
            { label: 'ActividadID', name: 'ActividadID', hidden: true },
            { label: 'PosteID', name: 'PosteID', hidden: true },
            { label: 'Unidad Cons.', name: 'UniCons', search: false, width: 90 },
            {
                label: 'CP', name: 'CantidadPendiente', key:true, search: false, width: 30, editable: true, edittype: "text",
                //formatter: 'integer',
                //editoptions: {
                //    size: 25, maxlengh: 30,
                //    dataInit: function (element) {
                //        $(element).keypress(function (e) {
                //            if (e.which == 13 || e.which == 10) { return false;}
                //            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //                return false;
                //            }
                //        });
                //    }
                //}
            },
            { label: 'Hasta', name: 'CodigoPosteHasta', classes: "CodigoProyecto", search: false, width: 80 },
            { label: 'Descripción', name: 'DescripcionActividad', search: false, width: 185 },
            { label: 'CL', name: 'CantidadLicitada', search: false, width: 30 },
            { label: 'CE', name: 'CantidadEjecutada', search: false, width: 30   },
        ],
        //multiselect: true,
        loadonce:true,
        colMenu: true,
        gridview: true,
        rowNum: 6,
        //autowidth: true,
        width: 550,
        shrinkToFit: false,
        rowList: [10, 20, 30],
        pager: '#tblPrebuildPager',
        viewrecords: true,
        sortorder: "desc",
        onSelectRow: editRow,
        //beforeSelectRow: beforeSelRow,
    });


    var lastSelection;

    function editRow(id) {
        if (id && id !== lastSelection) {
            var grid = $(tableid);
            grid.jqGrid('restoreRow', lastSelection);
            grid.jqGrid('editRow', id, {
                keys: false, focusField: 4,
            });

            //$(tableid).saveRow(id, false);
            //$(tableid).jqGrid('saveRow',id, false);
            lastSelection = id;
        }
    }

    //function editRow(id) {
    //    if (id && id !== lastSelection) {
    //        var grid = $(tableid);
    //        grid.restoreRow(lastSelection);

    //        var editParameters = {
    //            keys: true,
    //            successfunc: editSuccessful,
    //            errorfunc: editFailed,
    //            restoreAfterError: false
    //        };
    //        grid.jqGrid('editRow', id, editParameters);
    //        lastSelection = id;
    //    }
    //}

    function editSuccessful(data, stat) {
        var response = data.responseJSON;
        if (response.hasOwnProperty("error")) {
            if (response.error.length) {
                return [false, response.error];
            }
        }
        return [true, "", ""];
    }

    function editFailed(rowID, response) {
        $.jgrid.info_dialog($.jgrid.errors.errcap, '<div class="ui-state-error">RowID:' + rowID + ' :  ' + response.responseJSON.error + '</div>', $.jgrid.edit.bClose, { buttonalign: 'right' })
        //alert(response.responseJSON.error);
    }
    function beforeSelRow(rowid, e) {
        var $radio = $(e.target).closest('tr').find('input[type="radio"]');
        $radio.attr('checked', 'checked');
        return true; // allow row selection
    }
   




    //jQuery("#cb_tblPrebuild").css("display:none;");
    //$(tableid).jqGrid('navGrid', '#tblPrebuildPager', { edit: false, add: false, del: false });
}
function initGridActividadesByPoste() {
    $("#jqGridPostes").jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PlanillaID', name: 'PlanillaID', key: true, hidden: true },
            { label: 'UniCons', name: 'UniCons', width: 80 },
            { label: 'Descripcion', name: 'DescripcionActividad', width: 165 },
            { label: 'Cantidad', name: 'Cantidad', width:70},
            { label: 'Hasta', name: 'Hasta',width:80 },
            { label: 'Fecha', name: 'Fecha', width:80}
        ],
        colMenu: true,
    gridview: true,
    rowNum: 20,
    width: 515,
    shrinkToFit: false,
    height: '350px',
    rowList: [10, 20, 30],
    sortname: 'invdate',
    viewrecords: true,
    scrollOffset: 0,
    sortorder: "desc",
    pager: "#jqGridPager",
    onSelectRow: function (planillaid) {
        var scope = angular.element(document.getElementById('diariasApp')).scope();
        scope.setSelectedPlanilla(planillaid);
        scope.$apply();
    }
    });

}
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
            { label: 'Proyecto', name: 'CodigoProyecto', width: 60 },
            { label: 'UniCons', name: 'UniCons', width: 75 },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 175 },
            { label: 'Poligono', name: 'CodigoPoligono', width: 70 },
            { label: 'Poste', name: 'CodigoPoste', width: 70 },
            { label: 'Hasta', name: 'CodigoPosteHasta', width: 70 },
            { label: 'Transformador', name: 'SerialTransformador', width: 90 },
            { label: 'Cantidad', name: 'Cantidad', width: 60 },
            { label: 'Supervisor', name: 'NombreCompletoSupervisor', width: 95 },
            { label: 'Contratista', name: 'CodigoContratista', width: 100 },
            { label: 'Ficha', name: 'CodigoFicha', width: 80 },
            { label: 'Fecha', name: 'Fecha', width: 80 },
        ],
        colMenu: true,
        gridview: true,
        rowNum: 6,
        width: 1107,
        //autowidth: true,
        shrinkToFit: true,
        autoheight: true,
        rowList: [10, 20, 30],
        pager: '#jqGridActividadUsuarioPager',
        sortname: 'invdate',
        viewrecords: true,
        sortorder: "desc",
        onSelectRow: function () {
            var rowId = $(tableid).jqGrid('getGridParam', 'selrow');
            var rowData = $(tableid).getRowData(rowId);
            var planilla =
                {
                    PlanillaID: rowData['PlanillaID'],
                    ProyectoID: rowData['ProyectoID'],
                    PosteID: rowData['PosteID'],
                    ActividadID: rowData['PosteID'],
                    PosteIDHasta: rowData['PosteIDHasta'],
                    PoligonoID: rowData['PoligonoID']
                };
            var proyectoid = rowData['ProyectoID'];
            var posteid = rowData['PosteID'];
            var scope = angular.element(document.getElementById('diariasprebuildApp')).scope();
            scope.setSelectedPlanilla(planilla);
            scope.$apply();
        }
    });
}




function initGridPrebuild2() {
    $("#tblPrebuild").jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PreBuildID', name: 'PreBuildID', key: true, hidden: true },
            { label: 'ActividadID', name: 'ActividadID', hidden: true },
            { label: 'PosteID', name: 'PosteID', hidden: true },
            { label: 'Unidad Cons.', name: 'UniCons', search: false },
            { label: 'Cantidad', name: 'PosteID', search: false },
            { label: 'Hasta', name: 'CodigoPosteHasta', classes: "CodigoProyecto", search: false },
            { label: 'Descripción', name: 'DescripcionActividad', search: false },
            { label: 'Ejecutada', name: 'Ejecutada', search: false }
        ],
        loadonce: true,
        //colMenu: true,
        rownumbers: true,
        altRows: true,
        autowidth: true,
        shrinkToFit: true,
        autoheight: true,
        rowNum: 7,
        viewrecords: true,
        rowList: [7, 10],
        pager: "#tblPrebuildPager",
        scroll: 1,
        emptyrecords: 'Sin resultados',
        onSelectRow: function () {
            var rowId = $("#tblPrebuild").jqGrid('getGridParam', 'selrow');
            var rowData = jQuery("#jqGridCodigoPostes").getRowData(rowId);
            var proyectoid = rowData['ProyectoID'];
            var posteid = rowData['PosteID'];
            var scope = angular.element(document.getElementById('diariasprebuildApp')).scope();
            scope.setSelectedPoste2(proyectoid, posteid);
            scope.$apply();
        }
    });
    $("#tblPrebuild").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
}


//,
//gridComplete: function(){ 
//    var ids = jQuery(tableid).getDataIDs(); 
//    for(var i=0;i<ids.length;i++){ 
//        var cl = ids[i]; 
//        var abtn = "<input style='' type='radio' name='radio1' value='Seleccionar' onclick=jQuery('#rowed2').editRow("+cl+"); ></ids>";
//        jQuery(tableid).setRowData(ids[i], { Ejecutada: abtn });
//    }} 