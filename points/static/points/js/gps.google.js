function Coordinate() {
    latWGS84 = 0;
    lngWGS84 = 0;
    latWGS84Sec = '';
    lngWGS84Sec = '';
    latWeb = 0;
    lngWeb = 0;
    this.gMap=null;

    function WGS84toWeb(coord){
        /*  WGS84 to Google: Минуты и десятичные доли минут делить на 60
         64°52, 378' - 52,378 / 60 = 0.87297 а целая часть градуса остается какая и была . Результат : 64,87297  */

        var reg = new RegExp("([ 01]{1}\\d{2})° (\\d{2})\\.(\\d{3})`([sewnSEWN])", "g");
        var myArray = reg.exec(coord);
        if (myArray!=null) {
            var i = 'sSwW'.indexOf(myArray[4], 0 ); // returns -1
            var minus= (i >= 0) ? -1 : 1;
            return minus*(parseFloat(myArray[1]) + parseFloat(myArray[2] + '.' + myArray[3]) / 60);
        }else{
            return null;
        }
    }

    function WebToWGS84(coord,itIsLat){
        /*  Google to WGS84: Все что после запятой умножить на 60
         64,87297 - 0,87297 * 60 = 52,378 а целая часть градуса остается какая и была .  Результат 64°52,378  */
        var minus=(coord<0);
        var raw=Math.abs(coord);

        if (itIsLat && minus) {
            var char='S';
            var first=' ';
        }else if (itIsLat && !minus) {
            var char='N';
            var first=' ';
        }else if (!itIsLat && minus) {
            var char='W';
            var first='0';
        }else if (!itIsLat && !minus) {
            var char='E';
            var first='0';
        }

        var deg=Math.floor(raw);
        var degS=deg.toFixed(0);
        if (deg<10){
            var addDeg=first+'0';
        }else if (deg<100){
            var addDeg=first;
        }else{
            var addDeg='';
        }

        var minut=Math.round((raw-deg)*60*1000)/1000;
        var minutS=minut.toFixed(3);
        if (minut<10){
            var addMin='0';
        }else{
            var addMin='';
        }

        return addDeg+degS+"° "+addMin+minutS+"`"+char;
    }
    function WebToWGS84Sec(coord,itIsLat){
        /*  Google to WGS84: Все что после запятой умножить на 60
         64,87297 - 0,87297 * 60 = 52,378 а целая часть градуса остается какая и была .  Результат 64°52,378  */
        var minus=(coord<0);
        var raw=Math.abs(coord);

        if (itIsLat && minus) {
            var char='S';
            var first=' ';
        }else if (itIsLat && !minus) {
            var char='N';
            var first=' ';
        }else if (!itIsLat && minus) {
            var char='W';
            var first='0';
        }else if (!itIsLat && !minus) {
            var char='E';
            var first='0';
        }

        var deg=Math.floor(raw);
        var degS=deg.toFixed(0);
        if (deg<10){
            var addDeg=first+'0';
        }else if (deg<100){
            var addDeg=first;
        }else{
            var addDeg='';
        }

        var minut=Math.round((raw-deg)*60*1000)/1000;
        if (minut<10){
            var addMin='0';
        }else{
            addMin='';
        }

        var second=(minut-Math.floor(minut))*60;
        var secondS=second.toFixed(3);
        second=Math.floor(second);

        if (second<10){
            var addSec='0';
        }else{
            addSec='';
        }
        minut=Math.floor(minut);
        return addDeg+degS+"° "+addMin+minut+"'"+addSec+secondS+'"'+char;
    }

    this.show = function() {
        return {
            'latWGS84':latWGS84,
            'lngWGS84':lngWGS84,
            'latWeb':latWeb,
            'lngWeb':lngWeb,
            'latWGS84Sec':latWGS84Sec,
            'lngWGS84Sec':lngWGS84Sec,
        }
    };
    this.WGS84 = function() {
        return {
            'lat':this.show().latWGS84,
            'lng':this.show().lngWGS84,
        }
    };
    this.web = function() {
        return {
            'lat':this.show().latWeb,
            'lng':this.show().lngWeb,
        }
    };
    this.setWGS = function(newLatWGS84,newLngWGS84) {
        var newLatWeb=WGS84toWeb(newLatWGS84.toUpperCase());
        var newLngWeb=WGS84toWeb(newLngWGS84.toUpperCase());
        if (newLatWeb!=null && newLatWeb!=null){
            latWGS84=newLatWGS84.toUpperCase();
            lngWGS84=newLngWGS84.toUpperCase();
            latWeb=newLatWeb;
            lngWeb=newLngWeb;
            this.gMap = new google.maps.LatLng(latWeb,lngWeb);
            return true;
        }else{
            return false;
        }
    };
    this.setWeb = function(newLatWeb,newLngWeb) {
        if (newLngWeb==undefined) {
            var lat=parseFloat(newLatWeb.lat());
            var lng=parseFloat(newLatWeb.lng());
        }else{
            lat=parseFloat(newLatWeb);
            lng=parseFloat(newLngWeb);
        }
        var newLatWGS84=WebToWGS84(lat,true);
        var newLngWGS84=WebToWGS84(lng,false);
        var newLatWGS84Sec=WebToWGS84Sec(lat,true);
        var newLngWGS84Sec=WebToWGS84Sec(lng,false);
        if (newLatWGS84!=null && newLngWGS84!=null){
            latWGS84=newLatWGS84;
            lngWGS84=newLngWGS84;
            latWGS84Sec=newLatWGS84Sec;
            lngWGS84Sec=newLngWGS84Sec;
            latWeb=lat;
            lngWeb=lng;
            this.gMap = new google.maps.LatLng(latWeb,lngWeb);
            return true;
        }else{
            return false;
        }
    };
}


function getZoommmm (bounds) {
    /*
     Вычисление значения Zoom по границам
     http://habrahabr.ru/post/110460/
     */
    var width = $(".map").width();
    var height = $(".map").height();
    var dlat = Math.abs(bounds.getNorthEast().lat() - bounds.getSouthWest().lat());
    var dlon = Math.abs(bounds.getNorthEast().lng() - bounds.getSouthWest().lng());
    var max = 0;
    if (dlat > dlon) {
        max = dlat;
    } else {
        max = dlon;
    }
    var clat = Math.PI * Math.abs(bounds.getSouthWest().lat() + bounds.getNorthEast().lat()) / 360.;
    var C = 0.0000107288;
    var z0 = Math.ceil(Math.log(dlat / (C * height)) / Math.LN2);
    var z1 = Math.ceil(Math.log(dlon / (C * width * Math.cos(clat))) / Math.LN2);
    //18 – это максимальный zoom для google.maps
    return 18 - ((z1 > z0) ? z1 : z0);
}

function getPointDataAdres(geoCoder,lat,lng,callback){
    geoCoder.geocode({'location': {lat: lat, lng: lng}}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var ret={'result':0,'Country':'none','Ln':'','Loc001':'none','Loc002':'none','Loc003':'none'};
            //console.log(results);
            var maxIndex=0;
            var maxCount=results[maxIndex].address_components.length;
            for (var i=1;i<results.length; i++) {
                var types=results[i].types.toString();
                if (types.search("administrative_area_level_") != -1) {
                    if (results[i].address_components.length>maxCount){
                        maxCount=results[i].address_components.length;
                        maxIndex=i;
                    }
                }
            }
            var address_components=results[maxIndex].address_components;
            //console.log(results[maxIndex].formatted_address);
            //console.log(address_components);
            for (var i=0;i<address_components.length; i++) {
                var types=address_components[i].types.toString();
                if (types.search("administrative_area_level_") != -1) {
                    if (types.search("administrative_area_level_1") != -1) {
                        ret.Loc001=address_components[i].long_name;
                    }else
                    if (types.search("administrative_area_level_2") != -1) {
                        ret.Loc002=address_components[i].long_name;
                    }else
                    if (types.search("administrative_area_level_3") != -1) {
                        ret.Loc003 = address_components[i].long_name;
                    }
                }else
                if (types.search("country") != -1) {
                    ret.Country = address_components[i].long_name;
                    ret.Ln = address_components[i].short_name;
                    ret.result =1;
                }
            }
            callback(ret);
        } else {
            var ret={'result':-1,'msg':'Geocoder failed due to: ' + status};
            callback(ret);
        }
    });
}