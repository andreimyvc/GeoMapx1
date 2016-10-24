
function prebuildUndo(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().prebuildUndo(prebuildid);
}

function sendPrebuild(prebuildid) {
    angular.element(document.getElementById('diariasprebuildApp')).scope().model.PrebuildID = prebuildid;
}