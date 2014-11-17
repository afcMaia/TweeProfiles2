var map;
var microclusters;
var clusters;
var mcmarkers;
var cmarkers;
var places;
var teste = 40;
var viz = 0;
var clust = 0;

function initialize()
{
	// L.mapbox.accessToken = 'pk.eyJ1IjoiaW5zb21uaWFjeSIsImEiOiJVNmZuaUZzIn0.-vyJcMkVt5BsoANudSHA4w';
	// var map = L.mapbox.map(document.getElementById("map"), 'examples.map-i86nkdio', {
 //        worldCopyJump: true
 //    })
 //    .setView([0, 0], 3);

 	var mapProp = {
	  center:new google.maps.LatLng(0.0, 0.0),
	  zoom:2,
	  mapTypeId:google.maps.MapTypeId.TERRAIN,
	  mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById("map"),mapProp);
}

function setMicroClusters(){
	var items = [];
	
	$.ajaxSetup({
		async: false
	});
	var url = "microclusters.php";
	$.getJSON(url, function(data){
		items = data;
	});
	microclusters = items;
	showMicroClustersMap();
}

function showMicroClustersMap(){
	var items = microclusters;
	var len = items.length;	
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
		var pos = new google.maps.LatLng(items[i].center_lat, items[i].center_lon);
		var marker = new google.maps.Marker({
			position: pos,
			icon:'dot.png',
			map:map,
			clusterid: items[i].id,
			testid: items[i].test,
			npts: items[i].n,
			nwrds: items[i].nwords,
			weight: items[i].weight,
			cradius: items[i].radius,
			lat: items[i].center_lat,
			lon: items[i].center_lon,
			hou: items[i].center_hou,
			wkd: items[i].center_wkd,
			cdate: items[i].creation_d,
			ldate: items[i].lastedit_d
		});
	 
		mcmarkers.push(marker);
		// google.maps.event.addListener(marker, 'load', function() {
  //   		showInfo(this);
		// 	showMicroClusterCloud(this.clusterid,this.testid);
  // 		});		
	}
}

function getPlaces()
{
    var items = [];
	$.ajaxSetup({
		async: false
	});
	var url = "places.php";
	console.log( "Ola" );
	$.getJSON(url, function(data){
		console.log( data );
		items = data;
	})
	.fail(function() {
    console.log( "error" );
  	});

	places=items;
	showPlaces();
}

function showPlaces(){
	// L.marker(0, 0).addTo(map);

			var myLatlng = new google.maps.LatLng(0,0);

		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!'
  			});

	var items = places;
	var len = items.length;
	console.log(len);
	cmarkers = [];
	// for(var i = 0; i < len; i++){
	// 	L.marker(items[i].lat, items[i].lat).addTo(map);
	// }
		for(var i = 0; i < len; i++){
			
		// var myLatlng = new google.maps.LatLng(items[i].lat,items[i].lon);
		var myLatlng = new google.maps.LatLng(items[i].lat,items[i].lon);

		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!'
  			});

		
	}
	// google.maps.event.addListener(marker, 'load', initialize);
}

$(document).ready(function(){
	initialize();
	getPlaces();
	setMicroClusters();
	for(var i = 0; i < cmarkers.length; i++){
		cmarkers[i].setMap(null);
	}
});
