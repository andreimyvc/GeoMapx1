

function initGridActividadesByPoste(aurl) {
    $("#jqGridPostes").jqGrid({
        url: aurl,
            mtype: "GET",
            datatype: "local",
            colModel: [
                { label: 'PlanillaID', name: 'PlanillaID', key: true, width: 100 },
                { label: 'UniCons', name: 'UniCons', width: 100 },
                { label: 'Descripcion', name: 'DescripcionActividad', width: 100 },
                { label: 'Cantidad', name: 'Cantidad', width: 100 },
                { label: 'Hasta', name: 'Hasta', width: 100 },
                { label: 'Fecha', name: 'Fecha', width: 100 }
            ],
            shrinkToFit:false,
            loadonce: true,
            colMenu: true,
            width: 540,
            height: 200,
            rowNum: 100,
            viewrecords: true,
            pager: "#jqGridPager",
            onSelectRow: function (planillaid) {
                var scope = angular.element(document.getElementById('diariasApp')).scope();
                scope.setSelectedPlanilla(planillaid);
                scope.$apply();
            }
        });
   
}
/*************************************************************************************************************************************/
var jqGridActividadUsuarioCreado = false;
function initGridActividadUsuario() {
    if (jqGridActividadUsuarioCreado) {

        $.ajax({
            url: "/diarias/GetPlanillasOfDay",
            success: function (result) {
                $("#jqGridActividadUsuario").jqGrid('setGridParam', { data: JSON.parse(result).PayLoad }).trigger('reloadGrid');
            }
        });
    }
    else {
        jqGridActividadUsuarioCreado = true;
        $("#jqGridActividadUsuario").jqGrid({
            //url: '/actividadesApi/GetActividades',
            //url: '/diarias/GetPlanillasOfDay',
            //mtype: "GET",
            //data: JSON.parse(result).PayLoad,
            datatype: "local",
            colModel: [
                { label: 'PlanillaID', name: 'PlanillaID', key: true, hidden: true},
                { label: 'Proyecto', name: 'CodigoProyecto', width: 100 },
                { label: 'Poste', name: 'CodigoPoste', width: 100 },
                { label: 'UniCons', name: 'UniCons', width: 100 },
                { label: 'Cantidad', name: 'Cantidad', width: 90 },
                { label: 'Ficha', name: 'CodigoFicha', width: 80 },
                { label: 'Contratista', name: 'CodigoContratista', width: 100 },
                { label: 'Hasta', name: 'PosteIDHasta', width: 80 },
                { label: 'Fecha', name: 'Fecha', width: 100 },
                { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 100 }
            ],
            //shrinkToFit: false,
            loadonce: true,
            colMenu: true,
            //width: 1200,
            //height: 200,
            //rowNum: 20,
            //height: 'auto',
            autowidth:true,
            altRows:true,
            rownumWidth: 25,
            //rowHeight: 25,
            rownumbers: true,
            viewrecords: true,
            pager: "#jqGridActividadUsuarioPager",
            onSelectRow: function (id) {
                var scope = angular.element(document.getElementById('diariasApp')).scope();
                scope.setSelectedPlanilla(id);
                scope.$apply();
            }
        });
    }
}
/*****************************************************************************************/
function initGridCodigoPostes() {
    $("#jqGridCodigoPostes").jqGrid({
        //url: '/api/genteapi/',
        //url: '/actividadesApi/GetActividades',
        //mtype: "GET",
        datatype: "local",
        colModel: [
            { label: 'ProyectoID', name: 'ProyectoID', key: true, hidden: true },
            { label: 'PosteID', name: 'PosteID', key: true, hidden: true },
            { label: 'Proyecto', name: 'CodigoProyecto', width: 200, classes: "CodigoProyecto", stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'Poste', name: 'CodigoPoste', width: 175, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'Fecha', name: 'Fecha', width: 150, search: false },
            { label: 'Cantidad Ejecutadas', name: 'CantidadEjecutadas', width: 150, search: false },
            { label: 'Cantidad Faltantes', name: 'CantidadFaltantes', width: 150, search: false },
            { label: 'Tipo Poste Descripcion', name: 'TipoPosteDescripcion', width: 200, search: false }
        ],
        loadonce: true,
        colMenu: true,
        rownumbers: true,
        altRows: true,  
        //width: 800,
        height: 200,
        rowNum: 100,
        viewrecords: true,
        pager: "#jqGridCodigoPostesPager",
        scroll: 1,
        emptyrecords: 'Sin resultados',
        onSelectRow: function () {
            var rowId = $("#jqGridCodigoPostes").jqGrid('getGridParam', 'selrow');
            var rowData = jQuery("#jqGridCodigoPostes").getRowData(rowId);
            var proyectoid = rowData['ProyectoID'];
            var posteid = rowData['PosteID'];
            var scope = angular.element(document.getElementById('diariasApp')).scope();
            scope.setSelectedPoste2(proyectoid, posteid);
            scope.$apply();
        }
    });
    $("#jqGridCodigoPostes").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    $('#jqGridCodigoPostes').navGrid('#jqGridCodigoPostesPager',
            {
                refresh: true, view: true, position: "left", cloneToTop: false, search: true, add: false,
                edit: false, del: false
            }, {}, {}, {},
            { multipleSeatch: true, nultipleGrup: true });
}
/*****************************************************************************************/

/*****************************************************************************************/
function initGridCodigoActividades() {
    $("#jqGridCodigoActividades").jqGrid({
        //url: '/actividadesApi/GetActividades',
        //mtype: "GET",                                         
        datatype: "local",
        //colNames: ['ProyectoID', 'CodigoProyecto', 'UniCons', 'DescripcionActividad', 'ActividadPrimaria', 'ActividadSecundaria', 'ActividadSGT'],
        colModel: [

            { label: 'ProyectoID', name: 'ProyectoID', hidden: true },
            { label: 'Codigo Proyecto', name: 'CodigoProyecto', index: 'CodigoProyecto', key: false, width: 150, frozen: true, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            //{ label: 'Poste', name: 'CodigoPoste', width: 65, search: false },
            { label: 'UniCons', name: 'UniCons', key:true,  width: 140, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 200 },
            { label: 'Actividad Primaria', name: 'ActividadPrimaria', width: 180, search: false },
            { label: 'Actividad Secundaria', name: 'ActividadSecundaria', width: 170, search: false },
            { label: 'Actividad SGT', name: 'ActividadSGT', width: 180, search: false },
            //{ label: 'Cantidad', name: 'Cantidad', width: 100, aling: 'center', search: false, search: false },
            //{ label: 'Ficha', name: 'CodigoFicha', width: 100 },
            //{ label: 'Contratista', name: 'CodigoContratista', width: 100, search: false },
            //{ label: 'Hasta', name: 'Hasta', width: 75, search: false },
            //{ label: 'Fecha', name: 'Fecha', width: 90, search: false },
        ],
        //shrinkToFit: true,
        //loadonce: true,
        colMenu: true,
        scrollPopUp: true,
        //forceFit: true,
        //AutoWidth: true,
        //scrollLeftOffset: "90%",
        //width: 800,
        rownumbers: true,
        altRows: true,
        height: 160,
        rowNum: 100,
        viewrecords: true,
        scroll: 1,
        emptyrecords: 'Sin resultados',
        pager: "#jqGridCodigoActividadesPager",
        //onSelectRow: function (id) {
        //    //alert(id);
        //    var scope = angular.element(document.getElementById('diariasApp')).scope();
        //    scope.setSelectedUnicons(id);
        //    scope.$apply();
        //    // $(this).jqGrid('viewGridRow', id);
        //}
    });
    //$("#jqGridCodigoActividades").jqGrid("setFrozenColumns");
    $("#jqGridCodigoActividades").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    $('#jqGridCodigoActividades').navGrid('#jqGridCodigoActividadesPager',
            {
                refresh: true, view: true, position: "left", cloneToTop: false, search: true, add: false,
                edit: false, del: false
            }, {}, {}, {},
            { multipleSeatch:true, nultipleGrup: true});

}
//var timer4;
//$("#search_cells").on("keyup", function () {
//    var self = this;
//    if (timer4) { clearTimeout(timer4); }
//    timer4 = setTimeout(function () {
//        //timer = null;
//        $("#jqGridCodigoActividades").jqGrid('filterInput', self.value);
//    }, 2);
//});
/*****************************************************************************************/
