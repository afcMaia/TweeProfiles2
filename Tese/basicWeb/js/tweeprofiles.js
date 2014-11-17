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
}

function setClusters(t){
	var items = [];
	
	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) {
            	items=data;
		        showClustersMap(items, t);
		        // showClustersGraph(items);
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
		        loadTimeline(items);
		        showClustersGraph(items);
         }, 'JSON');
}

function showMicroClustersMap(items, t){
	if(t == 0){
	var len = items.length;
	mcmarkers = [];
	//alert(items.len);
	for(var i = 0; i < len; i++){
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

function showClustersMap(items, t){
if(t == 0){
var len = items.length;	
	cmarkers = [];
	for(var i = 0; i < len; i++){
		var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*100,
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

		// var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		// +"<br />"+ " Npoints: "+items[i].n
		// +"<br />"+ " Nwords: "+items[i].nwords
		// +"<br />"+ " Weight: "+items[i].weight
		// +"<br />"+ " Radius: "+items[i].radius
		// +"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		// +"<br />"+ " Weekday: "+items[i].center_wkd
		// +"<br />"+ " Hour: "+items[i].center_hou
		// +"<br />"+ " Creation Time: "+items[i].creation_d;

		// var infowindow = new google.maps.InfoWindow();

		// google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		//     return function() {

		//     	closeInfos();

		//         infowindow.setContent(content);
		//         infowindow.open(map,circle);
		// 		infos[0]=infowindow;
		//     };
		// })(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
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
			radius:items[i].radius*20200*100,
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

		// var content = '<div id="content" style="color:#4099FF;">'+"Cluster ID:"+items[i].id
		// +"<br />"+ " Npoints: "+items[i].n
		// +"<br />"+ " Nwords: "+items[i].nwords
		// +"<br />"+ " Weight: "+items[i].weight
		// +"<br />"+ " Radius: "+items[i].radius
		// +"<br />"+ " Position: "+items[i].center_lat+";"+items[i].center_lon
		// +"<br />"+ " Weekday: "+items[i].center_wkd
		// +"<br />"+ " Hour: "+items[i].center_hou
		// +"<br />"+ " Creation Time: "+items[i].creation_d;

		// var infowindow = new google.maps.InfoWindow();

		// google.maps.event.addListener(circle,'click', (function(circle,content,infowindow){ 
		//     return function() {

		//     	closeInfos();

		//         infowindow.setContent(content);
		//         infowindow.open(map,circle);
		// 		infos[0]=infowindow;
		//     };
		// })(circle,content,infowindow));

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
  		});
	}
	}
}
	console.log("clusters", cmarkers.length);
	setClusterCloud();
}

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

function showThisClusterCloud(id, x){
	radiobtn = document.getElementById("radio_wordcloud");
	radiobtn.checked = false;

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
				// showInfo(opt);
				// showClusterCloud(cluster.id, cluster.test);
            }
    );
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
         }, 'JSON');
}

function showTweets(items){
	var len = items.length;
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

function showNews(words){
	var len = words.length;
	var theDiv = document.getElementById("streamNews");
}

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

function showClustersGraph(items){
	var len = items.length;	
	
	var arr = [];

//****************************
// 	for(var i = 0; i < len; i++){
// 		arr.push([parseFloat(items[i].center_wkd), parseFloat(items[i].center_hou), items[i].n]); //items[i].id.toString()]);
// 	}
	         


//         for(var i = 0; i < arr.length; i++){

//     	$('#timetable').highcharts({

//         chart: {
//             type: 'bubble',
//             zoomType: 'xy'
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
//         	data: [arr[i]],
//         	marker: {
//                 fillColor: {
//                     radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
//                     stops: [
//                         [0, 'rgba(255,255,255,0.5)'],
//                         [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
//                     ]
//                 }
//             }	
//         }]
// 	});
// }
//********************************
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
				// showInfo(opt);
				// showClusterCloud(cluster.id, cluster.test);
            }
    );
}

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

function loadTimeline(items){
	    // DOM element where the Timeline will be attached
    var container = document.getElementById('my-timeline');
    // Create a DataSet with data (enables two way data binding)
    timelineData = [];

	for (var i = 0; i < 5; i++) {
		if (items[i].nwords > 20) {
			var dStart = new Date(items[i].creation_d);
			var dEnd = new Date(items[i].lastedit_d);
			var newStartDate = dStart.getUTCFullYear() + '-' + (dStart.getUTCMonth() + 1) + '-' + dStart.getUTCDate();
			var newEndDate = dEnd.getUTCFullYear() + '-' + (dEnd.getUTCMonth() + 1) + '-' + dEnd.getUTCDate();
			timelineData.push({id: items[i].id, content: 'MicroCluster'+items[i].id, start: items[i].creation_d, end: items[i].lastedit_d});
		};
	}

    var data = new vis.DataSet(timelineData);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, data, options);
}

function getTimelineMovie(t){

    timelineData = [];

    var currentdate = new Date(); 
	var datetime = currentdate.getDate();

	var items = [];

    $.getJSON( 
    'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
     {},
     function(data) { 
        	items=data;
	        // showMicroClustersMap(items, t);
	        // loadTimeline(items);
	        // showClustersGraph(items);

	for (var i = 0; i < items.length; i++) {

			var dStart = new Date(items[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){
				console.log(datetime - newStartDate);
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
	}, 'JSON');

$.getJSON( 
    'http://localhost:8080/basicWeb/index.php/site/getClusters',
     {},
     function(data) { 
        	items=data;
	        // showMicroClustersMap(items, t);
	        // loadTimeline(items);
	        // showClustersGraph(items);

	for (var i = 0; i < items.length; i++) {

			var dStart = new Date(items[i].creation_d);
			var newStartDate = dStart.getUTCDate();

			if((datetime - newStartDate) == t || (datetime - newStartDate) == -t){
				console.log(datetime - newStartDate);
			var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*100,
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

		cmarkers.push(circle);
		
		google.maps.event.addListener(circle, 'click', function() {
    			// showInfo(this);
				showThisClusterCloud(this.clusterid, 1);
				showThisClusterGraph(this.clusterid, 1);
  		});	
		}
	}
	}, 'JSON');
}

function TimelineSliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	if (t == 0){
		setMicroClusters(t);
		setClusters(t);
	}else getTimelineMovie(t);
}

function sliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	setMicroClusters(t);
	setClusters(t);
}

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

function readVerbetes(url){
	var testUrl = "https://services.sapo.pt/InformationRetrieval/Verbetes/GetPersonalities";
	var testTweet = "Eu sou o Abdel Moez Ibrahim";
	var theDiv = document.getElementById("streamMaquina");
	    $.getJSON( 
    url,
     {},
     function(data) {
     	// console.log(data.response.docs.length);
     	for (var i = 0; i < data.response.docs.length; i++) {     	
     	if (testTweet.indexOf(data.response.docs[i].name_t_s) != -1){
     		// console.log(data.response.docs[i]);
     		var content = '<div id="contenttweets" style="font-family: fantasy;"> <a style="color:#4099FF;" href="http://maquinadotempo.sapo.pt">'+data.response.docs[i].name_t_s+'</a>'+"</br>"+"</div>";
			theDiv.innerHTML += content;
     	}
     	}
     }, 'JSON');
}

function setMicroClustersForWord_1(){
			$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClusters',
         {},
         function(data) { 
            	items=data;
		        setMicroClustersForWord_2(items);
         }, 'JSON');
	    
}

function setMicroClustersForWord_2(items){

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getMicroClustersWords',
         {},
         function(data) { 
            	words=data;
		        showMicroClustersForWord(items, words);
         }, 'JSON');
}

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

function setClustersForWord_1(){
		var wordValue = document.getElementById('searchWord').value;
		if(wordValue != ''){
			$.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClusters',
         {},
         function(data) { 
            	items=data;
		        setClustersForWord_2(items);
         }, 'JSON');
		}else{
			getPlaces();
			setMicroClusters(0);
			setClusters(0);
		}
	    
}

function setClustersForWord_2(items){

	    $.getJSON( 
        'http://localhost:8080/basicWeb/index.php/site/getClustersWords',
         {},
         function(data) { 
            	words=data;
		        showClustersForWord(items, words);
         }, 'JSON');
}

function showClustersForWord(items, words){
	var wordValue = document.getElementById('searchWord').value;

	for (var j = 0; j < words.length; j++) {
		if (words[j].word == wordValue) {

			for (var i = 0; i < items.length; i++) {
				if (items[i].id == words[j].cluster_id) {

						var pos = new google.maps.LatLng(items[i].center_lon, items[i].center_lat);
						
						var circle = new google.maps.Circle({
							center:pos,
							radius:items[i].radius*20200*100,
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

function SpatialsliderChanged() {
	var t = parseInt($(this).val());
	clearOverlays();
	setMicroClustersRegion(t);
}

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

function showMicroClustersRegion(items, t){
	clearOverlays();
	var northAmericaLon = [];
  	var northAmericaLat = [];

	var regionNorthAmericaCoords = [
    new google.maps.LatLng(68.624544,-167.124023),
    new google.maps.LatLng(70.422079,-162.202148),
    new google.maps.LatLng(71.399165,-156.533203),
	new google.maps.LatLng(69.718107,-135.527344),
    new google.maps.LatLng(70.988349,-127.705078),
    new google.maps.LatLng(74.54333,-124.804687),
    new google.maps.LatLng(74.70645,-121.025391),
    new google.maps.LatLng(73.073844,-111.445312),
    new google.maps.LatLng(73.971078,-105.908203),
    new google.maps.LatLng(74.378513,-93.691406),
    new google.maps.LatLng(73.77578,-77.255859),
    new google.maps.LatLng(70.020587,-66.621094),
    new google.maps.LatLng(68.4638,-65.917969),
    new google.maps.LatLng(66.82652,-60.732422),
    new google.maps.LatLng(60.930432,-64.599609),
    new google.maps.LatLng(55.776573,-59.853516),
	new google.maps.LatLng(54.059388,-55.634766),		
    new google.maps.LatLng(49.95122,-54.931641),	
    new google.maps.LatLng(49.037868,-52.734375),		
    new google.maps.LatLng(46.498392,-52.470703),
    new google.maps.LatLng(45.95115,-56.689453),
    new google.maps.LatLng(45.767523,-59.765625),
    new google.maps.LatLng(43.389082,-65.522461),
    new google.maps.LatLng(43.644026,-66.269531),
    new google.maps.LatLng(44.777936,-66.972656),
    new google.maps.LatLng(43.580391,-70.180664),
    new google.maps.LatLng(41.967659,-70.3125),
    new google.maps.LatLng(41.902277,-69.851074),
    new google.maps.LatLng(41.19519,-69.916992),
    new google.maps.LatLng(40.346544,-73.762207),
    new google.maps.LatLng(36.967449,-75.849609),
    new google.maps.LatLng(35.263562,-75.366211),
    new google.maps.LatLng(31.840233,-81.013184),
    new google.maps.LatLng(30.42973,-81.364746),
    new google.maps.LatLng(26.74561,-79.892578),
    new google.maps.LatLng(25.085599,-80.310059),
    new google.maps.LatLng(24.487149,-81.89209),
    new google.maps.LatLng(24.746831,-81.826172),
    new google.maps.LatLng(25.165173,-81.298828),
    new google.maps.LatLng(27.722436,-83.012695),
    new google.maps.LatLng(29.05617,-83.034668),
    new google.maps.LatLng(30.012031,-84.04541),
    new google.maps.LatLng(29.51611,-85.341797),
    new google.maps.LatLng(30.221102,-89.099121),
    new google.maps.LatLng(29.094577,-88.989258),
    new google.maps.LatLng(28.940862,-89.25293),
    new google.maps.LatLng(29.05617,-91.032715),
    new google.maps.LatLng(29.53523,-94.350586),
    new google.maps.LatLng(27.196014,-97.316895),
    new google.maps.LatLng(25.859224,-97.009277),
    new google.maps.LatLng(22.065278,-97.668457),
    new google.maps.LatLng(18.39623,-94.438477),
    new google.maps.LatLng(19.580493,-90.812988),
    new google.maps.LatLng(21.063997,-90.461426),
    new google.maps.LatLng(21.71868,-88.132324),
    new google.maps.LatLng(21.432617,-86.638184),
    new google.maps.LatLng(18.479609,-87.780762),
    new google.maps.LatLng(17.895114,-89.230957),
    new google.maps.LatLng(17.811456,-91.010742),
    new google.maps.LatLng(16.214675,-90.922852),
    new google.maps.LatLng(16.066929,-91.82373),
    new google.maps.LatLng(14.51978,-92.285156),
    new google.maps.LatLng(16.172473,-94.592285),
    new google.maps.LatLng(15.474857,-96.503906),
    new google.maps.LatLng(18.271086,-103.601074),
    new google.maps.LatLng(19.269665,-105.073242),
    new google.maps.LatLng(20.427013,-105.776367),
    new google.maps.LatLng(21.453069,-105.380859),
    new google.maps.LatLng(25.621716,-109.467773),
    new google.maps.LatLng(28.921631,-112.214355),
    new google.maps.LatLng(31.147006,-113.312988),
    new google.maps.LatLng(31.559815,-114.675293),
    new google.maps.LatLng(30.145127,-114.455566),
    new google.maps.LatLng(28.516969,-112.763672),
    new google.maps.LatLng(27.877928,-112.653809),
    new google.maps.LatLng(26.529565,-111.335449),
    new google.maps.LatLng(24.607069,-110.522461),
    new google.maps.LatLng(24.507143,-109.819336),
    new google.maps.LatLng(23.483401,-109.27002),
    new google.maps.LatLng(23.099944,-109.511719),
    new google.maps.LatLng(22.735657,-109.951172),
    new google.maps.LatLng(23.5237,-110.390625),
    new google.maps.LatLng(24.826625,-112.346191),
    new google.maps.LatLng(25.383735,-112.192383),
    new google.maps.LatLng(26.135714,-112.434082),
    new google.maps.LatLng(27.15692,-114.543457),
    new google.maps.LatLng(27.916767,-115.246582),
    new google.maps.LatLng(27.955591,-114.367676),
    new google.maps.LatLng(28.555576,-114.23584),
    new google.maps.LatLng(29.802518,-115.795898),
    new google.maps.LatLng(33.504759,-117.79541),
    new google.maps.LatLng(33.742613,-118.476562),
    new google.maps.LatLng(33.92513,-118.520508),
    new google.maps.LatLng(33.979809,-119.047852),
    new google.maps.LatLng(34.397845,-119.553223),
    new google.maps.LatLng(34.452218,-120.629883),
    new google.maps.LatLng(35.101934,-120.739746),
    new google.maps.LatLng(36.279707,-121.948242),
    new google.maps.LatLng(38.030786,-123.068848),
    new google.maps.LatLng(38.942321,-123.771973),
    new google.maps.LatLng(40.463666,-124.475098),
    new google.maps.LatLng(40.996484,-124.189453),
    new google.maps.LatLng(42.843751,-124.650879),
    new google.maps.LatLng(43.675818,-124.255371),
    new google.maps.LatLng(46.073231,-124.057617),
    new google.maps.LatLng(48.516604,-124.848633),
    new google.maps.LatLng(50.120578,-127.924805),
    new google.maps.LatLng(52.722986,-132.363281),
    new google.maps.LatLng(53.800651,-133.330078),
    new google.maps.LatLng(54.699234,-132.978516),
    new google.maps.LatLng(56.992883,-135.966797),
    new google.maps.LatLng(58.263287,-136.933594),
    new google.maps.LatLng(59.95501,-142.207031),
    new google.maps.LatLng(59.778522,-147.788086),
    new google.maps.LatLng(57.539417,-152.050781),
    new google.maps.LatLng(56.486762,-154.248047),
    new google.maps.LatLng(57.492214,-155.34668),
    new google.maps.LatLng(55.924586,-158.378906),
    new google.maps.LatLng(52.749594,-168.969727),
    new google.maps.LatLng(51.096623,-179.25293),
    new google.maps.LatLng(52.722986,172.133789),
    new google.maps.LatLng(53.304621,172.705078),
    new google.maps.LatLng(52.05249,-178.154297),
    new google.maps.LatLng(53.566414,-168.266602),
    new google.maps.LatLng(56.968936,-158.862305),
    new google.maps.LatLng(58.332567,-157.851562),
    new google.maps.LatLng(59.800634,-162.333984),
    new google.maps.LatLng(59.778522,-164.53125),
    new google.maps.LatLng(61.773123,-166.420898),
    new google.maps.LatLng(63.292939,-164.487305),
    new google.maps.LatLng(63.685248,-161.323242),
    new google.maps.LatLng(64.358931,-162.421875),
    new google.maps.LatLng(64.491725,-166.420898),
    new google.maps.LatLng(65.694476,-168.310547),
    new google.maps.LatLng(67.050304,-163.87207)
  ];
  	

  for(var j = 0; j < regionNorthAmericaCoords.length; j++){
  	
  	northAmericaLon.push(regionNorthAmericaCoords[j].k);
  	northAmericaLat.push(regionNorthAmericaCoords[j].B);
  }
console.log("max lon",Math.max.apply(null,northAmericaLon));
console.log("max lat",Math.max.apply(null,northAmericaLat));

console.log("min lon",Math.min.apply(null,northAmericaLon));
console.log("min lat",Math.min.apply(null,northAmericaLat));

  	var len = items.length;
	mcmarkers = [];

  	for(var i = 0; i < len; i++){
  			
  		if(Math.min.apply(null,northAmericaLon) < items[i].center_lon < Math.max.apply(null,northAmericaLon)){
  			if(Math.min.apply(null,northAmericaLat) < items[i].center_lat < Math.max.apply(null,northAmericaLat)){

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
console.log(mcmarkers.length);
}

$(document).ready(function(){
	$("input[name='microclustering']").change(displayMicro);
	$("input[name='macroclustering']").change(displayMacro);
	$("input[name='tweets']").change(toggleHeatmap);
	$("input[name='tempopoints']").change(sliderChanged);
	$("input[name='spatialpoints']").change(SpatialsliderChanged);
	$("input[name='pointsTimeline']").change(TimelineSliderChanged);
	$("input[name='wordcloudAll']").change(setClusterCloud);
	// $("input[name='searchWord']").change(showMicroClustersForWord);
	// document.getElementById("searchWord").onkeypress = function() {showMicroClustersForWord()};
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
			setClusters(0);
		}
       }
	});

	initialize();
	getPlaces();
	setMicroClusters(0);
	setClusters(0);
	readVerbetes("https://services.sapo.pt/InformationRetrieval/Verbetes/Personalities/Names/getDocuments?ESBToken=01.EZs5j5fIZTMf326pOLmC9g&start="+start+"");
	for(var i = 0; i < cmarkers.length; i++){
		cmarkers[i].setMap(null);
	}
});
