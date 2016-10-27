
function prebuildUndo(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().prebuildUndo(prebuildid);
}

function sendPrebuild(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().model.PreBuildID = prebuildid;
}
function jqgridDeleteRow(gridid, rowId, data, callback) {
    try {             
    $(gridid).jqGrid('delRowData', rowId);

    } catch (e) {
        alert(e);
    }
    if (callback) {
        callback(data);
    }
}
function jqgridGetEdeitingCellValue(gridid, cellId) {
    var rowId = $(gridid).jqGrid('getGridParam', 'selrow');
    var cell = $('#' + rowId + '_' + cellId);
    var val = cell.val();
    return val;
}
function jqgridGetSelectRowValue(gridid)
{
    var rowId = $(gridid).jqGrid('getGridParam', 'selrow');
    return $(gridid).getRowData(rowId);
}
function jqgridGetSelectRowColumnValue(gridid,columName)
{
    var rowId = $(gridid).jqGrid('getGridParam', 'selrow');
    var rowData= $(gridid).getRowData(rowId);
    return rowData[columName];
}
function jqgridAddRowData(gridid, index, payload, callback) {
    $(gridid).jqGrid('addRowData', index, payload.data, "first");
    if (callback) {
        callback(payload);
    }
}
function jqgridAddRowDataLast(gridid, index, payload, callback) {
    $(gridid).jqGrid('addRowData', index, payload.data, "last");
    if (callback) {
        callback(payload);
    }
}
function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}