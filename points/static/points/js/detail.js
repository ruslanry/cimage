	var map=null;
	
	window.onload = function () {
		(document.getElementById('title')).value=point_name;
		(document.getElementById('wikifoto')).src=point_image_link;
	};
	
	function loadMaps() {
		var myLatLng = {lat: point_lat, lng: point_lon};
		var mainMap=document.getElementById('editMap');
		var myOptions = {
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			center: myLatLng,
			zoom: 18,
		};
		map = new google.maps.Map(mainMap,myOptions);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: point_name
        });
	}
	
	function goBack(){
		if (window.opener==null){
			window.location = "/";
		}else{
			window.close();
		}
	}

	function showCoord(){
		//testBack();
	}
	function goSave(){
		goBack();
	}
	function goCancel(){
		goBack();
	}
	function goWiki(){
		//goBack();
	}
