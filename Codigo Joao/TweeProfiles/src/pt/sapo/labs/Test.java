package pt.sapo.labs;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import moa.cluster.Cluster;
import moa.cluster.Clustering;

import com.cybozu.labs.langdetect.LangDetectException;

import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;
import algorithm.macro.HybridDBSCAN;
import algorithm.micro.HybridDenStream;
import algorithm.micro.HybridMicroCluster;
import datalink.JSONParsing;
import datalink.MySQLConnection;
import dataprocessing.DateProcessing;
import dataprocessing.TextProcessing;

public class Test {
	
	public static void main(String[] args) {
 
		//Vector<String[]> data = db.getData();
		MySQLConnection mysql = new MySQLConnection();	
		mysql.setupConnection();
		
		
		//Clustering[] clusters = new Clustering[4];
		//Clustering[] micro_clusters = new Clustering[4];
		
		final String path = "C:\\Users\\Jo�o\\Desktop\\tweets\\tweets.json";
		final String dataset = "tweeprofiles";
		final int sampleSize = 50730;
		final int chunkSize = 12682;
		final int test = 4;
		
//		long totaltime = 0;
		
		ArrayList<Attribute> attributes = new ArrayList<Attribute>();
		attributes.add(new Attribute("lat"));
		attributes.add(new Attribute("lon"));
		attributes.add(new Attribute("hour"));
		attributes.add(new Attribute("weekday"));
		attributes.add(new Attribute("text", (List<String>)null));
		attributes.add(new Attribute("timestamp", (List<String>)null));
		
		Instances instances = new Instances(dataset, attributes, sampleSize);
		
		TextProcessing tp = null;
		try {
			tp = new TextProcessing();
		} catch (LangDetectException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		HybridDenStream denStream = new HybridDenStream();
		denStream.resetLearningImpl();
		
		HybridDBSCAN dbscan = new HybridDBSCAN(0.5, 2);
		
		
//		try {
//			data = JSONParsing.parseTweets(path);
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		sb.append("Sample size: "+sampleSize).append(System.lineSeparator());
		
		
		for(int batch = 0; batch < 4; batch++){
			
			int count = 0, count_damaged = 0;
			StringBuffer sb  = new StringBuffer();
			StringBuffer sb2 = new StringBuffer();
			
			sb.append("BATCH "+batch).append(System.lineSeparator());
			sb.append(denStream.getParameterString()).append(System.lineSeparator());
			long initTime = System.currentTimeMillis();
			
			Vector<String[]> data = mysql.getTweets(chunkSize, chunkSize*batch);
			
			for(int j = 0; j<data.size(); j++){ 
				String[] str =  data.get(j);
				boolean damaged = false;
			 		for(int i = 0; i < str.length; i++){
			 			if(str[i] == null || str[i].equals(""))
			 				damaged = true;
			 		}
			 		DenseInstance inst = new DenseInstance(6); 
			 		inst.setDataset(instances);
			 		
			 		double lat = Double.parseDouble(str[0]);
			 		double lon = Double.parseDouble(str[1]);
			 		
			 		if(Double.isNaN(lat) || Double.isNaN(lon))
			 			damaged = true;
			 		
			 		String text = str[3]; 
			 		text = tp.processText(text);
			 		if (text.equals(""))
			 			damaged = true;
			 		
			 		if(damaged){
			 			count_damaged++;
			 			continue;
			 		}
			 		inst.setValue(attributes.get(0), lat); 
			 		inst.setValue(attributes.get(1), lon); 
			 		inst.setValue(attributes.get(2), DateProcessing.getHour(str[2])); 
			 		inst.setValue(attributes.get(3), DateProcessing.getWeekDay(str[2]));
			 		//inst.setValue(new Attribute("user"), fields[3]); 
			 		
			 		inst.setValue(attributes.get(4), text);
			 		inst.setValue(attributes.get(5), str[2]);
			 		
			 		denStream.trainOnInstanceImpl(inst);
			 		count++;
			//mysql.close();
			}
			
			//micro_clusters[batch] = denStream.getMicroClusteringResult();
			
			int testno = Integer.parseInt(""+test+batch+"");
			Clustering microclusters = denStream.getMicroClusteringResult();
			long dt = System.currentTimeMillis()-initTime;			
			for(Cluster hmc : microclusters.getClustering()){
				 sb.append(((HybridMicroCluster)hmc).toString());
			}
			sb.append("Elapsed time: "+dt).append(System.lineSeparator());
			sb.append("Clustered points: " + count).append(System.lineSeparator());
			sb.append("Unclustered points: " + count_damaged).append(System.lineSeparator());
			try {
				JSONParsing.writeFile("C:\\Users\\Jo�o\\Desktop\\tests\\test"+test+"."+batch+"_denstr.txt", sb.toString());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			mysql.insertClusters(microclusters, testno, true);
			
			try {
				mysql.flushLog(batch);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			long it = System.currentTimeMillis();
			Clustering result = dbscan.getClustering(microclusters);
			long dt2 = System.currentTimeMillis() - it;
			
			sb2.append("# micro clusters: ").append(dbscan.n).append(System.lineSeparator());
			sb2.append("Unclustered micro clusters: ").append(dbscan.noise).append(System.lineSeparator());
			sb2.append("Resulting clusters: ").append(result.getClustering().size()).append(System.lineSeparator());
			sb2.append("Elapsed time: "+dt2).append(System.lineSeparator());
			for(Cluster c : result.getClustering()){
				sb2.append(((HybridMicroCluster) c).toString());
			}
			try {
				JSONParsing.writeFile("C:\\Users\\Jo�o\\Desktop\\tests\\test"+test+"."+batch+"_dbsc.txt", sb2.toString());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			mysql.insertClusters(result, testno, false);
			
			try {
				mysql.flushLog(batch+4);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

		}
		
//		//System.out.println("Miccro-Clustering done. Time elapsed "+totaltime+". Saving to MySQL.");
//		
//		for(int i = 0; i < micro_clusters.length; i++){
//			long t = System.currentTimeMillis();
//			int testno = Integer.parseInt(""+test+i+"");
//			mysql.insertClusters(micro_clusters[i], testno, true);
//			long dt = System.currentTimeMillis() - t;
//			try {
//				mysql.flushLog(i);
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			System.out.println("Batch "+i+" saved to db. Time elapsed "+dt);
//		}
//		
//		for(int i = 0; i < micro_clusters.length; i++){
//		
//			StringBuffer sb2 = new StringBuffer();
//			
//			long iniTime = System.currentTimeMillis();
//			
//			Clustering result = dbscan.getClustering(micro_clusters[i]);
//			clusters[i] = result;
//			long dt2 = System.currentTimeMillis()-iniTime;
//			totaltime += dt2;
//			
//			sb2.append("# micro clusters: ").append(dbscan.n).append(System.lineSeparator());
//			sb2.append("Unclustered micro clusters: ").append(dbscan.noise).append(System.lineSeparator());
//			sb2.append("Resulting clusters: ").append(result.getClustering().size()).append(System.lineSeparator());
//			sb2.append("Elapsed time: "+dt2).append(System.lineSeparator());
//			
//			for(Cluster c : result.getClustering()){
//				sb2.append(((HybridMicroCluster) c).toString());
//			}
//			try {
//				JSONParsing.writeFile("C:\\Users\\Jo�o\\Desktop\\tests\\test"+test+"."+i+"_dbsc.txt", sb2.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		
//		}
//		
//		System.out.println("Clustering done. Time elapsed "+totaltime+". Saving to MySQL.");
//		
//		micro_clusters = null;
//		
//		for(int i = 0; i < clusters.length; i++){
//			long t = System.currentTimeMillis();
//			int testno = Integer.parseInt(""+test+i+"");
//			mysql.insertClusters(clusters[i], testno, false);
//			long dt = System.currentTimeMillis() - t;
//			try {
//				mysql.flushLog(i+4);
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			System.out.println("Batch "+i+" saved to db. Time elapsed "+dt);
//		}
		
		try {
			mysql.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

//	public List<String[]> sortData(List<String[]> data){
//		for(String [] str : data){
//			String date = str[2];
//			DateTime time = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss")
//					.parseDateTime("04/02/2011 20:27:05");
//		}
//		
//		return null;
//	}
//	
//	 public static void main(String[] args) throws LangDetectException {
//		 TextProcessing tp = new TextProcessing();
//		 System.out.println(tp.removeURL("Los gestos que pueden salvar a Dilma Rousseff. http://t.co/TBHxyVZAv3\\"));
//		 System.out.println(tp.processText("#ChangeBrazil Adelaide @ National War Memorial http://t.co/jP0uIdwpOr;68038575")); 
//		 System.out.println(tp.processText("Dilma: Mi obligaci�n es o�r la voz de las calles, http://t.co/d83lpEv4S2"));
//		 System.out.println(tp.processText("#presupuestoeducacionuy  #uruguay  #vemprarua #imaginacionpopular #lucha #educaci�n http://t.co/ULh7bCbTLU")); 
//		 System.out.println(tp.processText("#naocuragayuy #forafeliciano #mudabrasil http://t.co/CURfwhFOAQ")); 
//	  }
	 
	
	
//	public static void main(String[] args) {
//
//		Vector<String> data = new Vector<String>();
//		MySQLConnection mysql = new MySQLConnection();	
//		TextProcessing tp = null;
//		
//		final String dataset = "tweeprofiles";
//		
//		ArrayList<Attribute> attributes = new ArrayList<Attribute>();
//		attributes.add(new Attribute("lat"));
//		attributes.add(new Attribute("lon"));
//		attributes.add(new Attribute("hour"));
//		attributes.add(new Attribute("weekday"));
//		attributes.add(new Attribute("text", (List<String>)null));
//		attributes.add(new Attribute("timestamp", (List<String>)null));
//		
//		Instances instances = new Instances(dataset, attributes, 50000);
//		
//		try {
//			tp = new TextProcessing();
//		} catch (LangDetectException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//		
//		BufferedReader br = null;
//		try {
//			br = new BufferedReader(new FileReader("C:\\Users\\Jo�o\\Desktop\\tweets\\tweets_dump.txt"));
//			String line = br.readLine();
//			line = br.readLine();
//			while (line != null){
//				//String lang = tp.detectLanguage(line.split(";")[1]);
//				//if(lang.equals("pt"))
//						data.add(line);				
//				line = br.readLine();
//			}
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} finally {
//			try {
//				br.close();
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		
//		//mysql.setupConnection();
//		// "tweetid";"text";"userid";"username";"date";"lat";"lon"
//		HybridDenStream denStream = new HybridDenStream();
//		denStream.resetLearningImpl();
//			 //tp = new TextProcessing();
//		int count = 0;
//		System.out.println(data.size());
//		long initTime = System.currentTimeMillis();
//		 for(String s : data){ 
//		  		String[] fields = s.split(";"); 
//		  		DenseInstance inst = new DenseInstance(6); 
//		  		inst.setDataset(instances);
//		  		
//		  		inst.setValue(attributes.get(0), Double.parseDouble(fields[5])); 
//		  		inst.setValue(attributes.get(1), Double.parseDouble(fields[6])); 
//		  		inst.setValue(attributes.get(2), DateProcessing.getHour(fields[4])); 
//		  		inst.setValue(attributes.get(3), DateProcessing.getWeekDay(fields[4]));
//		  		//inst.setValue(new Attribute("user"), fields[3]); 
//		  		
//		  		String text = fields[1]; 
//		  		text = tp.processText(text);
//		  		
//		  		inst.setValue(attributes.get(4), text);
//		  		inst.setValue(attributes.get(5), fields[4]);
//		  		denStream.trainOnInstanceImpl(inst);
//		  		count++;
//		//mysql.close();
//			
//		}
//		 
//		 for(Cluster hmc : denStream.getMicroClusteringResult().getClustering()){
//			 System.out.println(((HybridMicroCluster)hmc).toString());
//		 }
//		 long dt = System.currentTimeMillis()-initTime;
//		 System.out.println("Elapsed time: "+dt);
//		 System.out.println(count);
//		 
//	}
	
	
//	public static void main(String[] args) throws SQLException {
//		
//		DirectedGraph<String, DefaultEdge> g = new SimpleDirectedGraph<String, DefaultEdge>(DefaultEdge.class);
//		g.addVertex("teste");
//		g.addVertex("teste2");
//		g.addVertex("teste3");
//		g.addEdge("teste", "teste2");
//		g.addEdge("teste2", "teste3");
//		
//		System.out.println(g.getEdgeWeight(g.getEdge("teste2", "teste3")));
//		System.out.println(new DijkstraShortestPath(g,"teste", "teste3").getPathLength());
//	}
	
	
}
