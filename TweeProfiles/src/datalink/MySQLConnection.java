package datalink;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Vector;

import com.mysql.jdbc.Statement;

import moa.cluster.Cluster;
import moa.cluster.Clustering;
import algorithm.micro.HybridMicroCluster;

public class MySQLConnection {
	private Connection con = null;

	// TODO troubleshoot

	public static final String URL = "jdbc:mysql://xoao.no-ip.biz/tweeprofiles";
	public static final String USER = "tweeprofiles";
	public static final String PASSWORD = "tweeprofiles";
	public static final String DRIVER_CLASS = "com.mysql.jdbc.Driver";
	public StringBuffer log;

	public MySQLConnection() {
		try {
			// Step 2: Load MySQL Java driver
			Class.forName(DRIVER_CLASS);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public void setupConnection() {
		try {
			// Step 3: Establish Java MySQL connection
			con = DriverManager.getConnection(URL, USER, PASSWORD);
			log = new StringBuffer();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}
	
	public void insertClusters(Clustering clusters, int test, boolean micro) {
		Statement stmt;
		
//		try {
//			stmt = (Statement) con.createStatement();
//			if(micro)
//				stmt.execute("LOCK TABLES micro_clusters WRITE, micro_cluster_words WRITE");
//			else
//				stmt.execute("LOCK TABLES clusters WRITE, cluster_words WRITE");
			
			for (Cluster c : clusters.getClustering()) {
				insertCluster((HybridMicroCluster) c, test, micro);
			}
			
//			stmt.execute("UNLOCK TABLES");
//			stmt.close();
			
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
	}
	
	public void insertCluster(HybridMicroCluster hmc, int test, boolean micro) {
		//PreparedStatement preparedStatement;
		StringBuffer sql = new StringBuffer();
//		try {
			if(micro)
				sql.append("insert into micro_clusters (id,test,n,nwords,center_lat,center_lon,center_hou,center_wkd,dist_geo,dist_temp,dist_text,weight,radius,lambda,creation_t,lastedit_t,creation_d,lastedit_d) values");
//				preparedStatement = con.prepareStatement("insert into micro_clusters (id,test,n,nwords,center_lat,center_lon,center_hou,center_wkd,dist_geo,dist_temp,dist_text,weight,radius,lambda,creation_t,lastedit_t,creation_d,lastedit_d) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update n=values(n), nwords=values(nwords), center_lat=values(center_lat), center_lon=values(center_lon), center_hou=values(center_hou), center_wkd=values(center_wkd), dist_geo=values(dist_geo), dist_temp=values(dist_temp), dist_text=values(dist_text), weight=values(weight), radius=values(radius), lastedit_t=values(lastedit_t), lastedit_d=values(lastedit_d)");
			else
				sql.append("insert into clusters (id,test,n,nwords,center_lat,center_lon,center_hou,center_wkd,dist_geo,dist_temp,dist_text,weight,radius,lambda,creation_t,lastedit_t,creation_d,lastedit_d) values");
//				preparedStatement = con.prepareStatement("insert into clusters (id,test,n,nwords,center_lat,center_lon,center_hou,center_wkd,dist_geo,dist_temp,dist_text,weight,radius,lambda,creation_t,lastedit_t,creation_d,lastedit_d) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update n=values(n), nwords=values(nwords), center_lat=values(center_lat), center_lon=values(center_lon), center_hou=values(center_hou), center_wkd=values(center_wkd), dist_geo=values(dist_geo), dist_temp=values(dist_temp), dist_text=values(dist_text), weight=values(weight), radius=values(radius), lastedit_t=values(lastedit_t), lastedit_d=values(lastedit_d)");
			sql.append("(").append(hmc.getID()+",").append(test+",").append(hmc.getN()+",").append(hmc.getNwords()+",").append(hmc.getCenter()[0]+",").append(hmc.getCenter()[1]+",").append(hmc.getCenter()[2]+",").append(hmc.getCenter()[3]+",").append(hmc.getDist()[0]+",").append(hmc.getDist()[1]+",").append(hmc.getDist()[2]+",").append(hmc.getWeight()+",").append(hmc.getRadius()+",").append(hmc.getLambda()+",").append(hmc.getCreationTimestamp()+",").append(hmc.getLastEditTimestamp()+",").append("\""+hmc.getCreationDate()+"\",").append("\""+hmc.getLastEditDate()+"\"").append(") ");
//			preparedStatement.setInt(1, hmc.getID());
//			preparedStatement.setInt(2, test);
//			preparedStatement.setInt(3, hmc.getN());
//			preparedStatement.setInt(4, hmc.getNwords());
//			preparedStatement.setDouble(5, hmc.getCenter()[0]);
//			preparedStatement.setDouble(6, hmc.getCenter()[1]);
//			preparedStatement.setDouble(7, hmc.getCenter()[2]);
//			preparedStatement.setDouble(8, hmc.getCenter()[3]);
//			preparedStatement.setDouble(9, hmc.getDist()[0]);
//			preparedStatement.setDouble(10, hmc.getDist()[1]);
//			preparedStatement.setDouble(11, hmc.getDist()[2]);
//			preparedStatement.setDouble(12, hmc.getWeight());
//			preparedStatement.setDouble(13, hmc.getRadius());
//			preparedStatement.setDouble(14, hmc.getLambda());
//			preparedStatement.setInt(15, (int) hmc.getCreationTimestamp());
//			preparedStatement.setInt(16, (int) hmc.getLastEditTimestamp());
//			preparedStatement.setString(17, hmc.getCreationDate());
//			preparedStatement.setString(18, hmc.getLastEditDate());
//			preparedStatement.executeUpdate();
//			preparedStatement.close();
			
			sql.append("on duplicate key update n=values(n), nwords=values(nwords), center_lat=values(center_lat), center_lon=values(center_lon), center_hou=values(center_hou), center_wkd=values(center_wkd), dist_geo=values(dist_geo), dist_temp=values(dist_temp), dist_text=values(dist_text), weight=values(weight), radius=values(radius), lastedit_t=values(lastedit_t), lastedit_d=values(lastedit_d);").append(System.lineSeparator());
			log.append(sql.toString());
			
			insertWordsBatch(hmc.getID(),test,hmc.getWords(),micro);
			
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
	
	public void insertWordsBatch(int id, int test, HashMap<String,Double> words, boolean micro){
		
		int chunkSize = 1000;
		int size = words.size();
		HashMap<String,Double> w = new HashMap<String,Double>(words);
		int iterations = size/chunkSize + 1;
//		for(int j = 0; j < iterations; j++){
//			int count = 0;
			//PreparedStatement preparedStatement;
			StringBuffer sql = new StringBuffer();
//			try {
				if(micro)
					sql.append("insert into micro_cluster_words(mcluster_id,test,word,freq) values");
					//preparedStatement = con.prepareStatement("insert into micro_cluster_words(mcluster_id,test,word,freq) values(?,?,?,?) on duplicate key update freq=values(freq)");
				else
				    sql.append("insert into cluster_words(cluster_id,test,word,freq) values");
					//preparedStatement = con.prepareStatement("insert into cluster_words(cluster_id,test,word,freq) values(?,?,?,?) on duplicate key update freq=values(freq)");
//				while(count < chunkSize){
					for(String s : w.keySet()){
						StringBuffer str = new StringBuffer();
						str.append("(").append(id+",").append(test+",").append("\""+s+"\",").append(w.get(s).intValue()+"),");
//						preparedStatement.setInt(1, id);
//						preparedStatement.setDouble(2, test);
//						preparedStatement.setString(3, s);
//						preparedStatement.setInt(4, w.get(s).intValue());
//						preparedStatement.addBatch();
						sql.append(str.toString());
//						w.remove(s);
//						count++;
					}
//				}
				sql.replace(sql.lastIndexOf(","),sql.length(), " ");
				sql.append("on duplicate key update freq=values(freq);").append(System.lineSeparator());
				log.append(sql.toString());
//				preparedStatement.executeBatch();
//	            preparedStatement.close();
//			} catch (SQLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
		
	}
	
//	public void insertClusterWord(int id, int test, String word, int freq){
//		PreparedStatement preparedStatement, preparedStatement2;
//		try {
//			preparedStatement = con.prepareStatement("select id from words2 where word like ?");
//			preparedStatement.setString(1, word);
//			ResultSet res = preparedStatement.executeQuery();
//			if(res.first()){
//				int w_id = res.getInt(1);
//				res.close();
//				preparedStatement2 = con.prepareStatement("insert into cluster_words2(cluster_id,test_id,word_id,frequency) values(?,?,?,?) on duplicate key update frequency=values(frequency)");
//				preparedStatement2.setInt(1, id);
//				preparedStatement2.setInt(2, test);
//				preparedStatement2.setInt(3, w_id);
//				preparedStatement2.setInt(4, freq);
//				preparedStatement2.executeUpdate();
//				preparedStatement2.close();
//			} else {
//				res.close();
//				preparedStatement2 = con.prepareStatement("insert into words2 values(DEFAULT,?)", PreparedStatement.RETURN_GENERATED_KEYS);
//				preparedStatement2.setString(1, word);
//				preparedStatement2.executeUpdate();
//				ResultSet rs = preparedStatement2.getGeneratedKeys();
//				
//				if(rs.first()){
//					int w_id = rs.getInt(1);
//					rs.close();
//					PreparedStatement preparedStatement3 = con.prepareStatement("insert into cluster_words2 values(?,?,?,?)");
//					preparedStatement3.setInt(1, id);
//					preparedStatement3.setInt(2, test);
//					preparedStatement3.setInt(3, w_id);
//					preparedStatement3.setInt(4, freq);
//					preparedStatement3.executeUpdate();
//					preparedStatement3.close();
//				}
//				preparedStatement2.close();
//			}
//			preparedStatement.close();
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}

	
	public void removeClusters(ArrayList<HybridMicroCluster> clusters, int test){
		for(HybridMicroCluster c : clusters){
			removeCluster(c, test);
		}
	}
	
	public void removeCluster(HybridMicroCluster hmc, int test){
		PreparedStatement preparedStatement;
		try {
			preparedStatement = con.prepareStatement("insert into removed_clusters values2(?,?)");
			preparedStatement.setInt(1, hmc.getID());
			preparedStatement.setInt(2, test);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	
	public void addTweetsBatch(Vector<String[]> tweets){
		int chunkSize = 1000;
		int size = tweets.size();
		int iterations = size/chunkSize + 1;
		for(int j = 0; j < iterations; j++){
			try {
				PreparedStatement preparedStatement = con.prepareStatement("insert into tweets(id,lat,lon,date,text) values(default,?,?,?,?)");
				for(int i = 0; i < chunkSize; i++){
					preparedStatement.setDouble(1, Double.parseDouble(tweets.get(i+j*chunkSize)[0]));
					preparedStatement.setDouble(2, Double.parseDouble(tweets.get(i+j*chunkSize)[1]));
					preparedStatement.setString(3, tweets.get(i+j*chunkSize)[2]);
					preparedStatement.setString(4, tweets.get(i+j*chunkSize)[3]);
					preparedStatement.addBatch();
				}
				preparedStatement.executeBatch();
	            preparedStatement.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void flushLog(int i) throws IOException{
		JSONParsing.writeFile("C:\\Users\\João\\Desktop\\tests\\mysql_log"+i+".sql", log.toString());
		log = new StringBuffer();
	}
	
	public Vector<String[]> getTweets(int limit, int offset){
		Vector<String[]> tweets = new Vector<String[]>();
		try {
			PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM tweets ORDER BY date ASC LIMIT ? OFFSET ?");
			preparedStatement.setInt(1,limit);
			preparedStatement.setInt(2, offset);
			ResultSet res = preparedStatement.executeQuery();
			while(res.next()){
				String[] str = new String[4];
				str[0] = ""+res.getDouble("lat")+"";
				str[1] = ""+res.getDouble("lon")+"";
				str[2] = res.getString("date");
				str[3] = res.getString("text");
				tweets.add(str);
			}
			res.close();
			preparedStatement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("Loaded tweets");
		return tweets;
	}
	
	public String clustersToJSON(Clustering clusters, int test ){
		return "";
	}

	public void close() throws SQLException {
		con.close();
	}

}