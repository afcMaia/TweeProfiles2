package datalink;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONParsing {

	static String readFile(String path/*, Charset encoding*/) throws IOException {
		Charset encoding = Charset.forName("UTF-8");
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	public static void writeFile(String path, String json) throws IOException{
		Charset encoding = Charset.forName("UTF-8");
		Files.write(Paths.get(path), json.getBytes(encoding));
	}
	

	public static void getData(Mongo db, String path){
		List<String[]> data = db.getData();
		JSONArray root = new JSONArray();
		
		for(String[] str : data){
			JSONObject obj = new JSONObject();
			try {
				obj.put("lat",str[0] );
				obj.put("lon",str[1] );
				obj.put("date",str[2] );
				obj.put("text",str[3] );
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			root.put(obj);			
		}
		
		try {
			writeFile(path, root.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
	}
	
	public static Vector<String[]> parseTweets(String path) throws JSONException {
		Vector<String[]> res = new Vector<String[]>();
		try {
			String json = readFile(path);
			json=json.substring(1);
			//System.out.println(json.substring(0, 50));
//			try {
				JSONArray root = new JSONArray(json);
				System.out.println(root.length());
				JSONObject obj = null;
				for(int i = 0; i < root.length(); i++){
					obj = root.getJSONObject(i);
					String[] str = new String[4];
					//System.out.println(obj.toString());
					str[0]=(String)obj.get("lat");
					str[1]=(String)obj.get("lon");
					str[2]=(String)obj.get("date");
					str[3]=(String)obj.get("text");
					res.add(str);
				}
//			} catch (JSONException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
//		String path = "C:\\Users\\João\\Desktop\\tweets\\tweets_dump_json.json";
		
	}
	
	public static void parseCoordinates(String path){
		
		JSONArray res = new JSONArray();
		
		try {
			String json = readFile(path);
			json=json.substring(1);
				JSONArray root = new JSONArray(json);
				//System.out.println(root.length());
				JSONObject obj = null;
				
				for(int i = 0; i < root.length(); i++){
					JSONObject o = new JSONObject();
					obj = root.getJSONObject(i);
					try{
						o.put("lat", Double.parseDouble((String)obj.get("lat")));
					} catch(JSONException je){
						o.put("lat", 0.0);
					}
					try{
						o.put("lon", Double.parseDouble((String)obj.get("lon")));
					} catch(JSONException je){
						o.put("lon", 0.0);
					}
					res.put(o);
				}

		} catch (IOException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String str = "";
		try {
			str = res.toString(3);
			writeFile("C:\\Users\\João\\Desktop\\tweets\\tweets_coord.json",str);
		} catch (JSONException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
