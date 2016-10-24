
function prebuildUndo(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().prebuildUndo(prebuildid);
}

function sendPrebuild(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().model.PreBuildID = prebuildid;
}
function jqgridDeleteRow(gridid,rowId, data, callback) {
    $(gridid).jqGrid('delRowData', rowId);
    callback(data);
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