var map;
var microclusters;
var clusters;
var mcmarkers;
var cmarkers;
var teste = 40;
var viz = 0;
var clust = 0;

function initialize()
{
	var mapProp = {
	  center:new google.maps.LatLng(0.0, 0.0),
	  zoom:2,
	  mapTypeId:google.maps.MapTypeId.TERRAIN,
	  mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById("map"),mapProp);
}

function setClusters(test){
	var items = [];
	$.ajaxSetup({
		async: false
	});
	var url = "clusters.php?test="+test;
	$.getJSON(url, function(data){
		items = data;
	});
	clusters=items;
}

function setMicroClusters(test){
	var items = [];
	
	$.ajaxSetup({
		async: false
	});
	var url = "microclusters.php?test="+test;
	$.getJSON(url, function(data){
		items = data;
	});
	microclusters = items;
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
		google.maps.event.addListener(marker, 'click', function() {
    		showInfo(this);
			showMicroClusterCloud(this.clusterid,this.testid);
  		});		
	}
}

function showClustersMap(){
	var items = clusters;		
	var len = items.length;	
	cmarkers = [];
	for(var i = 0; i < len; i++){
		var pos = new google.maps.LatLng(items[i].center_lat, items[i].center_lon);
		
		var circle = new google.maps.Circle({
			center:pos,
			radius:items[i].radius*20200*100,
			strokeColor:"#0000FF",
			strokeOpacity:0.8,
			strokeWeight:2,
			fillColor:"#0000FF",
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
    			showInfo(this);
				showClusterCloud(this.clusterid,this.testid);
  		});
	}
}

function showMicroClustersGraph(){
	var items = microclusters;
	var len = items.length;	
	
	var arr = [];
	
	for(var i = 0; i < len; i++){
		arr.push([items[i].center_wkd, items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
	}
     
    plot = $.jqplot('graph',[arr],{
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
                var cluster = microclusters[parseInt(pointIndex)];
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
				showInfo(opt);
				showMicroClusterCloud(cluster.id, cluster.test);
            }
    );
}

function showClustersGraph(){
	var items = clusters;
	var len = items.length;	
	
	var arr = [];
	
	for(var i = 0; i < len; i++){
		arr.push([items[i].center_wkd, items[i].center_hou, items[i].n,""]); //items[i].id.toString()]);
	}
     
    plot = $.jqplot('graph',[arr],{
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
				showInfo(opt);
				showClusterCloud(cluster.id, cluster.test);
            }
    );
}

function showInfo(info){
	$("#t_id").html(info.clusterid);        
	$("#t_npts").html(info.npts);
    $("#t_nwrds").html(info.nwrds);
    $("#t_geo").html(info.lat+" ; "+info.lon);
    $("#t_hou").html(info.hou);
    $("#t_wkd").html(info.wkd);
    $("#t_wei").html(info.weight);
    $("#t_rad").html(info.cradius);
    $("#t_ctime").html(info.cdate);
    $("#t_ltime").html(info.ldate);
}

function showMicroClusterCloud(id,test){
	
	$.ajaxSetup({
        async: false
    });

	var words = [];
	var url = "mcwords.php?id="+id+"&test="+test;
       
	$.getJSON(url, function(data){
                words = data;
        });

	var len = words.length;
	var htmlcode = "";

	for(var i = 0; i < len; i++){
		htmlcode = htmlcode+" <span data-weight='"+words[i].freq+"'>"+words[i].word+"</span>";
	}

	$("#wordcloud").html(htmlcode);

	var settings = {
        "size" : {
            "grid" : 1,
			"factor" : 0,
			"normalize" : false
        },
        "options" : {
            "color" : "random-dark",
			"rotationRatio" : 0 ,
            "printMultiplier" : 2,
			"sort" : "highest"
        },
        "font" : "Futura, Helvetica, sans-serif",
        "shape" : "square"
    }
    $( "#wordcloud" ).awesomeCloud( settings );
}

function showClusterCloud(id,test){
	
	$.ajaxSetup({
        async: false
    });

	var words = [];
	var url = "cwords.php?id="+id+"&test="+test;
       
	$.getJSON(url, function(data){
		words = data;
    });

	var len = words.length;
	//alert(len);
	var htmlcode = "";

	for(var i = 0; i < len; i++){
		htmlcode = htmlcode+" <span data-weight='"+words[i].freq+"'>"+words[i].word+"</span>";
	}

	$("#wordcloud").html(htmlcode);

	var settings = {
        "size" : {
            "grid" : 1,
			"factor" : 0,
			"normalize" : false
        },
        "options" : {
            "color" : "random-dark",
			"rotationRatio" : 0 ,
            "printMultiplier" : 2,
			"sort" : "highest"
        },
        "font" : "Futura, Helvetica, sans-serif",
        "shape" : "square"
    }
    $( "#wordcloud" ).awesomeCloud( settings );
}

function vizChanged()
{
	viz = $(this).val();

	if($(this).is(":checked") && viz == "0")
	{
		$('#graph').hide();
		$('#map').show();
	}
	else
	{
		$('#map').hide();
		$('#graph').show();
		if(clust == 0){
			showMicroClustersGraph();
		} else {
			showClustersGraph();
		}
		
	}
} 

function microMacro()
{
	clust = $(this).val();

	if($(this).is(":checked") && clust == "0")
	{
		if(viz == "0"){
			for(var i = 0; i < cmarkers.length; i++){
				cmarkers[i].setMap(null);
			}
			for(var i = 0; i < mcmarkers.length; i++){
				mcmarkers[i].setMap(map);
			}
			
		} else {
			showMicroClustersGraph();
		}
	}
	else
	{
		if(viz == "0"){
			for(var i = 0; i < mcmarkers.length; i++){
				mcmarkers[i].setMap(null);
			}
			for(var i = 0; i < cmarkers.length; i++){
				cmarkers[i].setMap(map);
			}
			
		} else {
			showClustersGraph();
		}
	}
} 	

function sliderChanged() {
	var t = parseInt(teste) + parseInt($(this).val());
	clearOverlays();
	setClusters(t);
	setMicroClusters(t);
	//$("#radio_micro").prop('checked', true);
	//$("#radio_geo").prop('checked', true);
	showMicroClustersMap();
	showClustersMap();
	if(viz == 0){
		if(clust == 0){
			for(var i = 0; i < cmarkers.length; i++){
				cmarkers[i].setMap(null);
			}
		} else {
			for(var i = 0; i < cmarkers.length; i++){
				mcmarkers[i].setMap(null);
			}
		}
	} else {
		if(clust == 0){
			showMicroClustersGraph();
		} else {
			showClustersGraph();
		}
	}
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
	
$(document).ready(function(){
	
	$('#graph').hide();
	$("input[name='viz']").change(vizChanged);
	$("input[name='clustering']").change(microMacro);
	$("input[name='points']").change(sliderChanged);
	initialize();
	setClusters(teste);
	setMicroClusters(teste);
	showMicroClustersMap();
	showClustersMap();
	for(var i = 0; i < cmarkers.length; i++){
		cmarkers[i].setMap(null);
	}
});
