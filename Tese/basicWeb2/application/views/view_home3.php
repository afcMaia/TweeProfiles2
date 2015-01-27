<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- <meta http-equiv="refresh" content="600">   -->

    <title>TweeProfiles3</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url();?>css/bootstrap.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/jquery.jqplot.min.css" />
    <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css' rel='stylesheet' />
    <link href='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css' rel='stylesheet' />
    <link href='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css' rel='stylesheet' />
    <link href="http://visjs.org/dist/vis.css" rel="stylesheet" type="text/css" />
     <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/themes/css/cartodb.css" />
    <!-- Bootstrap theme -->
    <!-- <link href="css/bootstrap-theme.min.css" rel="stylesheet"> -->

    <!-- Custom CSS -->
    <link href="<?php echo base_url();?>css/scrolling-nav2.css" type="text/css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- TweeProfiles2 JavaScript -->
    <!--<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBnMv6QNW-8AeVILsEuahE6k9UqngFmJkQ&sensor=false"></script>-->
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/tweeprofiles3.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=visualization"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/d3.layout.cloud.js"></script>

     <script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.js"></script>
    <!-- <script src="Scripts/modernizr.custom.61082.js"></script>
    <script src="Scripts/pixSocket.js"></script>
    <script src="Scripts/script.js"></script> -->
    <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js'></script>
    <script src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js'></script>

    <script src="http://simile.mit.edu/timeline/api/timeline-api.js" type="text/javascript"></script>

</head>

<!-- The #page-top ID is part of the scrolling feature - the data-spy and data-target are part of the built-in Bootstrap scrollspy function -->

<!-- <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top" onload="onLoad();" onresize="onResize();"> -->

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="#intro" style="color:#4099FF; font-family: fantasy;">TweeProfiles3</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                    <li class="hidden">
                        <a class="page-scroll" href="#page-top"></a>
                    </li>
                    <!-- <li>
                        <a class="page-scroll" href="#services" style="color:#4099FF; font-family: fantasy;">Timeline</a>
                    </li> -->
<!--                     <li>
                        <a class="page-scroll" href="#contact" style="color:#4099FF; font-family: fantasy;">Contact</a>
                    </li> -->
                </ul>
                 <div id="twitterPic">   
                    <img src="<?php echo base_url();?>image/twitter_icon.jpg" alt="Twitter" width="45" height="45">     
                </div>
            </div>

            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Intro Section -->
    <section id="intro" class="intro-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">

                    <button id="showbutton" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; position: absolute; left:5%; top:-45px; width: 8%;" onclick="if(document.getElementById('controls') .style.display=='none') {document.getElementById('controls') .style.display=''; document.getElementById('showDimension') .style.display='none'; document.getElementById('dimensionsControl') .style.display='none'}else{document.getElementById('controls') .style.display='none'; document.getElementById('showDimension') .style.display=''; document.getElementById('dimensionsControl') .style.display='none'}">Filters</button>
                    <button id="showDimension" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; position: absolute; left:15%; top:-45px; width: 8%;" onclick="if(document.getElementById('dimensionsControl') .style.display=='none') {document.getElementById('dimensionsControl') .style.display=''}else{document.getElementById('dimensionsControl') .style.display='none'}">Dimensions</button>

                    <hr noshade="" size="1" width="1150" style="position: absolute; top:-25px; left:5%">

                    <div id="controls" style="display:none;">
                        <div id="dimension" style="left:1%;">
                            Spatial
                            <input id="slider" type="range" name="spatialpoints" min="0" max="3" list="Spts" value="0">
                            <datalist id="Spts">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </datalist>
                        </div>
                        <div id="dimension" style="left:20%;">
                            Temporal (Weekdays)
                            <input id="slider" type="range" name="tempopoints" min="0" max="8" list="Tpts" value="0">
                            <datalist id="Tpts">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </datalist>
                        </div>
                        <div id="dimension" style="left:40%;">
                            <form>
                                <label for="name">Content:</label>
                                <input type="text" name="searchWord" id="searchWord">
                                <!-- <input type="submit" value="Submit"> -->
                            </form>
    <!--                         <input id="slider" type="range" name="points1" min="0" max="3" list="Cpts" value="0">
                            <datalist id="Cpts">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </datalist> -->
                        </div>
                         <div id="dimension" style="left:75%;">
                            Timeline
                            <input id="slider" type="range" name="pointsTimeline" min="0" max="8" list="timpts" value="0">
                            <datalist id="timpts">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                            </datalist>
                        </div>
                    </div>

            <form id="dimensionsControl" style="display:none; position: absolute; top:-55px;">
            <input type="radio" name="UseDimension" id="radio_allDimensions" value="0" checked/>
            <label for="radio_allDimensions" style="color:#4099FF; font-family: fantasy; font-size:12px;">All Dimensions </label>

            <input type="radio" name="UseDimension" id="radio_timeDimension" value="1"/>
            <label for="radio_timeDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Time </label>

            <input type="radio" name="UseDimension" id="radio_spaceDimension" value="1" />
            <label for="radio_spaceDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Space </label>

            <input type="radio" name="UseDimension" id="radio_contentDimension" value="1" />
            <label for="radio_contentDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Content </label><br>

            <input type="radio" name="UseDimension" id="radio_timespaceDimension" value="1"/>
            <label for="radio_timeDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Time and Space </label>

            <input type="radio" name="UseDimension" id="radio_spacecontentDimension" value="1" />
            <label for="radio_spaceDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Space and Content </label>

            <input type="radio" name="UseDimension" id="radio_contenttimeDimension" value="1" />
            <label for="radio_contentDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Content and Time </label><br>

            <button id="reloadDim" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; font-size:12px; position: absolute; left:80%; top:20px; width: auto; height:25px;"> Reload</button>

            </form>

                    <button id="tweets" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; font-size:12px; position: absolute; top:-35px; left:79%; width: auto; height:25px;" onclick="document.getElementById('streamMaquina') .style.display='none'; document.getElementById('streamNews') .style.display='none'; document.getElementById('info') .style.display='none'; if(document.getElementById('streamTweets') .style.display=='none') {document.getElementById('streamTweets') .style.display=''}else{document.getElementById('streamTweets') .style.display='none'; document.getElementById('info') .style.display=''}">Tweets</button>

                    <button id="news" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; font-size:12px; position: absolute; top:-35px; left:85.1%; width: auto; height:25px;" onclick="document.getElementById('streamTweets') .style.display='none'; document.getElementById('streamMaquina') .style.display='none'; document.getElementById('info') .style.display='none';if(document.getElementById('streamNews') .style.display=='none') {document.getElementById('streamNews') .style.display=''}else{document.getElementById('streamNews') .style.display='none' ; document.getElementById('info') .style.display=''}">Sapo News</button>

                    <button id="maquina" type="button" class="btn btn-default" style="color:#4099FF; font-family: fantasy; font-size:12px; position: absolute; top:-35px; left:93%; width: auto; height:25px;" onclick="document.getElementById('streamTweets') .style.display='none'; document.getElementById('streamNews') .style.display='none'; document.getElementById('info') .style.display='none';if(document.getElementById('streamMaquina') .style.display=='none') {document.getElementById('streamMaquina') .style.display=''}else{document.getElementById('streamMaquina') .style.display='none' ; document.getElementById('info') .style.display=''}">Maquina do Tempo</button>
                </div>

             <!-- <input type="checkbox" value="checked" name="mccheckbox" checked> MicroClusters -->


<!--             <input type="checkbox" name="allDimensions" id="checkbox_allDimensions" value="0" checked />
            <label for="checkbox_allDimensions" style="color:#4099FF; font-family: fantasy; font-size:12px;"=>All Dimensions</label>
            <input type="checkbox" name="timeDimension" id="checkbox_timeDimension" value="0" />
            <label for="checkbox_timeDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Time Dimension</label>
            <input type="checkbox" name="spaceDimension" id="checkbox_spaceDimension" value="0" checked />
            <label for="checkbox_spaceDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;">Space Dimensions</label>
            <input type="checkbox" name="contentDimension" id="checkbox_contentDimension" value="0" checked />
            <label for="checkbox_contentDimension" style="color:#4099FF; font-family: fantasy; font-size:12px;"=>Content Dimension</label> -->
    
            <input type="checkbox" name="tweets" id="checkbox_tweets" value="0" checked />
            <label for="checkbox_macro" style="color:#4099FF; font-family: fantasy; font-size:12px;"=>Tweets</label>
            <input type="checkbox" name="microclustering" id="checkbox_micro" value="0" checked />
            <label for="checkbox_micro" style="color:#4099FF; font-family: fantasy; font-size:12px;">MicroClusters</label>
            <input type="checkbox" name="macroclustering" id="checkbox_macro" value="0" checked />
            <label for="checkbox_macro" style="color:#4099FF; font-family: fantasy; font-size:12px;">MacroClusters</label>
                
                <div id="map"></div>

                <script>
//     L.mapbox.accessToken = 'pk.eyJ1IjoiaW5zb21uaWFjeSIsImEiOiJVNmZuaUZzIn0.-vyJcMkVt5BsoANudSHA4w';

// var map = L.mapbox.map('map')
//     .setView([39, 8], 2);
//     // getPlaces();
</script>

                <div id="streamTweets" style="display:none;">
                </div>
                <div id="streamNews" style="display:none;">
                </div>
                <div id="streamMaquina" style="display:none;">
                </div>

                <div id="info">
                    <div id="wordcloud"></div>
                    <div id="timetable"></div>
                </div>
                <!-- <a class="btn btn-default page-scroll" href="#about">Click Me to Scroll Down!</a> -->
            </div>
        </div>
    </section>

    <!-- About Section -->
<!--     <section id="about" class="about-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12"> -->
                    <!-- <div id="wordcloud"></div>
                    <div id="wordcloudControls"> -->
<!--                         <input type="radio" name="wordcloudAll" id="radio_wordcloud" value="0" checked />
                        <label for="radio_wordcloud" style="color:#4099FF; font-family: fantasy; font-size:12px;"=>All Words</label>
                    </div>  -->
                    <!-- <div id="timetable"></div> -->
<!--                 </div>
            </div>
        </div>
    </section> -->

    <!-- Services Section -->
    <!-- <section id="services" class="services-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">

                    <div id="my-timeline"></div>
                </div>
            </div>
        </div>
    </section> -->

    <!-- Contact Section -->
<!--     <section id="contact" class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Contact Section</h1>
                </div>
            </div>
        </div>
    </section> -->

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Scrolling Nav JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/scrolling-nav.js"></script>

    <!-- Bubble chart JavaScript -->
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery.jqplot.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/jqplot.bubbleRenderer.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/jquery.awesomeCloud-0.2.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/highcharts.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/highcharts-more.js"></script>
    <script type="text/javascript" src="<?php echo base_url();?>js/exporting.js"></script>
    <script src="http://visjs.org/dist/vis.js"></script>

    <!-- <link rel="stylesheet" type="text/css" href="http://visapi-gadgets.googlecode.com/svn/trunk/wordcloud/wc.css"/> 
    <script type="text/javascript" src="http://visapi-gadgets.googlecode.com/svn/trunk/wordcloud/wc.js"></script>-->
    <script type="text/javascript" src="http://www.google.com/jsapi"></script>

    <script type="text/javascript">
      // google.load("visualization", "1");
      // google.setOnLoadCallback(draw);
      // function draw() {
      //   var data = new google.visualization.DataTable();
      //   data.addColumn('string', 'Text1');
      //   data.addColumn('string', 'Text2');
      //   data.addRows(3);
      //   data.setCell(0, 0, 'This is a test');
      //   data.setCell(0, 1, 'This test is quite hard');
      //   data.setCell(1, 0, 'A hard test or not?');
      //   data.setCell(1, 1, 'This was not too hard');
      //   data.setCell(2, 0, 'Hard hard hard this is so hard !!!');
      //   data.setCell(2, 1, 'For every test there is a solution. For every one');
      //   var outputDiv = document.getElementById('wordcloud');
      //   var wc = new WordCloud(outputDiv);
      //   wc.draw(data, null);
      // }
    </script>

    <script type="text/javascript">
            // var tl;
            // function onLoad() {
            //   var bandInfos = [
            //     Timeline.createBandInfo({
            //         width:          "70%", 
            //         intervalUnit:   Timeline.DateTime.MONTH, 
            //         intervalPixels: 100
            //     }),
            //     Timeline.createBandInfo({
            //         width:          "30%", 
            //         intervalUnit:   Timeline.DateTime.YEAR, 
            //         intervalPixels: 200
            //     })
            //   ];
            //   tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
            // }

            // var resizeTimerID = null;
            // function onResize() {
            //     if (resizeTimerID == null) {
            //         resizeTimerID = window.setTimeout(function() {
            //             resizeTimerID = null;
            //             tl.layout();
            //         }, 500);
            //     }
            // }
    </script>

</body>

</html>
