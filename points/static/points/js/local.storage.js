function getLatlng(){
    var ret=[];
    ret.lat=36.9;
    ret.lng=28.3;
    if (supportsLocalStorage()) {
        ret.lat = isNaN(localStorage["last.maps.lat"])?ret.lat:parseFloat(localStorage["last.maps.lat"]);
        ret.lng = isNaN(localStorage["last.maps.lng"])?ret.lng:parseFloat(localStorage["last.maps.lng"]);
    }
    return ret;
}

function setLatlng(save){
    if (!supportsLocalStorage()) { return false; }
    localStorage["last.maps.lat"] = save.lat();
    localStorage["last.maps.lng"] = save.lng();
    return true;
}
function supportsLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function getZoom(){
    if (!supportsLocalStorage()) {return 8; }
    return isNaN(localStorage["last.maps.zoom"])?8:parseInt(localStorage["last.maps.zoom"]);
}
function setZoom(zoom){
    if (!supportsLocalStorage()) { return false; }
    localStorage["last.maps.zoom"] = zoom;
    return true;
}

function getLatlngOld(){
    var coord = new Coordinate();
    var lat=36.9;
    var lng=28.3;
    if (supportsLocalStorage()) {
        lat = isNaN(localStorage["last.maps.lat"])?lat:parseFloat(localStorage["last.maps.lat"]);
        lng = isNaN(localStorage["last.maps.lng"])?lng:parseFloat(localStorage["last.maps.lng"]);
    }
    coord.setWeb(lat,lng);
    return coord;
}
