var youTubeEmbedPath="https://www.youtube.com/embed/";

//----[ id ]--------------------------
var mainMap=null;

var lat=null;
var lng=null;
var latg=null;
var lngg=null;

//----[ vars ]------------------------
var map=null;
var marker=null;
var geocoder=null;
var geoTimerID=null;
//[***PHP***] pointTypeArray=null;  //массив типов точки
//[***PHP***] langArray=null;  //массив языков
//[***PHP***] elementArray=null;  //массив элементов

//----[ данные о точке ]--------------
//[***PHP***] point_id =0;       //SQL id точки
var point=null;

//----[ данные о точке ]--------------
window.onload = function () {
    initVars();
    initInputs();
    $('#waitModal').modal();
    loadAPI();
};

function loadAPI(){
    var script = document.createElement("script");
    //script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbdc-13UQEPmfWDUns1JRjkIzptMtoGqg&callback=loadMaps";
//    script.src = "https://maps.googleapis.com/maps/api/js?sensor=true&v=3&key=AIzaSyCbdc-13UQEPmfWDUns1JRjkIzptMtoGqg&callback=loadMaps";
    script.src = "https://maps.googleapis.com/maps/api/js?sensor=true&v=3&callback=loadMaps";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}
function loadMaps() {
    geocoder= new google.maps.Geocoder;
    point=new EditablePoint(langArray,elementArray,pointTypeArray,point_id,getLatlng());
    startInterface();
}
function startInterface(){
    if (mainMap==null) {initMap();}
    showCurrentLangData();
    showCurrentData();
    showMedia();
    $('#waitModal').modal('hide');
}
//---------[ Load\Save Data ]-------------------------------------------------------------------------------------------[ Load\Save Data ]------------------------
function setPointData(data){
    //console.log(data);
    var sData=data.staticData[0];
    var lData=data.langData;
    var eData=data.elementData;
    var mData=data.mediaData;

    point.coord.setWGS(sData.latwgs,sData.lngwgs);
    setNewType(point.tSQL[sData.pt]);
    if (map!=null) {setMarker();}

    point.mainFoto=sData.mainfoto;

    point.setLoadedLangData(point,lData);
    point.setLoadedElementData(point,eData);
    point.setLoadedMediaData(point,mData);
    point.ready=true;
}
//---------[ Coordinates ]-------------------------------------------------------------------------------------------[ Coordinates ]------------------------
function initMap(){
    mainMap = document.getElementById('editMap');
    myOptions = {
        zoom: getZoom(),
        center: point.coord.gMap,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(mainMap, myOptions);
    map.addListener('center_changed', function(e) {
        setLatlng(map.getCenter());
    });

    map.addListener('zoom_changed', function(e) {
        setZoom(map.getZoom());
    });

    map.addListener('click', function(e) {
        point.coord.setWeb(e.latLng);
        showCoordinates();
        setMarker();
    });
    setMarker();
}
function findMe(){
    if(geo_position_js.init()){
        geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
    }else{
        alert("Functionality not available");
    }

    function success_callback(p){
        point.coord.setWeb(p.coords.latitude,p.coords.longitude);
        showCoordinates();
        setMarker();
    }

    function error_callback(p){
        alert('error='+p.message);
    }

}
function getGeoDataLather(){
    clearPointGeoData();
    var delay=800;
    if (geoTimerID!=null){
        clearTimeout(geoTimerID);
    }
    geoTimerID=setTimeout(function() {
        getGeoData();
        clearTimeout(geoTimerID);
        geoTimerID=null;
    }, delay);
}
function getGeoData(){
    getPointDataAdres(geocoder,point.coord.web().lat,point.coord.web().lng,function (result) {
        if (result.result==1){
            flag.src='img/country/'+result.Ln+'.png';
            country.value=result.Country;
            region.value=result.Loc001;
            area.value=result.Loc002;
            mesto.value=result.Loc003;
        }else{
            clearPointGeoData();
        }
    });
}
function clearPointGeoData(){
    flag.src='img/country/_unknown.png';
    country.value='';
    region.value='';
    area.value='';
    mesto.value='';
}
function showCoordinates(){
    lat.value=point.coord.show().latWGS84;
    lng.value=point.coord.show().lngWGS84;
    latg.value=point.coord.show().latWeb;
    lngg.value=point.coord.show().lngWeb;
}
function setMarker(){
    if (marker==null){
        marker = new google.maps.Marker({
            position: point.coord.gMap,
            map: map,
            //title:"Hello World!",
            draggable: true,
        });
        marker.addListener('position_changed', function(e) {
            point.coord.setWeb(marker.getPosition());
            showCoordinates();
            getGeoDataLather();
        });
    }
    marker.setPosition(point.coord.gMap);
    map.panTo(point.coord.gMap);
}
function showCoord(){
    if (point.coord.setWGS(lat.value,lng.value)){
        showCoordinates();
        setMarker();
    }else{
        showError('уккщк сщщквштфеуы');
    }
}
//---------[ Foto\Video ]---------------------------------------------------------------------------------------------------[ Foto\Video ]----------------
function addFoto(obj){
    var newMediaObj={};
    newMediaObj['id']=0;
    newMediaObj['filename']=obj.filename;
    newMediaObj['path']=obj.path;
    newMediaObj['preview']=obj.preview;
    newMediaObj['status']=1;
    newMediaObj['weblink']='';
    newMediaObj['type']=0;
    point.media.push(newMediaObj);
    showMedia();
}
function addYouTube(){
    var link = document.getElementById('linkYouTube');
    if (link==null || link.value==''){return;}
    var lnk=getYouTubeLink(link.value);
    if (lnk.filename==''){return;}
    link.value='';
    //<iframe width="213" height="160" src="https://www.youtube.com/embed/0I3Pq0yp6Z8" frameborder="0" allowfullscreen></iframe>

    var newMediaObj={};
    newMediaObj['id']=0;
    newMediaObj['filename']=lnk.filename;
    newMediaObj['path']='';
    newMediaObj['preview']='';
    newMediaObj['status']=1;
    newMediaObj['weblink']=lnk.link;
    newMediaObj['type']=1;
    point.media.push(newMediaObj);
    showMedia();
}
function showMedia(){
    var dz=document.getElementById("dz");
    dz.innerHTML="";
    for(var i=0;i<point.media.length;i++){
        switch (point.media[i].type){
            case 0:var tMedia=document.createElement('img');
                tMedia.src = '.'+point.media[i].preview;
                break;
            case 1:tMedia = document.createElement('iframe');
                tMedia.src = youTubeEmbedPath+point.media[i].weblink;
                tMedia.setAttribute('width', '213');
                tMedia.setAttribute('height', '160');
                tMedia.setAttribute('frameborder', '0');
                tMedia.setAttribute('allowfullscreen', '');
                break;
            default:tMedia=document.createElement('img');
                tMedia.src = '.'+point.media[i].preview;
                break;
        }
        $(tMedia).addClass("pointmedia");
        if (point.media[i].type==0){
            if (point.mainFoto==point.media[i].filename){
                var setMain='<button type="button" onclick="setMainFooto(event);" class="btn btn-success btn-xs setmainmedia"><i class="glyphicon glyphicon glyphicon-star"></i></button>';
            }else{
                setMain='<button type="button" onclick="setMainFooto(event);" class="btn btn-info btn-xs setmainmedia"><i class="glyphicon glyphicon glyphicon-star-empty"></i></button>';
            }
        }else{
            setMain='';
        }

        switch (point.media[i].status){
            case 1:$(tMedia).addClass("added");break;
            case -1:$(tMedia).addClass("todel");break;
        }
        var newContainer= document.createElement('div');
        newContainer.setAttribute('data-array', i);
        newContainer.className = "loadedcontainer";
        newContainer.appendChild(tMedia);
        newContainer.innerHTML=newContainer.innerHTML+setMain+'<button type="button" onclick="markToDel(event);" class="btn btn-danger btn-xs delmedia"><i class="glyphicon glyphicon-trash"></i></button><button type="button" onclick="unmarkToDel(event);" class="btn btn-success btn-xs backmedia hide"><i class="glyphicon glyphicon-repeat"></i></button>';
        dz.appendChild(newContainer);
    }
}

//---------[ Menu Interface ]---------------------------------------------------------------------------------------------------[ Menu Interface ]----------------
function selectType(e){
    var evn = e || event;
    var a = evn.target;
    var newIndexType=parseInt(a.getAttribute('data-array'));
    setNewType(newIndexType);
}
function selectApLang(e){
    var evn = e || event;
    var newLangIndex=parseInt(evn.getAttribute('data-array'));
    setNewLang(newLangIndex);
}
function chElementState(e){
    if (point==null || point.elm==null){return;}
    var evn = e || event;
    var a = evn.target;
    var elementId=parseInt(a.getAttribute('data-id'));
    var ce=document.getElementById('eState'+ elementId.toString());
    $(ce).removeClass("falseElement");
    $(ce).removeClass("trueElement");
    point.elm[elementId].state=(point.elm[elementId].state>0)?-1:point.elm[elementId].state=point.elm[elementId].state+1;
    switch (point.elm[elementId].state)  {
        case -1:$(ce).addClass("falseElement");break;
        case 1:$(ce).addClass("trueElement");break;
    }
}
//---------[ etc ]---------------------------------------------------------------------------------------------------[ etc ]--------------------------
function initVars(){
    lat = document.getElementById('lat');
    lng = document.getElementById('lng');
    latg = document.getElementById('latg');
    lngg = document.getElementById('lngg');
    flag = document.getElementById('flag');
    country = document.getElementById('country');
    region = document.getElementById('region');
    area = document.getElementById('area');
    mesto = document.getElementById('mesto');
}
function initInputs(){
    autosize($('textarea'));

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    jQuery(function($){                                         //http://digitalbush.com/projects/masked-input-plugin/
        $.mask.definitions['<']='[NSns]';
        $.mask.definitions['>']='[EWew]';
        $.mask.definitions['~']='[10]';
        $("#lat").mask(" 99° 99.999`<",{placeholder:" 00° 00.000`N"});
        $("#lng").mask("~99° 99.999`>",{placeholder:"000° 00.000`E"});
    });

}
//---------[ get\set ]---------------------------------------------------------------------------------------------------[ get\set ]--------------------------
function showCurrentLangData(){
    document.getElementById('title').value=point.currentLangData.title;
    document.getElementById('prim').value=point.currentLangData.prim;
    document.getElementById('primsaf').value=point.currentLangData.primsaf;
    autosize.update(document.getElementById('primsaf'));
    autosize.update(document.getElementById('prim'));
    for(var i=0;i<point.currentLangData.elements.length;i++){
        document.getElementById('eText'+ i.toString()).value=point.currentLangData.elements[i].comment;
    }
}
function setCurrentLangData() {
    if (point.currentLangData==null){
        return false;
    }else {
        point.currentLangData.title = document.getElementById('title').value;
        point.currentLangData.prim = document.getElementById('prim').value;
        point.currentLangData.primsaf = document.getElementById('primsaf').value;
        for (var i = 0; i < point.currentLangData.elements.length; i++) {
            point.currentLangData.elements[i].comment = document.getElementById('eText' + i.toString()).value;
        }
        return true;
    }
}
function showCurrentData(){
    document.getElementById('ch').value=point.ch;
    document.getElementById('cl').value=point.cl;
    document.getElementById('country').value=point.country;
    document.getElementById('region').value=point.region;
    document.getElementById('area').value=point.area;
    document.getElementById('mesto').value=point.mesto;
    setNewType(point.indexType);
    for(var i=0;i<point.currentLangData.elements.length;i++){
        var ce=document.getElementById('eState'+ i.toString());
        $(ce).removeClass("falseElement");
        $(ce).removeClass("trueElement");
        switch (point.elm[i].state)  {
            case -1:$(ce).addClass("falseElement");break;
            case 1:$(ce).addClass("trueElement");break;
        }
    }
}
function setCurrentData(){
    point.ch=document.getElementById('ch').value;
    point.cl=document.getElementById('cl').value;
    point.country=document.getElementById('country').value;
    point.region=document.getElementById('region').value;
    point.area=document.getElementById('area').value;
    point.mesto=document.getElementById('mesto').value;
}
function setNewType(newIndexType){
    if (point.setPointType(point,newIndexType)){
        var activeList=$(document.getElementById('type_menu')).children();
        for(var i=0;i<activeList.length;i++){
            $(activeList[i]).removeClass("active");
        }
        $(activeList[point.indexType]).addClass("active");
        document.getElementById('type').innerHTML=point.currentPointType.name;
        if (marker){marker.setIcon(pathTypePoint+point.currentPointType.img);}
    }
}
function setNewLang(newLangIndex){
    if (setCurrentLangData() && point.setLang(point,newLangIndex)) {
        showCurrentLangData();

        var activeList=$(menu_ap_lang).children();
        for(var i=0;i<activeList.length;i++){
            $(activeList[i]).removeClass("active");
        }
        $(activeList[newLangIndex]).addClass("active");
    }
}
//---------[ Bottons ]---------------------------------------------------------------------------------------------------[ Bottons ]--------------------------
function testSave(){
    setCurrentLangData();
    setCurrentData();
    saveData();
}
function testBack(){
    if (window.opener==null){
        window.location = "index.php";
    }else{
        window.close();
    }
}
function testCancel(){
    if (point_id==0){
        window.location = "editpoint.php";
    }else{
        $('#waitModal').modal();
        loadData();
    }
}

//---------[ unsorted ]---------------------------------------------------------------------------------------------------[ unsorted ]--------------------------

