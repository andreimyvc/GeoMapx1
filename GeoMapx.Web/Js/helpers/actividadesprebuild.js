
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
function jqgridAddRowData(gridid, index, payload, callback) {
    $(gridid).jqGrid('addRowData', index, payload.data, "first");
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