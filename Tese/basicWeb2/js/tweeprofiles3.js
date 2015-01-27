var map, pointarray, heatmap;
var microClusters;
var clusters;
var mcmarkers = [];
var cmarkers = [];
var pmarkers = [];
var places;
var initial = 0;
var viz = 0;
var start = 0;
var clust = 0;
var nverbetes = 0;
var infos = [];
var people = [];
var peopleNames = [];
var Clusterwords, MicroClusterwords, allClusters, timeClusters, spaceClusters, contentClusters, timeSpaceClusters, contentSpaceClusters, contentTimeClusters;

function initialize()
{
	L.mapbox.accessToken = 'pk.eyJ1IjoiaW5zb21uaWFjeSIsImEiOiJVNmZuaUZzIn0.-vyJcMkVt5BsoANudSHA4w';
	map = L.mapbox.map(document.getElementById("map"), 'examples.map-i86nkdio', {
        worldCopyJump: true, 
    })
    .setView([0, 0], 2);

  // cartodb.createVis('map', 'http://mayurilive.cartodb.com/api/v2/viz/994b9f1c-69b0-11e4-b2dd-0e853d047bba/viz.json');
 // 	var mapProp = {
	//   center:new google.maps.LatLng(0.0, 0.0),
	//   zoom:2,
	//   mapTypeId: google.maps.MapTypeId.HYBRID,
	//   mapTypeControl: false
	// };
	// map = new google.maps.Map(document.getElementById("map"),mapProp);

	// map = L.map('map').setView([0, -0.09], 3);

	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 //    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);
}

//funcçao de inicializaçao de todos os clusters
function setClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) {
            	allClusters=data;
		        showClustersMap(allClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(allClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensao temporal
function setTimeClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
         {},
         function(data) {
            	timeClusters=data;
		        showClustersMap(timeClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(timeClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensap espacial
function setSpaceClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
         {},
         function(data) {
            	spaceClusters=data;
		        showClustersMap(spaceClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(spaceClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters da dimensao do conteudo
function setContentClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
         {},
         function(data) {
            	contentClusters=data;
		        showClustersMap(contentClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(contentClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes temporais e espaciais
function setTimeSpaceClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
         {},
         function(data) {
            	timeSpaceClusters=data;
		        showClustersMap(timeSpaceClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(timeSpaceClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes espaciais e conteudo
function setSpaceContentClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
         {},
         function(data) {
            	contentSpaceClusters=data;
		        showClustersMap(contentSpaceClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(contentSpaceClusters);
         }, 'JSON');
}

//funcçao de inicializaçao de todos os clusters das dimensoes temporais e conteudo
function setContentTimeClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
         {},
         function(data) {
            	contentTimeClusters=data;
		        showClustersMap(contentTimeClusters, t);
		        //loadTimeline(items);
		        showClustersGraph(contentTimeClusters);
         }, 'JSON');
}

function setMicroClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	microClusters=data;
		        showMicroClustersMap(microClusters, t);
		        // //loadTimeline(items);
		        // showClustersGraph(items);
         }, 'JSON');
}

//funcçao de visualizaçao de microClusters
function showMicroClustersMap(items, t){

var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});

	if(t == 0){
	var len = items.length;
	
	if(len > 300){
		len = 300;
	}

	mcmarkers = [];
	//alert(items.len);

	for(var i = 0; i < len; i++){

		// marker = L.marker([items[i].center_lon, items[i].center_lat]).addTo(map);

		// circle = L.circle([items[i].center_lon, items[i].center_lat], 10000, {
		//     color: 'blue',
		//     fillColor: '#4099FF',
		//     fillOpacity: 0.5,
		//     clusterid: items[i].id,
		// }).addTo(map);

		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
			color: 'blue',
		    fillColor: '#4099FF',
		    fillOpacity: 0.5, 
		    radius: items[i].radius*7.5,
		    clusterid: items[i].id,
		    testid: items[i].test
		}).addTo(map);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

		mcmarkers.push(circle);

		circle.addEventListener("click", function() {
			// showInfo(this);
			console.log(this.options.clusterid);
			showThisClusterCloud(this.options.clusterid, 0);
			showThisClusterGraph(this.options.clusterid, 0);
  		});

		// google.maps.event.addListener(marker, 'click', function() {
  //   		// showInfo(this);
		// 	showThisClusterCloud(this.clusterid, 0);
		// 	showThisClusterGraph(this.clusterid, 0);
  // 		});	
		}
	} else{

	var len = items.length;
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
		if(items[i].center_wkd == t){
			
		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
			color: 'blue',
		    fillColor: '#4099FF',
		    fillOpacity: 0.5, 
		    radius: items[i].radius*7.5,
		    clusterid: items[i].id,
		    testid: items[i].test
		}).addTo(map);

			circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

		mcmarkers.push(circle);

		circle.addEventListener("click", function() {
			// showInfo(this);
			showThisClusterCloud(this.options.clusterid, 0);
			showThisClusterGraph(this.options.clusterid, 0);
  		});
		}
		
	}

	}
	console.log("microclusters:", mcmarkers.length);
	
}

//funcçao de visualizaçao de todos os clusters
function showClustersMap(items, t){

	var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});

if(t == 0){
var len = items.length;	
	cmarkers = [];


	for(var i = 0; i < len; i++){

		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
			color: 'green',
		    fillColor: '#5ADB98',
		    fillOpacity: 0.5, 
		    radius: items[i].radius*(items[i].weight/items[i].n)*175,
		    clusterid: items[i].id,
		    testid: items[i].test
		}).addTo(map);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

				// google.maps.event.addListener(circle, 'click', function() {
  //   			// showInfo(this);
		// 		showThisClusterCloud(this.clusterid, 1);
		// 		showThisClusterGraph(this.clusterid, 1);
		// 		setTheseMicroClusters(this.testid);
  // 		});
		cmarkers.push(circle);

		circle.addEventListener("click", function() {
    			// showInfo(this);
				showThisClusterCloud(this.options.clusterid, 1);
				showThisClusterGraph(this.options.clusterid, 1);
				setTheseMicroClusters(this.options.clusterid);
  		});
	}
}else{
	var len = items.length;	
	cmarkers = [];
	for(var i = 0; i < len; i++){
		if(items[i].center_wkd == t){
		
		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
			color: 'green',
		    fillColor: '#5ADB98',
		    fillOpacity: 0.5, 
		    radius: items[i].radius*(items[i].n/items[i].weight)*100,
		    clusterid: items[i].id,
		    testid: items[i].test
		}).addTo(map);

			cmarkers.push(circle);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")
		
		addEventListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.options.clusterid, 1);
				showThisClusterGraph(this.options.clusterid, 1);
				setTheseMicroClusters(this.options.clusterid);
  		});
	}
	}
}
	console.log("clusters", cmarkers.length);
	setClusterCloud();
	setMicroClusterCloud();
}

//funcçao de inicializaçao dos microClusters relativos a um dado Cluster
function setTheseMicroClusters(clusterid){
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
			map.removeLayer(mcmarkers[i]);
		}

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroIds/'+clusterid+'/'+type+'',
         {},
         function(data) { 
            	items=data;
		        showTheseMicroClustersMap(items, clusterid);
		        // //loadTimeline(items);
		        // showClustersGraph(items);
         }, 'JSON');
}

// function setTheseMicroClusters_2(mcIds, testid){
// 		var items = [];
// 		var type = 0;

// 	    $.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showTheseMicroClustersMap(items, mcIds, testid);
// 		        // //loadTimeline(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// }

//funcçao de visualizaçao de micro
function showTheseMicroClustersMap(mcIds, cid){

var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});
	var items = microClusters;
	var len = items.length;
	var mcIlen = mcIds.length;

	if(mcIlen > 3000) mcIlen = 3000;
	console.log(cid);
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
		for (var j = 0; j < mcIlen; j++) {

		if(items[i].id == mcIds[j].mcIDS){
		
		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
			color: 'blue',
		    fillColor: '#4099FF',
		    fillOpacity: 0.5, 
		    radius: items[i].radius*7.5,
		    clusterid: items[i].id,
		    testid: items[i].test
		}).addTo(map);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

		mcmarkers.push(circle);

		circle.addEventListener("click", function() {
			// showInfo(this);
			console.log(this.options.clusterid);
			showThisClusterCloud(this.options.clusterid, 0);
			showThisClusterGraph(this.options.clusterid, 0);
  		});
	}
	}
}

	console.log("microclusters:", mcmarkers.length);
}


//funcçao de inicilizaçao da cloud para Clusters
function setClusterCloud(){

	var words = [];
       
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
         {},
         function(data) { 
            	Clusterwords=data;
            	showAllClusterCloud(Clusterwords);
            	// showNews(words);
    }, 'JSON');
}

function setMicroClusterCloud(){

	var words = [];
       
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
         {},
         function(data) { 
            	MicroClusterwords=data;
            	// showNews(words);
    }, 'JSON');
}

//funcçao de visualizaçao da cloud para Clusters
function showAllClusterCloud(words){

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
	    // $.getJSON( 
     //    'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
     //     {},
     //     function(data) { 
            	words=Clusterwords;

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
// }, 'JSON');
	}else{
			    // $.getJSON( 
       //  'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
       //   {},
       //   function(data) { 
            	words=MicroClusterwords;

 	var len = words.length;
	var htmlcode = "";
	for(var i = 0; i < len; i++){
		if(words[i].mcluster_id == id){
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
// }, 'JSON');
	}
}

//funcçao de visualizaçao do grafico para todos Clusters
function showClustersGraph(items){
	var len = items.length;	
	
	var arr = [];

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
	var items = [];

	if(x == 1){ 

		if(document.getElementById("radio_allDimensions").checked){ 
			items = allClusters;
		}
		else if(document.getElementById("radio_timeDimension").checked){
			items = timeClusters;
		}
		else if(document.getElementById("radio_spaceDimension").checked){ 
			items = spaceClusters;
		}
		else if(document.getElementById("radio_contentDimension").checked){ 
			items = contentClusters;
		}
		else if(document.getElementById("radio_timespaceDimension").checked){ 
			items = timeSpaceClusters;
		}
		else if(document.getElementById("radio_spacecontentDimension").checked){ 
			items = contentSpaceClusters;
		}
		else if(document.getElementById("radio_contenttimeDimension").checked){ 
			items = contentTimeClusters;
		}

	var len = items.length;	
	
	var arr = [];

$("#timetable").empty();
	for(var i = 0; i < len; i++){
		if(items[i].id == id){
		arr.push([parseInt(items[i].center_wkd), items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
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
}else{

    items=microClusters;

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
 //            }
 //    );
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
            	places=data;
		        showPlaces(places);
		        showTweets(places);
		        // readVerbetes(places);
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
		// var content = '<div id="contenttweets" href="www.twitter.com/'+items[i].username+'" style="font-family:fantasy; font-size:14px">'+items[i].username+": "+items[i].text+"</br>";
		// theDiv.innerHTML += content;
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'"target="_blank">"'+items[i].username+'"</a>'+": "+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}else if((len/4) <= i < (len/2)){
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'"target="_blank">"'+items[i].username+'"</a>'+": "+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}else if((len/2) <= i < (3*len/4)){
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'"target="_blank">"'+items[i].username+'"</a>'+": "+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}
	else{
		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://www.twitter.com/'+items[i].username+'"target="_blank">"'+items[i].username+'"</a>'+": "+items[i].text+"</br>"+"</div>";
		theDiv.innerHTML += content;
	}
	}
}

//funcçao de visualizaçao da localizaçao de todos os tweets
function showPlaces(items, t){

	var len = items.length;
	
	var tweetIcon = L.icon({
	    iconUrl: 'image/tweet.png',

	    iconSize:     [15, 20], // size of the icon
	    // shadowSize:   [50, 64], // size of the shadow
	    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    // shadowAnchor: [4, 62],  // the same for the shadow
	    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	// for(var i = 0; i < len; i++){
	// 	L.marker(items[i].lat, items[i].lat).addTo(map);
	// }
	// +++++++++++++ MARKERS ++++++++++++++++
		for(var i = 0; i < len; i++){

		marker = L.marker([items[i].lon, items[i].lat], {icon: tweetIcon}).addTo(map);

		marker.bindPopup("<b style=color:#4099FF;>User: "+items[i].username+
			"</b><br><b style=color:#4099FF;>Latitude: "+items[i].lat+" ; Longitude: "+items[i].lon+
			"</b><br><b style=color:#4099FF;>Tweet: "+items[i].text+"</b>");

		pmarkers.push(marker);
}
console.log('tweets', pmarkers.length);
// ++++++++++++++++++++++++++ 

}

//funcçao para permitir visualizaçao de tweets
function displayTweets()
{
	clust = $(this).val();

	if($(this).is(":checked") && clust == "0")
	{
			for(var i = 0; i < pmarkers.length; i++){
				// mcmarkers[i].setMap(map);
				map.addLayer(pmarkers[i]);
			}
	}
	else
	{
			for(var i = 0; i < pmarkers.length; i++){
				// mcmarkers[i].setMap(null);
				map.removeLayer(pmarkers[i]);
			}
	}
}

//funcçao para permitir visualizaçao de microClusters
function displayMicro()
{
	clust = $(this).val();

	if($(this).is(":checked") && clust == "0")
	{
			for(var i = 0; i < mcmarkers.length; i++){
				// mcmarkers[i].setMap(map);
				map.addLayer(mcmarkers[i]);
			}
	}
	else
	{
			for(var i = 0; i < mcmarkers.length; i++){
				// mcmarkers[i].setMap(null);
				map.removeLayer(mcmarkers[i]);
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
				// cmarkers[i].setMap(map);
				map.addLayer(cmarkers[i]);
			}
	}
	else
	{
			for(var i = 0; i < cmarkers.length; i++){
				// cmarkers[i].setMap(null);
				map.removeLayer(cmarkers[i]);
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
function getTimelineMovie(t){
	micro = microClusters;
	showPlaces(places,t);

	if(document.getElementById("radio_allDimensions").checked){ 
		macro = allClusters;
	}
	else if(document.getElementById("radio_timeDimension").checked){
		macro = timeClusters;
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		macro = spaceClusters;
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		macro = contentClusters;
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		macro = timeSpaceClusters;
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		macro = contentSpaceClusters;
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		macro = contentTimeClusters;
	}

    timelineData = [];

    var currentdate = new Date(); 
	var datetime = currentdate.getDate();
	var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});

	for (var i = 0; i < micro.length; i++) {

			var dStart = new Date(micro[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){

			var circle = new customCircleMarker([micro[i].center_lon, micro[i].center_lat], {
			color: 'blue',
		    fillColor: '#4099FF',
		    fillOpacity: 0.5, 
		    radius: micro[i].radius*7.5,
		    clusterid: micro[i].id,
		    testid: micro[i].test
		}).addTo(map);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+micro[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+micro[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+micro[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+micro[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+micro[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: " +micro[i].center_lat+" ; Longitude: "+micro[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+micro[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+micro[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+micro[i].creation_d+"</b>")

		mcmarkers.push(circle);

		circle.addEventListener("click", function() {
			// showInfo(this);
			console.log(this.options.clusterid);
			showThisClusterCloud(this.options.clusterid, 0);
			showThisClusterGraph(this.options.clusterid, 0);
  		});

		}
	}


	for (var i = 0; i < macro.length; i++) {

			var dStart = new Date(macro[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){
			
			var circle = new customCircleMarker([macro[i].center_lon, macro[i].center_lat], {
			color: 'green',
		    fillColor: '#5ADB98',
		    fillOpacity: 0.5, 
		    radius: macro[i].radius*75,
		    clusterid: macro[i].id,
		    testid: macro[i].test
		}).addTo(map);

		circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+macro[i].id+
			"</b><br><b style=color:#4099FF;>Npoints: "+macro[i].n+
			"</b><br><b style=color:#4099FF;>Nwords: "+macro[i].nwords+
			"</b><br><b style=color:#4099FF;>Weight: "+macro[i].weight+
			"</b><br><b style=color:#4099FF;>Radius: "+macro[i].radius+
			"</b><br><b style=color:#4099FF;>Latitude: " +macro[i].center_lat+" ; Longitude: "+macro[i].center_lon+
			"</b><br><b style=color:#4099FF;>Weekday: "+macro[i].center_wkd+
			"</b><br><b style=color:#4099FF;>Hour: "+macro[i].center_hou+
			"</b><br><b style=color:#4099FF;>Creation Time: "+macro[i].creation_d+"</b>")

		cmarkers.push(circle);

		circle.addEventListener("click", function() {
			// showInfo(this);
			console.log(this.options.clusterid);
			showThisClusterCloud(this.options.clusterid, 1);
			showThisClusterGraph(this.options.clusterid, 1);
			setTheseMicroClusters(this.options.testid);
  		});


		}
	}

	console.log("clusters", cmarkers.length);
	console.log("microclusters", mcmarkers.length);
}

//funcçao de inicializaçao da linha temporal - andar com micro/macro para tras ate 7 dias
// function getTimelineMovie_micro(t){
// 		var items = [];
	
// 	    $.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        getTimelineMovie_macro(items, t);
//          }, 'JSON');
// }

//funcçao de inicializaçao da linha temporal - andar com micro/macro para tras ate 7 dias
// function getTimelineMovie_macro(micro, t){
// 	var items = [];

// 	if(document.getElementById("radio_allDimensions").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getClusters';
// 	}
// 	else if(document.getElementById("radio_timeDimension").checked){
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getTimeClusters';
// 	}
// 	else if(document.getElementById("radio_spaceDimension").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters';
// 	}
// 	else if(document.getElementById("radio_contentDimension").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getContentClusters';
// 	}
// 	else if(document.getElementById("radio_timespaceDimension").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters';
// 	}
// 	else if(document.getElementById("radio_spacecontentDimension").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters';
// 	}
// 	else if(document.getElementById("radio_contenttimeDimension").checked){ 
// 		var url = 'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters';
// 	}

// 	$.getJSON( 
//         url,
//          {},
//          function(data) { 
//             	items=data;
// 		        getTimelineMovie(micro, items, t);
// 		        //loadTimeline(items);
// 		        showClustersGraph(items);
//          }, 'JSON');
// }

//funcçao do slider da linha temporal - andar com micro/macro para tras ate 7 dias
function TimelineSliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	if (t == 0){
		setMicroClusters(t);
		showPlaces(places,t);
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
	}else getTimelineMovie(t);
}

//funcçao do slider temporal - escolha de dia da semana para a visualizaçao de micro/macro
function sliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	setMicroClusters(t);
	showPlaces(places, t);
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
		// mcmarkers[i].setMap(null);
		map.removeLayer(mcmarkers[i]);
	}
	mcmarkers = [];
	for (var i = 0; i < cmarkers.length; i++ ) {
		// cmarkers[i].setMap(null);
		map.removeLayer(cmarkers[i]);
	}

	for (var i = 0; i < pmarkers.length; i++ ) {
		// cmarkers[i].setMap(null);
		map.removeLayer(pmarkers[i]);
	}

	pmarkers = [];
	mcmarkers = [];
	cmarkers = [];
}

//funcçao de inicializaçao da maquina do tempo
function readVerbetes(){

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
         	items=data;
			    // readAllTweets(items);
			    showVerbetes(items)
         }, 'JSON');
}

function readAllTweets(verbetes){

	    var items = [];
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getAllTweets',
         { },
         function(data) {
         	items = data;
         	showVerbetes(verbetes, items)
         }, 'JSON');

}

//funcçao de visualizaçao da maquina do tempo
function showVerbetes(verbetes){

		var theDiv = document.getElementById("streamMaquina");
		tweets = places;
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
				
					if((testTweet.indexOf(verbetes[j].person.toLowerCase()) != -1)){

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
// function setMicroClustersForWord_1(){
// 			$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setMicroClustersForWord_2(items);
//          }, 'JSON');
	    
// }

//funcçao de inicializaçao para busca de palavras
// function setMicroClustersForWord_2(items){

// 	    $.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
//          {},
//          function(data) { 
//             	words=data;
// 		        showMicroClustersForWord(items, words);
//          }, 'JSON');
// }

//funcçao de visualizaçao para busca de palavras
function showMicroClustersForWord(){

	items = microClusters;
	words = MicroClusterwords;

	var wordValue = document.getElementById('searchWord').value;
	var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});
	console.log(wordValue);

	for (var j = 0; j < words.length; j++) {
		if (words[j].word == wordValue) {

			for (var i = 0; i < items.length; i++) {
				if (items[i].id == words[j].mcluster_id) {

								var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
								color: 'blue',
							    fillColor: '#4099FF',
							    fillOpacity: 0.5, 
							    radius: items[i].radius*7.5,
							    clusterid: items[i].id,
							    testid: items[i].test
							}).addTo(map);

							circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
								"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
								"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
								"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
								"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
								"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
								"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
								"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
								"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

							mcmarkers.push(circle);

							circle.addEventListener("click", function() {
								// showInfo(this);
								console.log(this.options.clusterid);
								showThisClusterCloud(this.options.clusterid, 0);
								showThisClusterGraph(this.options.clusterid, 0);
					  		});
					
				}
			}

		}
	}
console.log("microclusters:", mcmarkers.length);
}

//funcçao de inicializaçao para busca de palavras
// function setClustersForWord_1(){
// 		var wordValue = document.getElementById('searchWord').value;
	    
// 	    if(document.getElementById("radio_allDimensions").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_timeDimension").checked){
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_spaceDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_contentDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_timespaceDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_spacecontentDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_contenttimeDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        setClustersForWord_2(items);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// }

//funcçao de inicializaçao para busca de palavras
// function setClustersForWord_2(items){

// 	    $.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
//          {},
//          function(data) { 
//             	words=data;
// 		        showClustersForWord(items, words);
//          }, 'JSON');
// }

//funcçao de visualizaçao para busca de palavras
function showClustersForWord(){

	if(document.getElementById("radio_allDimensions").checked){ 
		items = allClusters;
	}
	else if(document.getElementById("radio_timeDimension").checked){
		items = timeClusters;
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		items = spaceClusters;
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		items = contentClusters;
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		items = timeSpaceClusters;
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		items = contentSpaceClusters;
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		items = contentTimeClusters;
	}

	words = Clusterwords;

	var wordValue = document.getElementById('searchWord').value;
	var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});

	for (var j = 0; j < words.length; j++) {
		if (words[j].word == wordValue) {

			for (var i = 0; i < items.length; i++) {
				if (items[i].id == words[j].cluster_id) {

						var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'green',
						    fillColor: '#5ADB98',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*(items[i].weight/items[i].n)*175,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						cmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 1);
							showThisClusterGraph(this.options.clusterid, 1);
							setTheseMicroClusters(this.options.testid);
				  		});
					
				}
			}

		}
	}
console.log("clusters:", cmarkers.length);
}

function showPlacesForWord(){
	var wordValue = document.getElementById('searchWord').value;
	wordValue = wordValue.toLowerCase();
	var items = places;
	var len = items.length;
	var tweetIcon = L.icon({
	    iconUrl: 'image/tweet.png',

	    iconSize:     [15, 20], // size of the icon
	    // shadowSize:   [50, 64], // size of the shadow
	    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    // shadowAnchor: [4, 62],  // the same for the shadow
	    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	// for(var i = 0; i < len; i++){
	// 	L.marker(items[i].lat, items[i].lat).addTo(map);
	// }
	// +++++++++++++ MARKERS ++++++++++++++++
		for(var i = 0; i < len; i++){

		var n = wordValue.indexOf(items[i].text);
		var testTweet = items[i].text;
		// if((n != -1)){
		if(testTweet.match(wordValue)){
			if(items[i].text != ''){

			marker = L.marker([items[i].lon, items[i].lat], {icon: tweetIcon}).addTo(map);
			
			marker.bindPopup("<b style=color:#4099FF;>User: "+items[i].username+
				"</b><br><b style=color:#4099FF;>Latitude: "+items[i].lat+" ; Longitude: "+items[i].lon+
				"</b><br><b style=color:#4099FF;>Tweet: "+items[i].text+"</b>");

			pmarkers.push(marker);

			}   		
		}

}
console.log('tweets', pmarkers.length);
}

//funcçao do slider espacial - definiçao de regiao de visualizaçao
function SpatialsliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();

	if(t == 0){
		setMicroClusters(0);
		getPlaces();
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

	showMicroClustersRegion(t);
	showClustersRegion(t);
	showPlacesRegion(t);
	}
}

//funcçao de inicializaçao para slider espacial - definiçao de regiao de visualizaçao
// function setMicroClustersRegion(t){
// 		var items = [];
	
// 	    $.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showMicroClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// }

//funcçao de inicializaçao para slider espacial - definiçao de regiao de visualizaçao
// function setClustersRegion(t){
// 	var items = [];
		
// 	if(document.getElementById("radio_allDimensions").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_timeDimension").checked){
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getTimeClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_spaceDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getSpaceClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_contentDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getContentClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_timespaceDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getTimeSpaceClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_spacecontentDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getSpaceContentClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// 	else if(document.getElementById("radio_contenttimeDimension").checked){ 
// 	$.getJSON( 
//         'http://localhost:8080/basicWeb/index.php/site/getContentTimeClusters',
//          {},
//          function(data) { 
//             	items=data;
// 		        showClustersRegion(items, t);
// 		        // showClustersGraph(items);
//          }, 'JSON');
// 	}
// }

//funcçao de visualizaçao para slider espacial - definiçao de regiao de visualizaçao
function showMicroClustersRegion(t){

	var items = microClusters;
  	var len = items.length;
	mcmarkers = [];
	var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});
  	for(var i = 0; i < len; i++){

if(t == 1){
  			if((items[i].center_lat > -170) && (items[i].center_lat < -30)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 85)){

  			var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'blue',
						    fillColor: '#4099FF',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*7.5,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						mcmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 0);
							showThisClusterGraph(this.options.clusterid, 0);
				  		});
  			}
  		}
  	}else if(t == 2){
  			if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > 31) && (items[i].center_lon < 85)){

  			var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'blue',
						    fillColor: '#4099FF',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*7.5,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						mcmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 0);
							showThisClusterGraph(this.options.clusterid, 0);
				  		});
  			}
  		}

  } else{

  	  		if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 30)){

  			var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'blue',
						    fillColor: '#4099FF',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*7.5,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						mcmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 0);
							showThisClusterGraph(this.options.clusterid, 0);
				  		});
  			}
  		}
  }
}
console.log("microclusters:", mcmarkers.length);
}

//funcçao de visualizaçao para slider espacial - definiçao de regiao de visualizaçao
function showPlacesRegion(t){

	var items = places;
  	var len = items.length;
	pmarkers = [];

  	for(var i = 0; i < len; i++){

if(t == 1){
  			if((items[i].lat > -170) && (items[i].lat < -30)){
  			if((items[i].lon > -60) && (items[i].lon < 85)){

	
				var tweetIcon = L.icon({
				    iconUrl: 'image/tweet.png',

				    iconSize:     [15, 20], // size of the icon
				    // shadowSize:   [50, 64], // size of the shadow
				    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				    // shadowAnchor: [4, 62],  // the same for the shadow
				    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				});

				// for(var i = 0; i < len; i++){
				// 	L.marker(items[i].lat, items[i].lat).addTo(map);
				// }
				// +++++++++++++ MARKERS ++++++++++++++++

					marker = L.marker([items[i].lon, items[i].lat], {icon: tweetIcon}).addTo(map);

					marker.bindPopup("<b style=color:#4099FF;>User: "+items[i].username+
						"</b><br><b style=color:#4099FF;>Latitude: "+items[i].lat+" ; Longitude: "+items[i].lon+
						"</b><br><b style=color:#4099FF;>Tweet: "+items[i].text+"</b>");

					pmarkers.push(marker);
			
  			}
  		}
  	}else if(t == 2){
  			if((items[i].lat > -29) && (items[i].lat < 185)){
  			if((items[i].lon > 31) && (items[i].lon < 85)){

	
				var tweetIcon = L.icon({
				    iconUrl: 'image/tweet.png',

				    iconSize:     [15, 20], // size of the icon
				    // shadowSize:   [50, 64], // size of the shadow
				    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				    // shadowAnchor: [4, 62],  // the same for the shadow
				    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				});

				// for(var i = 0; i < len; i++){
				// 	L.marker(items[i].lat, items[i].lat).addTo(map);
				// }
				// +++++++++++++ MARKERS ++++++++++++++++

					marker = L.marker([items[i].lon, items[i].lat], {icon: tweetIcon}).addTo(map);

					marker.bindPopup("<b style=color:#4099FF;>User: "+items[i].username+
						"</b><br><b style=color:#4099FF;>Latitude: "+items[i].lat+" ; Longitude: "+items[i].lon+
						"</b><br><b style=color:#4099FF;>Tweet: "+items[i].text+"</b>");

					pmarkers.push(marker);
			

  			}
  		}

  } else{

  	  		if((items[i].lat > -29) && (items[i].lat < 185)){
  			if((items[i].lon > -60) && (items[i].lon < 30)){

  				var len = items.length;
	
				var tweetIcon = L.icon({
				    iconUrl: 'image/tweet.png',

				    iconSize:     [15, 20], // size of the icon
				    // shadowSize:   [50, 64], // size of the shadow
				    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				    // shadowAnchor: [4, 62],  // the same for the shadow
				    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				});

				// for(var i = 0; i < len; i++){
				// 	L.marker(items[i].lat, items[i].lat).addTo(map);
				// }
				// +++++++++++++ MARKERS ++++++++++++++++

					marker = L.marker([items[i].lon, items[i].lat], {icon: tweetIcon}).addTo(map);

					marker.bindPopup("<b style=color:#4099FF;>User: "+items[i].username+
						"</b><br><b style=color:#4099FF;>Latitude: "+items[i].lat+" ; Longitude: "+items[i].lon+
						"</b><br><b style=color:#4099FF;>Tweet: "+items[i].text+"</b>");

					pmarkers.push(marker);
			
  			}
  		}
  }
}
console.log("Tweets:", pmarkers.length);
}

//funcçao de visualizaçao para slider espacial - definiçao de regiao de visualizaçao
function showClustersRegion(t){

var customCircleMarker = L.CircleMarker.extend({
	   options: { 
	      clusterid: 'Custom data!',
	      testid: 'More data!'
		   }
		});

	if(document.getElementById("radio_allDimensions").checked){ 
		items = allClusters;
	}
	else if(document.getElementById("radio_timeDimension").checked){
		items = timeClusters;
	}
	else if(document.getElementById("radio_spaceDimension").checked){ 
		items = spaceClusters;
	}
	else if(document.getElementById("radio_contentDimension").checked){ 
		items = contentClusters;
	}
	else if(document.getElementById("radio_timespaceDimension").checked){ 
		items = timeSpaceClusters;
	}
	else if(document.getElementById("radio_spacecontentDimension").checked){ 
		items = contentSpaceClusters;
	}
	else if(document.getElementById("radio_contenttimeDimension").checked){ 
		items = contentTimeClusters;
	}

  	var len = items.length;
	cmarkers = [];

  	for(var i = 0; i < len; i++){

if(t == 1){
  			if((items[i].center_lat > -170) && (items[i].center_lat < -30)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 85)){

		var len = items.length;	

		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'green',
						    fillColor: '#5ADB98',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*(items[i].weight/items[i].n)*175,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						cmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 1);
							showThisClusterGraph(this.options.clusterid, 1);
							setTheseMicroClusters(this.options.testid);
				  		});
  			}
  		}
  	}else if(t == 2){
  			if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > 31) && (items[i].center_lon < 85)){

  	var len = items.length;	

		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'green',
						    fillColor: '#5ADB98',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*(items[i].weight/items[i].n)*175,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						cmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 1);
							showThisClusterGraph(this.options.clusterid, 1);
							setTheseMicroClusters(this.options.testid);
				  		});
  			}
  		}

  } else if(t == 3){

  	  		if((items[i].center_lat > -29) && (items[i].center_lat < 185)){
  			if((items[i].center_lon > -60) && (items[i].center_lon < 30)){

 var len = items.length;	

		var circle = new customCircleMarker([items[i].center_lon, items[i].center_lat], {
							color: 'green',
						    fillColor: '#5ADB98',
						    fillOpacity: 0.5, 
						    radius: items[i].radius*(items[i].weight/items[i].n)*175,
						    clusterid: items[i].id,
						    testid: items[i].test
						}).addTo(map);

						circle.bindPopup("<b style=color:#4099FF;>Cluster ID: "+items[i].id+
							"</b><br><b style=color:#4099FF;>Npoints: "+items[i].n+
							"</b><br><b style=color:#4099FF;>Nwords: "+items[i].nwords+
							"</b><br><b style=color:#4099FF;>Weight: "+items[i].weight+
							"</b><br><b style=color:#4099FF;>Radius: "+items[i].radius+
							"</b><br><b style=color:#4099FF;>Latitude: "+items[i].center_lat+" ; Longitude: "+items[i].center_lon+
							"</b><br><b style=color:#4099FF;>Weekday: "+items[i].center_wkd+
							"</b><br><b style=color:#4099FF;>Hour: "+items[i].center_hou+
							"</b><br><b style=color:#4099FF;>Creation Time: "+items[i].creation_d+"</b>")

						cmarkers.push(circle);

						circle.addEventListener("click", function() {
							// showInfo(this);
							console.log(this.options.clusterid);
							showThisClusterCloud(this.options.clusterid, 1);
							showThisClusterGraph(this.options.clusterid, 1);
							setTheseMicroClusters(this.options.testid);
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
	getPlaces();

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
	$("input[name='tweets']").change(displayTweets);
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
            showMicroClustersForWord();
            showClustersForWord();
            showPlacesForWord();

            }else{

			setMicroClusters(0);
			getPlaces();

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
	readVerbetes();
	// readVerbetes("https://services.sapo.pt/InformationRetrieval/Verbetes/Personalities/Names/getDocuments?ESBToken=01.EZs5j5fIZTMf326pOLmC9g&start="+start+"");
	for(var i = 0; i < cmarkers.length; i++){
		cmarkers[i].setMap(null);
	}
});
