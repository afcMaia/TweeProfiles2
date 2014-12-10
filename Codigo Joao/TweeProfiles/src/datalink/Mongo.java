 package datalink;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.Map;

import com.json.parsers.JSONParser;
import com.json.parsers.JsonParserFactory;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

public class Mongo {
	
	DBCollection coll;
	
	public Mongo(String host, int port, String dbname, String collection) throws UnknownHostException{
		MongoClient client = new MongoClient(host,port);
		DB db = client.getDB(dbname);
		coll = db.getCollection(collection);
	}
	
	public Vector<String> getData(int[] startdate, int limit, int offset){
		
		JsonParserFactory factory=JsonParserFactory.getInstance();
		JSONParser parser=factory.newJsonParser();
		
		Vector<String> vec = new Vector<String>();
		
		BasicDBObject query = new BasicDBObject("geo", new BasicDBObject("$ne", null));//.append("timestamp", new BasicDBObject("$gt",startdate));
		
		/*Calendar cal = Calendar.getInstance();
		
		cal.set(Calendar.YEAR, startdate[0]);
		cal.set(Calendar.MONTH, startdate[1]-1);
		cal.set(Calendar.DATE, startdate[2]);
		
		Date d = cal.getTime();
		
		BasicDBObject query = new BasicDBObject("created_at", new BasicDBObject("$gt",d));
		*/
		BasicDBObject fields = new BasicDBObject("coordinates.coordinates",1).append("created_at", 1).append("id",1).append("user.id",1).append("user.screen_name", 1).append("text",1).append("_id",0);
		DBCursor cursor = coll.find(query,fields);
		//cursor.skip(offset);
		//cursor.limit(limit);
		
		Writer writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(
				    new FileOutputStream("users.txt"), "UTF-8"));
			writer.write("\"tweetid\";\"text\";\"userid\";\"username\";\"date\";\"lat\";\"lon\"\n");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		while(cursor.hasNext()){
			String tweet = cursor.next().toString();
			Map data = null;
			String s = null;
			try {
				data=parser.parseJson(tweet);
				String tweetid = (String)data.get("id");
				String text = (String)data.get("text");
				String userid = (String)((Map)data.get("user")).get("id");
				String username = (String)((Map)data.get("user")).get("screen_name");
				String date = (String)((Map)data.get("created_at")).get("$date");
				List latlon = (List)((Map)data.get("coordinates")).get("coordinates");
				String lat = (String)latlon.get(0);
				String lon = (String)latlon.get(1);
				
				//s = tweetid+";"+text+";"+userid+";"+username+";"+date+";"+lat+";"+lon+"\n";
				//writer.write(s);
				s = userid +";"+ username;
				
			} catch (com.json.exceptions.JSONParsingException /*| IOException*/ e) {
					// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(s!=null)
				vec.add(s);
		}
		try {
			cursor.close();
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return vec;
	}

	
public List<String[]> getData(){
		
		JsonParserFactory factory=JsonParserFactory.getInstance();
		JSONParser parser=factory.newJsonParser();
		
		//Vector<String[]> vec = new Vector<String[]>();
		
		List<String[]> res = new ArrayList<String[]>();
		
		BasicDBObject query = new BasicDBObject("geo", new BasicDBObject("$ne", null));//.append("timestamp", new BasicDBObject("$gt",startdate));
		
		BasicDBObject fields = new BasicDBObject("coordinates.coordinates",1).append("created_at", 1).append("id",1).append("user.id",1).append("user.screen_name", 1).append("text",1).append("_id",0);
		//coll.ensureIndex(new BasicDBObject("id", 1));
		DBCursor cursor = coll.find(query,fields);
		//cursor.sort(new BasicDBObject("id", -1));		
		
		while(cursor.hasNext()){
			String tweet = cursor.next().toString();
			Map data = null;
			String[] str = new String[5];
			try {
				data=parser.parseJson(tweet);
				//System.out.println((String)data.get("id"));
				String tweetid = (String)data.get("id");
				String text = (String)data.get("text");
				//String userid = (String)((Map)data.get("user")).get("id");
				//String username = (String)((Map)data.get("user")).get("screen_name");
				String date = (String)((Map)data.get("created_at")).get("$date");
				List latlon = (List)((Map)data.get("coordinates")).get("coordinates");
				String lat = (String)latlon.get(0);
				String lon = (String)latlon.get(1);
				
				str[0] = lat;
				str[1] = lon;
				str[2] = date;
				str[3] = text;
				str[4] = tweetid;
				
			} catch (com.json.exceptions.JSONParsingException /*| IOException*/ e) {
					// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(str != null){
				int twid = Integer.parseInt(str[4]);
				boolean added = false;
				for(int i = 0; i < res.size(); i++){
					int temp = Integer.parseInt(res.get(i)[4]);
					if(temp > twid){
						res.add(i, str);
						added = true;
					}
				}
				
				if(!added)
					res.add(str);
			}
				//vec.add(str);
		}
		cursor.close();
		
		return res;
	}

	
	
	public long getCount(){
		return coll.getCount();
	}

}
