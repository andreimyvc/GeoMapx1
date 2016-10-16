
/*****************************************************************************************/
function initGridCodigoActividades() {
    $("#jqGridCodigoActividades").jqGrid({                                       
        datatype: "local",
        colModel: [
            { label: 'ActividadID', name: 'ActividadID', key:true, hidden: true },
            { label: 'Codigo Proyecto', name: 'CodigoProyecto', index: 'CodigoProyecto', key: false, width: 150, frozen: true, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'UniCons', name: 'UniCons', width: 140, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 200 },
            { label: 'Actividad Primaria', name: 'ActividadPrimaria', width: 180, search: false },
            { label: 'Actividad Secundaria', name: 'ActividadSecundaria', width: 170, search: false },
            { label: 'Actividad SGT', name: 'ActividadSGT', width: 180, search: false },
            { label: 'Cantidad', name: 'Cantidad', width: 100, aling: 'center', search: false, search: false },
            { label: 'Precio/u', name: 'PrecioUnitario', width: 100, search: false },
            { label: 'Fecha', name: 'Fecha', width: 90, search: false },
        ],
        colMenu: true,
        scrollPopUp: true,
        rownumbers: true,
        altRows: true,
        height: 160,
        rowNum: 100,
        viewrecords: true,
        scroll: 1,
        emptyrecords: 'Sin resultados',
        pager: "#jqGridCodigoActividadesPager",
        onSelectRow: function (id) {
            //alert(id);
            var scope = angular.element(document.getElementById('uniconsApp')).scope();
            scope.setSelectedUnicons(id);
            scope.$apply();
        }
    });
    $("#jqGridCodigoActividades").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    $('#jqGridCodigoActividades').navGrid('#jqGridCodigoActividadesPager',
            {
                refresh: true, view: true, position: "left", cloneToTop: false, search: true, add: false,
                edit: false, del: false
            }, {}, {}, {},
            { multipleSeatch:true, nultipleGrup: true});

}