var map, pointarray, heatmap;
var microclusters;
var clusters;
var mcmarkers;
var cmarkers = [];
var places;
var initial = 0;
var viz = 0;
var start = 0;
var clust = 0;
var nverbetes = 0;
var infos = [];
var people = [];
var peopleNames = [];
function initialize()
{
	// L.mapbox.accessToken = 'pk.eyJ1IjoiaW5zb21uaWFjeSIsImEiOiJVNmZuaUZzIn0.-vyJcMkVt5BsoANudSHA4w';
	// var map = L.mapbox.map(document.getElementById("map"), 'examples.map-i86nkdio', {
 //        worldCopyJump: true
 //    })
 //    .setView([0, 0], 3);
  // cartodb.createVis('map', 'http://mayurilive.cartodb.com/api/v2/viz/994b9f1c-69b0-11e4-b2dd-0e853d047bba/viz.json');
 	var mapProp = {
	  center:new google.maps.LatLng(0.0, 0.0),
	  zoom:2,
	  mapTypeId: google.maps.MapTypeId.HYBRID,
	  mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById("map"),mapProp);

// 	map = L.map('map').setView([0, -0.09], 3);

// 	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
}

//funcçao de inicializaçao de todos os clusters
function setClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensao temporal
function setTimeClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensap espacial
function setSpaceClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensao do conteudo
function setContentClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes temporais e espaciais
function setTimeSpaceClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes espaciais e conteudo
function setSpaceContentClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes temporais e conteudo
function setContentTimeClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

function setMicroClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        showMicroClustersMap(items, t);
		        // //loadTimeline(items);
		        // showClustersGraph(items);
         }, 'JSON');
}

//funcçao de visualizaçao de microClusters
function showMicroClustersMap(items, t){
	if(t == 0){
	var len = items.length;
	
	if(len > 300){
		len = 300;
	}

	mcmarkers = [];
	//alert(items.len);

	for(var i = 0; i < len; i++){
		// var marker = L.marker([items[i].center_lon, items[i].center_lat]).addTo(map);
		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		// cityCircle = new google.maps.Circle({
		// 	clusterid: items[i].id,
		// 	testid: items[i].test,
		// 	strokeColor: '#000000',
		// 	strokeOpacity: 0.15,
		// 	strokeWeight: 0.75,
		// 	fillColor: '#4099FF',
		// 	fillOpacity: 0.15,
		// 	map: map,
		// 	center: pos,
		// 	radius: items[i].nwords * 5000
		// 	});
		// var words = [];
	       
		//     $.getJSON( 
	 //        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
	 //         {},
	 //         function(data) { 
	 //            	words=data;
	 //            	// showMicroClusterCloud(words);
	 //    }, 'JSON');

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
	}
	// google.maps.event.addListener(marker, 'load', function() {
	// setMicroClusterCloud();
	// });
	} else{

	var len = items.length;
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
		if(items[i].center_wkd == t){
			var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
			var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
		}
		
	}

	}
	console.log("microclusters:", mcmarkers.length);
	
}

//funcçao de visualizaçao de todos os clusters
function showClustersMap(items, t){
if(t == 0){
var len = items.length;	
	cmarkers = [];
	for(var i = 0; i < len; i++){
		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
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
			ldate: items[i].lastedit_d,
			clickable:true
		});

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
				setTheseMicroClusters(this.testid);
  		});
	}
}else{
	var len = items.length;	
	cmarkers = [];
	for(var i = 0; i < len; i++){
		if(items[i].center_wkd == t){
		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
				setTheseMicroClusters(this.testid);
  		});
	}
	}
}
	console.log("clusters", cmarkers.length);
	setClusterCloud();
}

//funcçao de inicializaçao dos microClusters relativos a um dado Cluster
function setTheseMicroClusters(testid){
		var items = [];
		var type = 0;

		if(document.getElementById("radio_allDimensions").checked){ 
			type = 1;
		}
		else if(document.getElementById("radio_timeDimension").checked){
			type = 2;
		}
		else if(document.getElementById("radio_spaceDimension").checked){ 
			type = 3;
		}
		else if(document.getElementById("radio_contentDimension").checked){ 
			type = 4;
		}
		else if(document.getElementById("radio_timespaceDimension").checked){ 
			type = 5;
		}
		else if(document.getElementById("radio_spacecontentDimension").checked){ 
			type = 6;
		}
		else if(document.getElementById("radio_contenttimeDimension").checked){ 
			type = 7;
		}

		for (var i = 0; i < mcmarkers.length; i++ ) {
		mcmarkers[i].setMap(null);
		}

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroIds/'+testid+'/'+type+'',
         {},
         function(data) { 
            	items=data;
		        setTheseMicroClusters_2(items, testid);
		        // //loadTimeline(items);
		        // showClustersGraph(items);
         }, 'JSON');
}

function setTheseMicroClusters_2(mcIds, testid){
		var items = [];
		var type = 0;

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        showTheseMicroClustersMap(items, mcIds, testid);
		        // //loadTimeline(items);
		        // showClustersGraph(items);
         }, 'JSON');
}

//funcçao de visualizaçao de micro
function showTheseMicroClustersMap(items, mcIds, testid){

	var len = items.length;
	var mcIlen = mcIds.length;

	if(mcIlen > 3000) mcIlen = 3000;
	console.log(testid);
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
		for (var j = 0; j < mcIlen; j++) {

		if(items[i].id == mcIds[j].mcIDS){
		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
	}
	}
}

	console.log("microclusters:", mcmarkers.length);
}

//funcçao de inicilizaçao da cloud para microClusters
function setMicroClusterCloud(){

	var words = [];
       
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
         {},
         function(data) { 
            	words=data;
    }, 'JSON');
}

// function showMicroClusterCloud(words){

// 	var frequency_list = [];
// 	var len = words.length;
//     //.text(function(d) { return d.word; }) // THE SOLUTION

//    	for(var i = 0; i < len; i++){
// 		    if(words[i].word != ' ' && words[i].freq > 1){
// 		    frequency_list.push({"text":words[i].word,"size":(words[i].freq*5)});
// 		}
// 	}

//     d3.layout.cloud().size([350, 300])
//             .words(frequency_list, function(d) {
//             	for(var i = 0; i < frequency_list.length; i++){
// 			    return {text: d.text, size: d.size};
// 				}
// 			  })
//             .padding(1)
//             .rotate(function() { return ~~(Math.random() * 2) * 90; })
//             .font("Impact")
//             .fontSize(function(d) { return d.size; })
//             .on("end", draw)
//             .start();
//   // ************************************

//     // d3.layout.cloud().size([300, 300])
//     //   .words([
//     //     "Hello", "world", "normally", "you", "want", "more", "words",
//     //     "than", "this"].map(function(d) {
//     //     return {text: d, size: 10 + Math.random() * 90};
//     //   }))
//     //   .padding(5)
//     //   .rotate(function() { return ~~(Math.random() * 2) * 90; })
//     //   .font("Impact")
//     //   .fontSize(function(d) { return d.size; })
//     //   .on("end", draw)
//     //   .start();
// }

//funcçao de inicilizaçao da cloud para Clusters
function setClusterCloud(){

	var words = [];
       
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
         {},
         function(data) { 
            	words=data;
            	showAllClusterCloud(words);
            	// showNews(words);
    }, 'JSON');
}

//funcçao de visualizaçao da cloud para Clusters
function showAllClusterCloud(words){

	// var frequency_list = [];
	// var len = words.length;

 //   	for(var i = 0; i < len; i++){
	// 	    if(words[i].word != ' ' && words[i].freq > 2){
	// 	    frequency_list.push({"text":words[i].word,"size":(words[i].freq*2)});
	// 	}
	// }
 //    d3.layout.cloud().size([450, 400])
 //            .words(frequency_list, function(d) {
 //            	for(var i = 0; i < frequency_list.length; i++){
	// 		    return {text: d.text, size: (d.size * d.size)};
	// 			}
	// 		  })
 //            .padding(1)
 //            .rotate(function() { return ~~(Math.random() * 2) * 90; })
 //            .font("Impact")
 //            .fontSize(function(d) { return d.size; })
 //            .on("end", draw)
 //            .start();

 // **************************

 	var len = words.length;
	var htmlcode = "";

	for(var i = 0; i < len; i++){
		if(words[i].word != ' ' && words[i].freq > 2){
		htmlcode = htmlcode+" <span data-weight='"+words[i].freq+"'>"+'<a style="color:#4099FF;" href="http://www.sapo.pt/pesquisa?q='+words[i].word+'"target="_blank">'+words[i].word+'</a>'+"</span>";
		}
	}

	$("#wordcloud").html(htmlcode);

	var settings = {
        "size" : {
            "grid" : 1,
			"factor" : 25,
			"normalize" : false
        },
        "options" : {
            "color" : "random-dark",
			"rotationRatio" : 0,
            "printMultiplier" : 5,
			"sort" : "highest"
        },
        "font" : "Impact",
        "shape" : "square"
    }
    $( "#wordcloud" ).awesomeCloud( settings );

}

//funcçao de visualizaçao da cloud para um dado Cluster
function showThisClusterCloud(id, x){
	radiobtn = document.getElementById("radio_wordcloud");
	// radiobtn.checked = false;

	if(x == 1){
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
         {},
         function(data) { 
            	words=data;

 	var len = words.length;
	var htmlcode = "";

	for(var i = 0; i < len; i++){
		if(words[i].cluster_id == id){
			// if(words[i].word != ' ' && words[i].freq > 2){
			htmlcode = htmlcode+" <span data-weight='"+words[i].freq+"'>"+'<a style="color:#4099FF;" href="http://www.sapo.pt/pesquisa?q='+words[i].word+'"target="_blank">'+words[i].word+'</a>'+"</span>";
			// }
		}
	}

	$("#wordcloud").html(htmlcode);

	var settings = {
        "size" : {
            "grid" : 1,
			"factor" : 100,
			"normalize" : false
        },
        "options" : {
            "color" : "random-dark",
			"rotationRatio" : 0,
            "printMultiplier" : 5,
			"sort" : "highest"
        },
        "font" : "Impact",
        "shape" : "square"
    }
    $( "#wordcloud" ).awesomeCloud( settings );
}, 'JSON');
	}else{
			    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
         {},
         function(data) { 
            	words=data;

 	var len = words.length;
	var htmlcode = "";

	for(var i = 0; i < len; i++){
		if(words[i].mcluster_id == id){
			// if(words[i].word != ' ' && words[i].freq > 2){
			htmlcode = htmlcode+" <span data-weight='"+words[i].freq+"'>"+words[i].word+"</span>";
			// }
		}
	}

	$("#wordcloud").html(htmlcode);

	var settings = {
        "size" : {
            "grid" : 1,
			"factor" : 100,
			"normalize" : false
        },
        "options" : {
            "color" : "random-dark",
			"rotationRatio" : 0,
            "printMultiplier" : 5,
			"sort" : "highest"
        },
        "font" : "Impact",
        "shape" : "square"
    }
    $( "#wordcloud" ).awesomeCloud( settings );
}, 'JSON');

	}
}

//funcçao de visualizaçao do grafico para todos Clusters
function showClustersGraph(items){
	var len = items.length;	
	
	var arr = [];
	$("#timetable").empty();
//****************************
// 	for(var i = 0; i < len; i++){
// 		arr.push([parseInt(items[i].center_wkd), parseInt(items[i].center_hou), parseInt(items[i].n)]); //items[i].id.toString()]);
// 	}
//         for(var i = 0; i < len; i++){

//     	$('#timetable').highcharts({

//         chart: {
//             type: 'bubble',
//             zoomType: 'xy'
//         },
//         title: {
//             text: 'Number of Tweets per Weekdays'
//         },
//         xAxis:{
// 			ticks:[[0.5,""],[1,"Sunday"],[2,"Monday"],[3,"Tuesday"],[4,"Wednesday"],[5,"Thursday"],[6,"Friday"],[7,"Saturday"],[7.5,""]],  min:-3, max:10, 
//             minPadding:.075,
//             maxPadding:.075,
//             lineColor:'#999',
//             lineWidth:1,
//             tickColor:'#666',
//             tickLength:3,
//             title:{
//                 text:'Weekdays'
//             }
//         },
//         yAxis:{
//         	ticks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], min:-3, max:26,
//             lineColor:'#999',
//             lineWidth:1,
//             tickColor:'#666',
//             tickWidth:1,
//             tickLength:3,
//             gridLineColor:'#ddd',
//             title:{
//                 text:'Hour',
//                 rotation:270,
//                 margin:10,
//             }
//         },

//         series: [{
//         	data: [arr[i][0], arr[i][1], arr[i][2]],
//         	marker: {
//                 fillColor: {
//                     radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
//                     stops: [
//                         [0, 'rgba(255,255,255,0.5)'],
//                         [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(1).get('rgba')]
//                     ]
//                 }
//             }	
//         }]
// 	});
// }
//********************************
$("#timetable").empty();
	for(var i = 0; i < len; i++){
		arr.push([parseInt(items[i].center_wkd), items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
	}

    plot = $.jqplot('timetable',[arr],{
		axes:{
			xaxis:{ticks:[[0.5,""],[1,"Sunday"],[2,"Monday"],[3,"Tuesday"],[4,"Wednesday"],[5,"Thursday"],[6,"Friday"],[7,"Saturday"],[7.5,""]],  min:-3, max:10}, 
			yaxis:{ticks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], min:-3, max:26} 
		},
        seriesDefaults:{
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
				autoscaleBubbles: true,
                bubbleAlpha: 0.6,
                highlightAlpha: 0.8,
				bubbleGradients: true
            },
            shadow: true,
            shadowAlpha: 0.05
        },
        grid: {
        drawGridLines: false,
        drawBorderLines: false,
        background: '#eee',      // CSS color spec for background color of grid.
        // shadow: true,               // draw a shadow for grid.
        // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
        // shadowOffset: 1.5,          // offset from the line of the shadow.
        // shadowWidth: 3,             // width of the stroke for the shadow.
        // shadowDepth: 3
		}
    }); 
	
	plot.redraw(true);
	
	// $('#graph').bind('jqplotDataClick',
 //            function (ev, seriesIndex, pointIndex, data) {                
 //                var cluster = clusters[parseInt(pointIndex)];
	// 			var opt = {
	// 						clusterid : cluster.id, 
	// 						npts : cluster.n, 
	// 						nwrds : cluster.nwords, 
	// 						lat : cluster.center_lat, 
	// 						lon : cluster.center_lon, 
	// 						hou : cluster.center_hou,
	// 						wkd : cluster.center_wkd,
	// 						cradius : cluster.radius,
	// 						weight : cluster.weight,
	// 						cdate : cluster.creation_d,
	// 						ldate : cluster.lastedit_d
	// 					  };
	// 			// showInfo(opt);
	// 			showClusterCloud(cluster.id, 1);
 //            }
 //    );
}

//funcçao de visualizaçao do grafico para um dado Cluster
function showThisClusterGraph(id, x){

	if(x == 1){ 
		var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) {
            	items=data;

		var len = items.length;	
		
		var arr = [];

			for(var i = 0; i < len; i++){
			arr.push([parseFloat(items[i].center_wkd), parseFloat(items[i].center_hou), items[i].n]); //items[i].id.toString()]);
		}
	         


        for(var i = 0; i < arr.length; i++){

    	$('#timetable').highcharts({

        chart: {
            type: 'bubble',
            zoomType: 'xy'
        },
        xAxis:{
			ticks:[[0.5,""],[1,"Sunday"],[2,"Monday"],[3,"Tuesday"],[4,"Wednesday"],[5,"Thursday"],[6,"Friday"],[7,"Saturday"],[7.5,""]],  min:-3, max:10, 
            minPadding:.075,
            maxPadding:.075,
            lineColor:'#999',
            lineWidth:1,
            tickColor:'#666',
            tickLength:3,
            title:{
                text:'Weekdays'
            }
        },
        yAxis:{
        	ticks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], min:-3, max:26,
            lineColor:'#999',
            lineWidth:1,
            tickColor:'#666',
            tickWidth:1,
            tickLength:3,
            gridLineColor:'#ddd',
            title:{
                text:'Hour',
                rotation:270,
                margin:10,
            }
        },

        series: [{
        	data: [arr[i]],
        	marker: {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                    ]
                }
            }	
        }]
	});
}

	// for(var i = 0; i < len; i++){
	// 	if(items[i].id == id){
	// 		arr.push([items[i].center_wkd, items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
	// 	}
	// }

 //    plot = $.jqplot('timetable',[arr],{
	// 	axes:{
	// 		xaxis:{ticks:[[0.5,""],[1,"Sunday"],[2,"Monday"],[3,"Tuesday"],[4,"Wednesday"],[5,"Thursday"],[6,"Friday"],[7,"Saturday"],[7.5,""]],  min:-3, max:10}, 
	// 		yaxis:{ticks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], min:-3, max:26} 
	// 	},
 //        seriesDefaults:{
 //            renderer: $.jqplot.BubbleRenderer,
 //            rendererOptions: {
	// 			autoscaleBubbles: true,
 //                bubbleAlpha: 0.6,
 //                highlightAlpha: 0.8,
	// 			bubbleGradients: true
 //            },
 //            shadow: true,
 //            shadowAlpha: 0.05
 //        }
 //    }); 
	
	// plot.redraw(true);
	
	// $('#graph').bind('jqplotDataClick',
 //            function (ev, seriesIndex, pointIndex, data) {                
 //                var cluster = clusters[parseInt(pointIndex)];
	// 			var opt = {
	// 						clusterid : cluster.id, 
	// 						npts : cluster.n, 
	// 						nwrds : cluster.nwords, 
	// 						lat : cluster.center_lat, 
	// 						lon : cluster.center_lon, 
	// 						hou : cluster.center_hou,
	// 						wkd : cluster.center_wkd,
	// 						cradius : cluster.radius,
	// 						weight : cluster.weight,
	// 						cdate : cluster.creation_d,
	// 						ldate : cluster.lastedit_d
	// 					  };
	// 			// showInfo(opt);
	// 			// showClusterCloud(cluster.id, cluster.test);
 //            }
 //    );
             }, 'JSON');
}else{
			var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) {
            	items=data;

	var len = items.length;	
	
	var arr = [];

	for(var i = 0; i < len; i++){
		if(items[i].id == id){
			arr.push([items[i].center_wkd, items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
		}
	}

    plot = $.jqplot('timetable',[arr],{
		axes:{
			xaxis:{ticks:[[0.5,""],[1,"Sunday"],[2,"Monday"],[3,"Tuesday"],[4,"Wednesday"],[5,"Thursday"],[6,"Friday"],[7,"Saturday"],[7.5,""]],  min:-3, max:10}, 
			yaxis:{ticks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], min:-3, max:26} 
		},
        seriesDefaults:{
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
				autoscaleBubbles: true,
                bubbleAlpha: 0.6,
                highlightAlpha: 0.8,
				bubbleGradients: true
            },
            shadow: true,
            shadowAlpha: 0.05
        }
    }); 
	
	plot.redraw(true);
	
	$('#graph').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {                
                var cluster = clusters[parseInt(pointIndex)];
				var opt = {
							clusterid : cluster.id, 
							npts : cluster.n, 
							nwrds : cluster.nwords, 
							lat : cluster.center_lat, 
							lon : cluster.center_lon, 
							hou : cluster.center_hou,
							wkd : cluster.center_wkd,
							cradius : cluster.radius,
							weight : cluster.weight,
							cdate : cluster.creation_d,
							ldate : cluster.lastedit_d
						  };
            }
    );
             }, 'JSON');

}
}

    function draw(words) {

    	var fill = d3.scale.category20();

    d3.select("#wordcloud").append("svg")
        .attr("width", 450)
        .attr("height", 400)
      .append("g")
        .attr("transform", "translate(210,200)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }

//funcçao de inicializaçao de todos os tweets
function getPlaces()
{
    var items = [];
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTweets',
         { },
         function(data) { 
            	items=data;
		        showPlaces(items);
		        showTweets(items);
		        readVerbetes(items);
         }, 'JSON');
}

//funcçao de visualizaçao de todos os tweets
function showTweets(items){

	var len = items.length;

	if(len > 200){
		len = 200;
	}

	var theDiv = document.getElementById("streamTweets");

	for (var i=0;i<len;i++){

	if(i < (len/4)){
		// var content = '<div id="contenttweets" href="www.twitter.com/'+items[i].username+'" style="font-family:fantasy; font-size:14px">'+items[i].username+":"+items[i].text+"</br>";
		// theDiv.innerHTML += content;
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'">"'+items[i].username+'"</a>'+":"+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}else if((len/4) <= i < (len/2)){
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'">"'+items[i].username+'"</a>'+":"+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}else if((len/2) <= i < (3*len/4)){
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'">"'+items[i].username+'"</a>'+":"+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}
	else{
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'">"'+items[i].username+'"</a>'+":"+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}
	}
}

//funcçao de visualizaçao da localizaçao de todos os tweets
function showPlaces(items){

	var len = items.length;
	console.log('tweets', len);
	pmarkers = [];
	var taxiData = [];
	// for(var i = 0; i < len; i++){
	// 	L.marker(items[i].lat, items[i].lat).addTo(map);
	// }
	// +++++++++++++ MARKERS ++++++++++++++++
// 		for(var i = 0; i < len; i++){
// 		var myLatlng = new google.maps.LatLng(items[i].lon,items[i].lat);

// 		var image = {
// 	    url: 'image/tweet.png',
// 		    origin: new google.maps.Point(0,0),
// 		    size: new google.maps.Size(30, 32)
// 		};

// 		var marker = new google.maps.Marker({
// 			position: myLatlng,
// 			icon: image,
// 			map: map,
// 			title: items[i].text
// 		});

// 		var content = '<div id="content">'+items[i].id+" - "+items[i].text;
// 		var infowindow = new google.maps.InfoWindow();

// 		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
// 		    return function() {

// 		    	closeInfos();

// 		        infowindow.setContent(content);
// 		        infowindow.open(map,marker);
// 				infos[0]=infowindow;
// 		    };
// 		})(marker,content,infowindow));
// 	}
// }
// ++++++++++++++++++++++++++ 

// +++++++++++++++++ HEATMAP ++++++++++++++++++
for(var i = 0; i < len; i++){
taxiData.push(new google.maps.LatLng(items[i].lon,items[i].lat));
	}

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
	// google.maps.event.addListener(marker, 'load', initialize);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.5);
}
// ++++++++++++++++++++++++++++++++++++++


function closeInfos(){
 
   if(infos.length > 0){
 
      /* detach the info-window from the marker ... undocumented in the API docs */
      infos[0].set("marker", null);
      infos[0].set("circle", null);
 
      /* and close it */
      infos[0].close();
 
      /* blank the array */
      infos.length = 0;
   }
}

//funcçao para permitir visualizaçao de microClusters
function displayMicro()
{
	clust = $(this).val();

	if($(this).is(":checked") && clust == "0")
	{
			for(var i = 0; i < mcmarkers.length; i++){
				mcmarkers[i].setMap(map);
			}
	}
	else
	{
			for(var i = 0; i < mcmarkers.length; i++){
				mcmarkers[i].setMap(null);
			}
	}
}

//funcçao para permitir visualizaçao de Clusters
function displayMacro()
{
	clust = $(this).val();

	if($(this).is(":checked") && clust == "0")
	{
			for(var i = 0; i < cmarkers.length; i++){
				cmarkers[i].setMap(map);
			}
	}
	else
	{
			for(var i = 0; i < cmarkers.length; i++){
				cmarkers[i].setMap(null);
			}
	}
}

//funcçao de inicializaçao/visualizaçao da timeline
function loadTimeline(items){
	$("#my-timeline").empty();
	// DOM element where the Timeline will be attached
    var container = document.getElementById('my-timeline');
    // Create a DataSet with data (enables two way data binding)
    timelineData = [];

	for (var i = 0; i < items.length; i++) {
		// if (items[i].nwords > 20) {
			var dStart = new Date(items[i].creation_d);
			var dEnd = new Date(items[i].lastedit_d);
			var newStartDate = dStart.getUTCFullYear() + '-' + (dStart.getUTCMonth() + 1) + '-' + dStart.getUTCDate();
			var newEndDate = dEnd.getUTCFullYear() + '-' + (dEnd.getUTCMonth() + 1) + '-' + dEnd.getUTCDate();
			timelineData.push({id: items[i].id, content: "Cluster " +items[i].id, start: items[i].creation_d, end: items[i].lastedit_d});
		// };
	}

    var data = new vis.DataSet(timelineData);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, data, options);
}

//funcçao de visualizaçao da linha temporal - andar com micro/macro para tras ate 7 dias
function getTimelineMovie(micro, macro, t){

    timelineData = [];

    var currentdate = new Date(); 
	var datetime = currentdate.getDate();


	for (var i = 0; i < micro.length; i++) {

			var dStart = new Date(micro[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){
			var pos = new google.maps.LatLng(micro[i].center_lon, micro[i].center_lat);
			var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
			map:map,
			clusterid: micro[i].id,
			testid: micro[i].test,
			npts: micro[i].n,
			nwrds: micro[i].nwords,
			weight: micro[i].weight,
			cradius: micro[i].radius,
			lat: micro[i].center_lat,
			lon: micro[i].center_lon,
			hou: micro[i].center_hou,
			wkd: micro[i].center_wkd,
			cdate: micro[i].creation_d,
			ldate: micro[i].lastedit_d
			});

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+micro[i].id+"<br />"+ " Npoints: "+micro[i].n
		+"<br />"+ " Nwords: "+micro[i].nwords
		+"<br />"+ " Weight: "+micro[i].weight
		+"<br />"+ " Radius: "+micro[i].radius
		+"<br />"+ " Position: "+micro[i].center_lat+";"+micro[i].center_lon
		+"<br />"+ " Weekday: "+micro[i].center_wkd
		+"<br />"+ " Hour: "+micro[i].center_hou
		+"<br />"+ " Creation Time: "+micro[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
		}
	}


	for (var i = 0; i < macro.length; i++) {

			var dStart = new Date(macro[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){
			var pos = new google.maps.LatLng(macro[i].center_lon, macro[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:macro[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
			map:map,
			clusterid: macro[i].id,
			testid: macro[i].test,
			npts: macro[i].n,
			nwrds: macro[i].nwords,
			weight: macro[i].weight,
			cradius: macro[i].radius,
			lat: macro[i].center_lat,
			lon: macro[i].center_lon,
			hou: macro[i].center_hou,
			wkd: macro[i].center_wkd,
			cdate: macro[i].creation_d,
			ldate: macro[i].lastedit_d
		});

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+macro[i].id
		+"<br />"+ " Npoints: "+macro[i].n
		+"<br />"+ " Nwords: "+macro[i].nwords
		+"<br />"+ " Weight: "+macro[i].weight
		+"<br />"+ " Radius: "+macro[i].radius
		+"<br />"+ " Position: "+macro[i].center_lat+";"+macro[i].center_lon
		+"<br />"+ " Weekday: "+macro[i].center_wkd
		+"<br />"+ " Hour: "+macro[i].center_hou
		+"<br />"+ " Creation Time: "+macro[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
				setTheseMicroClusters(this.testid);
  		});	
		}
	}

	console.log("clusters", cmarkers.length);
	console.log("microclusters", mcmarkers.length);
}

//funcçao de inicializaçao da linha temporal - andar com micro/macro para tras ate 7 dias
function getTimelineMovie_micro(t){
		var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        getTimelineMovie_macro(items, t);
         }, 'JSON');
}

//funcçao de inicializaçao da linha temporal - andar com micro/macro para tras ate 7 dias
function getTimelineMovie_macro(micro, t){
	var items = [];

		if(document.getElementById("radio_allDimensions").checked){ 
	var url = 'http://localhost:8080/basicWeb/index.php/site/getClusters';
	}
	else if(document.getElementById("radio_timeDimension").checked){
		var url = 'http://localhost:8080/basicWeb/index.php/site/getTimeClusters';
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		var url = 'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters';
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		var url = 'http://localhost:8080/basicWeb/index.php/site/getContentClusters';
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		var url = 'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters';
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		var url = 'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters';
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		var url = 'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters';
	}

	$.getJSON( 
        url,
         {},
         function(data) { 
            	items=data;
		        getTimelineMovie(micro, items, t);
		        //loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

//funcçao do slider da linha temporal - andar com micro/macro para tras ate 7 dias
function TimelineSliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	if (t == 0){
		setMicroClusters(t);
			if(document.getElementById("radio_allDimensions").checked){ 
		setClusters(t);
	}
	else if(document.getElementById("radio_timeDimension").checked){
		setTimeClusters(t);
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		setSpaceClusters(t);
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		setContentClusters(t);
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		setTimeSpaceClusters(t);
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		setSpaceContentClusters(t);
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		setContentTimeClusters(t);
	}
	}else getTimelineMovie_micro(t);
}

//funcçao do slider temporal - escolha de dia da semana para a visualizaçao de micro/macro
function sliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	setMicroClusters(t);

	if(document.getElementById("radio_allDimensions").checked){ 
		setClusters(t);
	}
	else if(document.getElementById("radio_timeDimension").checked){
		setTimeClusters(t);
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		setSpaceClusters(t);
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		setContentClusters(t);
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		setTimeSpaceClusters(t);
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		setSpaceContentClusters(t);
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		setContentTimeClusters(t);
	}
}

//funcçao para remover micro/macro do mapa
function clearOverlays() {
	for (var i = 0; i < mcmarkers.length; i++ ) {
		mcmarkers[i].setMap(null);
	}
	mcmarkers = [];
	for (var i = 0; i < cmarkers.length; i++ ) {
		cmarkers[i].setMap(null);
	}
	cmarkers = [];
}

//funcçao de inicializaçao da maquina do tempo
function readVerbetes(items){

	// for (var start = 0; start < 9000; start = start +100) {
	
	// 	var url = "https://services.sapo.pt/InformationRetrieval/Verbetes/Personalities/Names/getDocuments?ESBToken=01.EZs5j5fIZTMf326pOLmC9g&start="+start+"";
	// 	// var testTweet = "Eu sou o Abdel Moez Ibrahim";
	// 	    $.getJSON( 
	//     url,
	//      {},
	//      function(data) {
	//      	// console.log(data.response.docs.length);
	//      	for (var j = 0; j < items.length; j++) {
	//      		testTweet = items[j].text;
	// 	     	for (var i = 0; i < data.response.docs.length; i++) {
	// 		     	if (testTweet.indexOf(data.response.docs[i].name_t_s) != -1){
	// 		     		console.log(data.response.docs[i]);
	// 		     		showVerbetes(data.response.docs[i].name_t_s);
	// 		     	}
	// 	     	}
	//      	}
	//      }, 'JSON');
	// }

		$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getVerbetes',
         {},
         function(data) {
			    showVerbetes(data, items);
         }, 'JSON');
}

//funcçao de visualizaçao da maquina do tempo
function showVerbetes(verbetes, tweets){

		var theDiv = document.getElementById("streamMaquina");


		// $.getJSON( 
  //       'http://localhost:8080/basicWeb/index.php/site/getVerbetes',
  //        {},
  //        function(data) {
  //           	items=data;
  //           	for (var i = 0; i < items.length; i++) { 
	 //            	if(items[i].person == names){   	
		// 	     		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://maquinadotempo.sapo.pt/personalidade.php#entityID='+items[i].id+'"target="_blank">"'+items[i].person+'</a>'+"</br>"+"</div>";
		// 				theDiv.innerHTML += content;
		// 	     	}
		// 	     }
  //        }, 'JSON');

		for (var i = 0; i < tweets.length; i++) {

			if(tweets[i].text != null){
			var testTweet = tweets[i].text;
			var found;
			// var testTweet = "Eu sou o Abdel Moez Ibrahim";

			for (var j = 0; j < verbetes.length; j++) {
				
					if((testTweet.indexOf(verbetes[j].person) != -1) || (testTweet.indexOf(verbetes[j].person.toLowerCase()) != -1)){

						found = $.inArray(verbetes[j].person, peopleNames);

						if (found == -1) {
							peopleNames.push(verbetes[j].person);
							people.push({"person":verbetes[j].person, "id":verbetes[j].id});
						}  	
			     		
			     	}
			}
			}
		}
		for (var x = 0; x < people.length; x++) {
			var content = '<div id="contenttweets" style="font-family: fantasy; color:#000000;">'+people[x].person+' <a style="color:#4099FF;" href="http://maquinadotempo.sapo.pt/personalidade.php#entityID='+people[x].id+'"target="_blank">'+"<img src='image/sapoMDT.png'> "+'</a>'+' <a style="color:#4099FF;" href="http://www.sapo.pt/pesquisa?q='+people[x].person+'"target="_blank">'+"<img src='image/sapologo.png'> "+'</a>'+"</br>"+"</div>";
				     		// var content = '<div id="contenttweets" style="font-family: fantasy; style="color:#4099FF; href="http://maquinadotempo.sapo.pt/personalidade.php#entityID='+verbetes[j].id+'"target="_blank" ">'+verbetes[j].person+"</br>"+"<img src='image/sapologo.png'> "+"</div>";
							
							// var content = '<div id="contenttweets" style="font-family: fantasy;"> <a href="http://maquinadotempo.sapo.pt/personalidade.php#entityID='+verbetes[j].id+'"target="_blank"'+"<img src='image/sapologo.png'>"+'</a>'+"</br>"+"</div>";
							theDiv.innerHTML += content;
							getNews(people[x].id);
		};
}

//funcçao de inicializaçao das noticias
function getNews(id){

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = yyyy+'-'+mm+'-'+dd;
	var url = 'http://localhost:8080/basicWeb/index.php/site/getNews/'+id+'/'+today;

	$.getJSON( 
        'http://services.sapo.pt/InformationRetrieval/Epicentro/GetNews?ESBToken=01.GROnLHWLh7UtJo2XIpn6DA&limit=20&nodesIDs='+id+'&beginDate=2014-01-01&sectionsIDs=1,2,3,4,5,6,7,8,9&endDate='+today+'',
         {},
         function(data) {
			    showNews(data);
         }, 'JSON');

	// $.getJSON( 
	// 	 url,
 //         {},
 //         function(data) {
 //         	console.log("11111");
	// 		    showNews(data);
 //         }, 'JSON');

}

//funcçao de visualizaçao de todas as noticias
function showNews(news){
	len = news.response.docs.length;

	var theDiv = document.getElementById("streamNews");

		for (var i = 0; i < len; i++) {
     		var content = '<div id="contenttweets" style="font-family: fantasy; color:#000000;">'+news.response.docs[i].title+" in "+news.response.docs[i].source+"</br>"+' <a style="color:#4099FF;" href='+news.response.docs[i].url+' target="_blank">'+"Read the News"+'</a>'+"</br>"+"</div>";						
			theDiv.innerHTML += content;

		}	

}

//funcçao de inicializaçao para busca de palavras
function setMicroClustersForWord_1(){
			$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        setMicroClustersForWord_2(items);
         }, 'JSON');
	    
}

//funcçao de inicializaçao para busca de palavras
function setMicroClustersForWord_2(items){

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
         {},
         function(data) { 
            	words=data;
		        showMicroClustersForWord(items, words);
         }, 'JSON');
}

//funcçao de visualizaçao para busca de palavras
function showMicroClustersForWord(items, words){
	var wordValue = document.getElementById('searchWord').value;

	console.log(wordValue);

	for (var j = 0; j < words.length; j++) {
		if (words[j].word == wordValue) {

			for (var i = 0; i < items.length; i++) {
				if (items[i].id == words[j].mcluster_id) {

								var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
								var marker = new google.maps.Marker({
								position: pos,
								icon:'image/tweet2.png',
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

							var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
							+"<br />"+ " Nwords: "+items[i].nwords
							+"<br />"+ " Weight: "+items[i].weight
							+"<br />"+ " Radius: "+items[i].radius
							+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
							+"<br />"+ " Weekday: "+items[i].center_wkd
							+"<br />"+ " Hour: "+items[i].center_hou
							+"<br />"+ " Creation Time: "+items[i].creation_d;

							var infowindow = new google.maps.InfoWindow();

							google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
							    return function() {

							    	closeInfos();

							        infowindow.setContent(content);
							        infowindow.open(map,marker);
							        setTimeout(function () { infowindow.close(); }, 10000);
									infos[0]=infowindow;
							    };
							})(marker,content,infowindow));
							mcmarkers.push(marker);

							google.maps.event.addListener(marker, 'click', function() {
					    		// showInfo(this);
								showThisClusterCloud(this.clusterid, 0);
								showThisClusterGraph(this.clusterid, 0);
					  		});	
					
				}
			}

		}
	}
console.log("microclusters:", mcmarkers.length);
}

//funcçao de inicializaçao para busca de palavras
function setClustersForWord_1(){
		var wordValue = document.getElementById('searchWord').value;
	    
	    if(document.getElementById("radio_allDimensions").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_timeDimension").checked){
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
		        // showClustersGraph(items);
         }, 'JSON');
	}
}

//funcçao de inicializaçao para busca de palavras
function setClustersForWord_2(items){

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
         {},
         function(data) { 
            	words=data;
		        showClustersForWord(items, words);
         }, 'JSON');
}

//funcçao de visualizaçao para busca de palavras
function showClustersForWord(items, words){
	var wordValue = document.getElementById('searchWord').value;

	for (var j = 0; j < words.length; j++) {
		if (words[j].word == wordValue) {

			for (var i = 0; i < items.length; i++) {
				if (items[i].id == words[j].cluster_id) {

						var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
						
						var circle = new google.maps.Circle({
							center:pos,
							radius:items[i].radius*20200*175,
							strokeColor:"#000000",
							strokeOpacity:0.8,
							strokeWeight:0.75,
							fillColor:"#4099FF",
							fillOpacity:0.4,
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

						var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
									+"<br />"+ " Npoints: "+items[i].n
									+"<br />"+ " Nwords: "+items[i].nwords
									+"<br />"+ " Weight: "+items[i].weight
									+"<br />"+ " Radius: "+items[i].radius
									+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
									+"<br />"+ " Weekday: "+items[i].center_wkd
									+"<br />"+ " Hour: "+items[i].center_hou
									+"<br />"+ " Creation Time: "+items[i].creation_d;

									var infowindow = new google.maps.InfoWindow();

									google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
									    return function() {

									    	closeInfos();

									    	infowindow.setPosition(circle.getCenter());
									        infowindow.setContent(content);
									        infowindow.open(map);
											infos[0]=infowindow;
									    };
									})(circle,content,infowindow));

						cmarkers.push(circle);
						
						google.maps.event.addListener(circle, 'click', function() {
				    			// showInfo(this);
								showThisClusterCloud(this.clusterid, 1);
								showThisClusterGraph(this.clusterid, 1);
				  		});
					
				}
			}

		}
	}
console.log("clusters:", cmarkers.length);
}

//funcçao do slider espacial - definiçao de regiao de visualizaçao
function SpatialsliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();

	if(t == 0){
		setMicroClusters(0);
	if(document.getElementById("radio_allDimensions").checked){ 
		setClusters(0);
	}
	else if(document.getElementById("radio_timeDimension").checked){
		setTimeClusters(0);
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		setSpaceClusters(0);
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		setContentClusters(0);
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		setTimeSpaceClusters(0);
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		setSpaceContentClusters(0);
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		setContentTimeClusters(0);
	}
	}else{

	setMicroClustersRegion(t);
	setClustersRegion(t);
	}
}

//funcçao de inicializaçao para slider espacial - definiçao de regiao de visualizaçao
function setMicroClustersRegion(t){
		var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        showMicroClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
}

//funcçao de inicializaçao para slider espacial - definiçao de regiao de visualizaçao
function setClustersRegion(t){
	var items = [];
		
	if(document.getElementById("radio_allDimensions").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_timeDimension").checked){
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
	$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
         {},
         function(data) { 
            	items=data;
		        showClustersRegion(items, t);
		        // showClustersGraph(items);
         }, 'JSON');
	}
}

//funcçao de visualizaçao para slider espacial - definiçao de regiao de visualizaçao
function showMicroClustersRegion(items, t){

  	var len = items.length;
	mcmarkers = [];

  	for(var i = 0; i < len; i++){

if(t == 1){
  			if((items[i].center_lat > -170) && (items[i].center_lat < -30)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 85)){

  			var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
  			var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
  			}
  		}
  	}else if(t == 2){
  			if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > 31) && (items[i].center_lon < 85)){

  			var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
  			var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
  			}
  		}

  } else{

  	  		if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 30)){

  			var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
  			var marker = new google.maps.Marker({
			position: pos,
			icon:'image/tweet2.png',
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		    	closeInfos();

		        infowindow.setContent(content);
		        infowindow.open(map,marker);
		        setTimeout(function () { infowindow.close(); }, 10000);
				infos[0]=infowindow;
		    };
		})(marker,content,infowindow));
		mcmarkers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
    		// showInfo(this);
			showThisClusterCloud(this.clusterid, 0);
			showThisClusterGraph(this.clusterid, 0);
  		});	
  			}
  		}
  }
}
console.log("microclusters:", mcmarkers.length);
}

//funcçao de visualizaçao para slider espacial - definiçao de regiao de visualizaçao
function showClustersRegion(items, t){

  	var len = items.length;
	cmarkers = [];

  	for(var i = 0; i < len; i++){

if(t == 1){
  			if((items[i].center_lat > -170) && (items[i].center_lat < -30)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 85)){

		var len = items.length;	

		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
  		});
  			}
  		}
  	}else if(t == 2){
  			if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > 31) && (items[i].center_lon < 85)){

  	var len = items.length;	

		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
  		});
  			}
  		}

  } else if(t == 3){

  	  		if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 30)){

 var len = items.length;	

		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*175,
			strokeColor:"#000000",
			strokeOpacity:0.8,
			strokeWeight:0.75,
			fillColor:"#4099FF",
			fillOpacity:0.4,
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

		var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		+"<br />"+ " Npoints: "+items[i].n
		+"<br />"+ " Nwords: "+items[i].nwords
		+"<br />"+ " Weight: "+items[i].weight
		+"<br />"+ " Radius: "+items[i].radius
		+"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		+"<br />"+ " Weekday: "+items[i].center_wkd
		+"<br />"+ " Hour: "+items[i].center_hou
		+"<br />"+ " Creation Time: "+items[i].creation_d;

		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		    return function() {

		    	closeInfos();

		    	infowindow.setPosition(circle.getCenter());
		        infowindow.setContent(content);
		        infowindow.open(map);
				infos[0]=infowindow;
		    };
		})(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
  		});
  			}
  		}
  }
}
console.log("Clusters:", cmarkers.length);
}

//funcçao de definiçao das dimensoes a serem visualizadas
function defineDimensions(){
	clearOverlays();
	setMicroClusters(0);

	if(document.getElementById("radio_allDimensions").checked){ 
		setClusters(0);
	}
	else if(document.getElementById("radio_timeDimension").checked){
		setTimeClusters(0);
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		setSpaceClusters(0);
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		setContentClusters(0);
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		setTimeSpaceClusters(0);
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		setSpaceContentClusters(0);
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		setContentTimeClusters(0);
	}
}

$(document).ready(function(){
	$("input[name='microclustering']").change(displayMicro);
	$("input[name='macroclustering']").change(displayMacro);
	$("input[name='tweets']").change(toggleHeatmap);
	$("input[name='tempopoints']").change(sliderChanged);
	$("input[name='spatialpoints']").change(SpatialsliderChanged);
	$("input[name='pointsTimeline']").change(TimelineSliderChanged);
	$("input[name='wordcloudAll']").change(setClusterCloud);

	$('#searchWord').keypress(function (e) {                                       
       if (e.which == 13) {
       		$("#slider").val(0);
            e.preventDefault();
            clearOverlays();

            var wordValue = document.getElementById('searchWord').value;
			if(wordValue != ''){
            setMicroClustersForWord_1();
            setClustersForWord_1();

            }else{

			setMicroClusters(0);

				// 			if(document.getElementById("radio_timeDimensions").checked && document.getElementById("radio_spaceDimensions").checked && document.getElementById("radio_contentDimensions").checked){ 
				// 	setClusters(0);
				// }
				// else if(document.getElementById("radio_timeDimensions").checked && !document.getElementById("radio_spaceDimensions").checked && !document.getElementById("radio_contentDimensions").checked){ 
				// 	setTimeClusters(0);
				// }
				// else if(!document.getElementById("radio_timeDimensions").checked && document.getElementById("radio_spaceDimensions").checked && !document.getElementById("radio_contentDimensions").checked){ 
				// 	setSpaceClusters(0);
				// }
				// else if(!document.getElementById("radio_timeDimensions").checked && !document.getElementById("radio_spaceDimensions").checked && document.getElementById("radio_contentDimensions").checked){ 
				// 	setContentClusters(0);
				// }
				// else if(document.getElementById("radio_timeDimensions").checked && document.getElementById("radio_spaceDimensions").checked && !document.getElementById("radio_contentDimensions").checked){ 
				// 	setTimeSpaceClusters(0);
				// }
				// else if(!document.getElementById("radio_timeDimensions").checked && document.getElementById("radio_spaceDimensions").checked && document.getElementById("radio_contentDimensions").checked){ 
				// 	setSpaceContentClusters(0);
				// }
				// else if(document.getElementById("radio_timeDimensions").checked && !document.getElementById("radio_spaceDimensions").checked && document.getElementById("radio_contentDimensions").checked){ 
				// 	setContentTimeClusters(0);
				// }

				if(document.getElementById("radio_allDimensions").checked){ 
					setClusters(0);
				}
				else if(document.getElementById("radio_timeDimension").checked){
					setTimeClusters(0);
				}
				else if(document.getElementById("radio_spaceDimension").checked){ 
					setSpaceClusters(0);
				}
				else if(document.getElementById("radio_contentDimension").checked){ 
					setContentClusters(0);
				}
				else if(document.getElementById("radio_timespaceDimension").checked){ 
					setTimeSpaceClusters(0);
				}
				else if(document.getElementById("radio_spacecontentDimension").checked){ 
					setSpaceContentClusters(0);
				}
				else if(document.getElementById("radio_contenttimeDimension").checked){ 
					setContentTimeClusters(0);
				}
		}
       }
	});

	initialize();
	getPlaces();
	setMicroClusters(0);
	setClusters(0);
	document.getElementById("reloadDim").onclick = function() {defineDimensions()};
	readVerbetes("https://services.sapo.pt/InformationRetrieval/Verbetes/Personalities/Names/getDocuments?ESBToken=01.EZs5j5fIZTMf326pOLmC9g&start="+start+"");
	for(var i = 0; i < cmarkers.length; i++){
		cmarkers[i].setMap(null);
	}
});
