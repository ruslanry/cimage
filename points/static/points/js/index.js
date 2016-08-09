	var map=null;
	var showCluster=true;
	var markers=[];
	var simpleClusterStyles={
		textColor: 'black',
		url: clusterIcon,
		height: 37,
		width: 32,
		textsize: 20,
	}

	var clusterStyles = [
		simpleClusterStyles,
		simpleClusterStyles,
		simpleClusterStyles,
	];
	function loadMaps() {
		var myLatLng = {lat: 60.000, lng: 50.000};
		var mainMap=document.getElementById('mainMap');
		var myOptions = {
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			center: myLatLng,
			zoom: 5,
		};
		map = new google.maps.Map(mainMap,myOptions);
		loadPointList();
	}
	
	function loadPointList(){
		$.ajax({
			url:jsonUrl
			, success: function(result) {
				createPointArray(result);
			}
		});
	}
	function createPointArray(pointData){
	    markers=[];
		pointArray=pointData;
		for(var i=0;i<pointArray.length;i++){
			pointArray[i].marker = new google.maps.Marker({
				position: {lat: parseFloat(pointArray[i].point_lat), lng: parseFloat(pointArray[i].point_lon)},
				map: null,
				title:pointArray[i].point_name,
				draggable: false,
				icon: defaultIcon,
				
			});
			pointArray[i].marker.addListener('click', function() {
				markerIndex=parseInt(this.arrayId);
				id=pointArray[markerIndex].id;
				console.log(detailUrl);
				window.open(id,"editpoint");
			});
			pointArray[i].marker.arrayId=i;
			if (showCluster){
				markers.push(pointArray[i].marker);
			}else{
				pointArray[i].marker.setMap(map);
			}
		}
		if (showCluster){
			clusterer = new MarkerClusterer(map, markers, {
				gridSize: 50,
				styles: clusterStyles,
				maxZoom: 14
			});
		}
	}
	