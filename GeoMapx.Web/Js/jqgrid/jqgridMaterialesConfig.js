
/*****************************************************************************************/
function initGridCodigoActividades() {
    $("#jqGridCodigoActividades").jqGrid({                                       
        datatype: "local",
        colModel: [
            { label: 'MaterialID', name: 'MaterialID', key: true, hidden: true },
            { label: 'Codigo Proyecto', name: 'CodigoProyecto', index: 'CodigoProyecto', key: false, width: 150, frozen: true, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'UniCons', name: 'UniCons', width: 140, stype: 'select', searchoptions: { sopt: ["in", "bw", "cn", "eq", "in"], value: [] } },
            { label: 'Descripcion Actividad', name: 'DescripcionActividad', width: 200 },
            { label: 'Codigo Material', name: 'CodigoMaterial', width: 180, search: true },
            { label: 'Descripcion', name: 'Descripcion', width: 180, search: true },
            { label: 'Cantidad', name: 'Cantidad', width: 100, aling: 'center', search: false, search: false },
            { label: 'Precio/u', name: 'PrecioUnitario', width: 100, search: false },
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
            var scope = angular.element(document.getElementById('materialesApp')).scope();
            scope.setSelectedMaterial(id);
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