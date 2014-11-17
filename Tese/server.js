// var socketServer = require('./socketServer');
// socketServer.init(8080, 9000);

// var dburl = 'localhost/socialecho';
// var collections = ['twitter'];
// var db = require('mongojs').connect(dburl, collections);

// 		BasicDBObject fields = new BasicDBObject("coordinates.coordinates",1).append("created_at", 1).append("id",1).append("user.id",1).append("user.screen_name", 1).append("text",1).append("_id",0).append("lang",1);


// db.twitter.findOne({lang: "pt", coordinates},function(err, found) {
// 	if (err) return console.error(err);

//         // String tweet = json.toString();

//         var text = found.text;
//         // String date = json.date;
//         var coordinates = found.coordinates;

//         console.log(text, coordinates);
// });

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);