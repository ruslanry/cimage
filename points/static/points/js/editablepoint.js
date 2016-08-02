function EditablePoint(langArray,elementArray,pointTypeArray,point_id,defCoord) {
    var eArray=elementArray;
    var lArray=langArray;
    var ptArray=pointTypeArray;

    this.eSQL=[];//массив ссылок SQL ID Ќа массив элементов
    this.lSQL=[];//массив ссылок SQL ID Ќа массив €зыков
    this.tSQL=[];//массив ссылок SQL ID Ќа массив типов точки

    this.elm=[];
    this.texts=[];
    this.pt=pointTypeArray;
    this.media=[];
    this.mainFoto='';
    createElements(this.elm,this.eSQL);
    createTexts(this.texts,this.elm,this.lSQL);
    createTSQL(this.tSQL);

    this.id=point_id;
    this.coord=new Coordinate();//координаты
    this.indexType = 0;//индекс в массиве типа точки
    this.indexLang = 0;//индекс в массиве €зыков

    this.currentPointType=this.pt[this.indexType];
    this.currentLangData=this.texts[this.indexLang];

    this.ch='';//'ch';
    this.cl='';//'cl';

    this.country='';//'country';
    this.region='';//'region';
    this.area='';//'area';
    this.mesto='';//'mesto';

    this.ready = (point_id == 0);
    this.coord.setWeb(defCoord.lat,defCoord.lng);

    function createTSQL(tSQL){
        var tSQLindex=0;
        for(var i=0;i<ptArray.length;i++){
            tSQL[parseInt(ptArray[i]._id)]=tSQLindex;
            tSQLindex++;
        }
    }
    function createElements(elm,eSQL){
        var eSQLindex=0;
        for(var i=0;i<eArray.length;i++){
            var newElement={};
            newElement['idElement']=parseInt(eArray[i]._id);
            newElement['idThis']=0;
            newElement['state']=0;
            elm.push(newElement);
            eSQL[parseInt(eArray[i]._id)]=eSQLindex;
            eSQLindex++;
        }
    }
    function createTexts(texts,elm,lSQL){
        var lSQLindex=0;
        for(var i=0;i<lArray.length;i++){
            var newLang={};
            newLang['idLang']=parseInt(lArray[i]._id);
            newLang['short']=lArray[i].short;
            newLang['title']='';//newLang['short']+' : title';
            newLang['prim']='';//newLang['short']+' : prim';
            newLang['primsaf']='';//newLang['short']+' : primsaf';

            newLang['elements']=[];
            for(var n=0;n<elm.length;n++){
                newLang['elements'].push({'comment':''});//newLang['short']+' : comment 0' + n}); //
            }
            texts.push(newLang);
            lSQL[parseInt(lArray[i]._id)]=lSQLindex;
            lSQLindex++;
        }
    }

    this.getJSONData = function(){
        var ret={
            "action":"savedata",
            "_id":this.id,
            "idPointType":parseInt(ptArray[this.indexType]._id),
            "ch":this.ch,
            "cl":this.cl,

            "mainfoto":this.mainFoto,

            "latwgs":this.coord.show().latWGS84,
            "lngwgs":this.coord.show().lngWGS84,
            "latweb":this.coord.show().latWeb,
            "lngweb":this.coord.show().lngWeb,

            "country":this.country,
            "region":this.region,
            "area":this.area,
            "mesto":this.mesto,

            "texts":this.texts,
            "elements":this.elm,
            "media":this.media,
        };
        return $.toJSON(ret);
    };

    this.setPointType = function(point,newIndexType){
        if (point.pt[newIndexType]!=null){
            point.indexType=newIndexType;
            point.currentPointType=point.pt[point.indexType];
            return true;
        }else{
            return false;
        }
    };
    this.setLang = function(point,newIndexLang){
        if (point.texts[newIndexLang]!=null){
            point.indexLang=newIndexLang;
            point.currentLangData=point.texts[point.indexLang];
            return true;
        }else{
            return false;
        }
    };

    this.setLoadedLangData = function(point,lData){
        var oIndex=point.indexLang;
        for(var i=0;i<lData.length;i++){
            point.setLang(point,point.lSQL[parseInt(lData[i].lang_id)]);
            point.currentLangData.title=lData[i].title;
            point.currentLangData.prim=lData[i].prim;
            point.currentLangData.primsaf=lData[i].primsaf;
        }
        point.setLang(point,oIndex);
    };
    this.setLoadedElementData = function(point,eData){
        var oIndex=point.indexLang;
        for(var i=0;i<eData.length;i++){
            var langIndex=point.lSQL[parseInt(eData[i].lang_id)];
            var elementIndex=point.eSQL[parseInt(eData[i].element_id)];
            if (point.indexLang!=langIndex){
                point.setLang(point,point.lSQL[parseInt(eData[i].lang_id)]);
            }
            point.currentLangData.elements[elementIndex].comment=eData[i].comment;
            point.elm[elementIndex].idThis=eData[i]._id;
            point.elm[elementIndex].state=parseInt(eData[i].state);
        }
        point.setLang(point,oIndex);
    };
    this.setLoadedMediaData = function(point,mData){
        point.media=[];
        for(var i=0;i<mData.length;i++){
            var newMediaObj={};
            switch (parseInt(mData[i].type)){
                case 0:
                    newMediaObj['id']=parseInt(mData[i]._id);
                    newMediaObj['filename']=mData[i].filename;
                    newMediaObj['path']=pathFoto+mData[i].filename;
                    newMediaObj['preview']=pathFotoTHMB+mData[i].filename;
                    newMediaObj['status']=0;
                    newMediaObj['weblink']='';
                    newMediaObj['type']=0;
                    break;
                case 1:
                    newMediaObj['id']=parseInt(mData[i]._id);
                    newMediaObj['filename']=mData[i].filename;
                    newMediaObj['path']='';
                    newMediaObj['preview']='';
                    newMediaObj['status']=0;
                    newMediaObj['weblink']=''+mData[i].filename;
                    newMediaObj['type']=1;
                    break;
            }
            point.media.push(newMediaObj);
        }
    }
}