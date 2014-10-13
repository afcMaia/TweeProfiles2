package algorithm;

import java.util.HashMap;

import org.jgrapht.DirectedGraph;
import org.jgrapht.alg.DijkstraShortestPath;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleDirectedGraph;

public class Distances {

	public static final int SQUARED_DISTANCE = 1;
	public static final int HAVERSINE_DISTANCE = 2;
	public static final int COSINE_SIMILARITY = 3;
	public static final int SOCIAL_DISTANCE = 4;
	
	final static double R = 6371; // Radius of the earth in km
	
	public static final double MIN_HAVERSINE = 0;
	public static final double MAX_HAVERSINE = 20020; // half earth perimeter = 20 020 km
	
	public static final double MIN_COSINE = -1;
	public static final double MAX_COSINE = 1;
	
	public static final int  MIN_HOUR = 0;
	public static final int  MAX_HOUR = 23;
	
	public static final int  MIN_WEEKDAY = 1; //Sunday
	public static final int  MAX_WEEKDAY = 7; //Saturday
	
	
	private static DirectedGraph<String, DefaultEdge> socialGraph;
	static boolean loaded = false;
	
	
	public static void loadSocialGraph(){
		socialGraph = new SimpleDirectedGraph<String, DefaultEdge>(DefaultEdge.class);
		//TODO loading procedure
		loaded = true;
	}

	public static double squaredDistance(double[] pointA, double[] pointB) {
		double distance = 0.0;
		double dH, dW;
		dH = 24 - (pointA[0]-pointB[0]);
		if(dH>24) dH -= 24;
		dW = pointA[1]-pointB[1];
		
		distance = Math.pow(dH, 2) + Math.pow(dW,2);
		
//		for (int i = 0; i < pointA.length; i++) {
//			double d = pointA[i] - pointB[i];
//			distance += d * d;
//		}
		
		return Math.sqrt(distance);
	}

	public static double haversineDistance(double[] lat, double[] lng) {
		double latDistance = toRad(lat[1] - lat[0]);
		double longDistance = toRad(lng[1] - lng[0]);

		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
				+ Math.cos(toRad(lat[0])) * Math.cos(toRad(lat[1]))
				* Math.sin(longDistance / 2) * Math.sin(longDistance / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double res = R * c;
		
		return res;
	}

	private static double toRad(double value) {
		return value * Math.PI / 180;
	}

	public static double socialDistance(String user, String[] users) {
		double dist = Double.MAX_VALUE;
		Double temp;
		for (String u : users) {
			temp = socialDistance(user, u);
			if (temp == 1.0)
				return 1.0;
			else if (temp < dist)
				dist = temp;
		}
		return dist;
	}

	public static double socialDistance(String user1, String user2) {
		double dist = Double.MAX_VALUE;
		if (socialGraph.containsVertex(user1)
				&& socialGraph.containsVertex(user2)) {
			dist = new DijkstraShortestPath(socialGraph, user1, user2)
					.getPathLength();
		} else {
			// TODO extract user's folowers
		}
		return dist;
	}

	public static Double cosineSimilarity(HashMap<String, Double> firstFeatures,
			HashMap<String, Double> secondFeatures) {
		Double similarity = 0.0;
		Double sum = 0.0; // the numerator of the cosine similarity
		Double fnorm = 0.0; // the first part of the denominator of the cosine
							// similarity
		Double snorm = 0.0; // the second part of the denominator of the cosine
							// similarity
		//String[] fkeys = (String[]) firstFeatures.keySet().toArray();
		
		for (String s : firstFeatures.keySet()) {
			if (secondFeatures.containsKey(s)) {
				sum = sum + firstFeatures.get(s) * secondFeatures.get(s);
			}
		}
		fnorm = calculateNorm(firstFeatures);
		snorm = calculateNorm(secondFeatures);
		similarity = sum / (fnorm * snorm);
		return similarity;
	}

	private static Double calculateNorm(HashMap<String, Double> feature) {
		Double norm = 0.0;
		//String[] keys = (String[]) feature.keySet().toArray();
		for (String s : feature.keySet()) {
			norm = norm + Math.pow(feature.get(s), 2);
		}
		return Math.sqrt(norm);
	}
	
}
