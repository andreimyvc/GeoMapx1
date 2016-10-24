
function initGridPrebuild() {
    var tableid = "#tblPrebuild";
    $(tableid).jqGrid({
        datatype: "local",
        colModel: [
            { label: 'PreBuildID', name: 'PreBuildID', key: true, hidden: true },
            { label: 'ActividadID', name: 'ActividadID', hidden: true },
            { label: 'PosteID', name: 'PosteID', hidden: true },
            { label: 'Unidad Cons.', name: 'UniCons', search: false, width: 90 },
            { label: 'Cantidad', name: 'Cantidad', search: false, width: 70 },
            { label: 'Hasta', name: 'CodigoPosteHasta', classes: "CodigoProyecto", search: false, width: 80 },
            { label: 'Descripción', name: 'DescripcionActividad', search: false, width: 185 },
            {
                label: 'Ejecutada', name: 'Ejecutada', search: false, sortable: true, width: 65,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    if (xdata.Ejecutado) {
                        return '<input type="checkbox" name="radio_" disabled checked="checked", value="true" />';
                    }
                    else {
                        return '<input type="radio"   onclick="sendPrebuild(' + xdata.PreBuildID + ')" name="radio_' + '"  />';
                    }
                }
            }, {
                label: ' ', search: false,  sortable: false, width:30,
                align: 'center', formatter: function (cellValue, option, xdata) {
                    if (xdata.Ejecutado) {
                        return '<button onclick="prebuildUndo(' + xdata.PreBuildID + ')"><i class="fa fa-undo" aria-hidden="true"></i></button>';
                    }
                    return '';
                }
            }
        ],
        //multiselect: true,
        colMenu: true,
        gridview: true,
        rowNum: 6,
        //autowidth: true,
        width: 550,
        shrinkToFit: false,
        rowList: [10, 20, 30],
        pager: '#tblPrebuildPager',
        sortname: 'invdate',
        viewrecords: true,
        sortorder: "desc",
        beforeSelectRow: function (rowid, e) {
            var $radio = $(e.target).closest('tr').find('input[type="radio"]');
            $radio.attr('checked', 'checked');
            return true; // allow row selection
        },
    });
   




    //jQuery("#cb_tblPrebuild").css("display:none;");
    jQuery(tableid).jqGrid('navGrid', '#tblPrebuildPager', { edit: false, add: false, del: false });
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
                { label: 'Proyecto', name: 'CodigoProyecto', width: 100 },
                { label: 'Poste', name: 'CodigoPoste', width: 100 },
                { label: 'UniCons', name: 'UniCons', width: 100 },
                { label: 'Cantidad', name: 'Cantidad', width: 90 },
                { label: 'Ficha', name: 'CodigoFicha', width: 80 },
                { label: 'Contratista', name: 'CodigoContratista', width: 100 },
                { label: 'Hasta', name: 'CodigoPosteHasta', width: 80 },
                { label: 'Fecha', name: 'Fecha', width: 100 },
                { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 100 }
            ],
            colMenu: true,
            gridview: true,
            rowNum: 6,
            autowidth: true,
            shrinkToFit: true,
            autoheight: true,
            rowList: [10, 20, 30],
            pager: '#jqGridActividadUsuarioPager',
            sortname: 'invdate',
            viewrecords: true,
            sortorder: "desc",
            onSelectRow: function (id) {
                var scope = angular.element(document.getElementById('diariasprebuildApp')).scope();
                scope.setSelectedPlanilla(id);
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