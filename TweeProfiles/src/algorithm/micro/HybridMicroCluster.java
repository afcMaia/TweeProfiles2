package algorithm.micro;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
//import java.util.Map;
import java.util.Random;

import algorithm.Distances;
import dataprocessing.TextProcessing;
//import weka.core.Attribute;
import weka.core.Instance;
import weka.core.Instances;
//import moa.cluster.CFCluster;
import moa.cluster.Cluster;
import moa.clusterers.denstream.Timestamp;

public class HybridMicroCluster /*extends CFCluster*/ extends Cluster {
	
	private static final long serialVersionUID = 1L;

	protected double radiusFactor = 1.8;

	/**
	 * Number of points in the cluster.
	 */
	protected int N;
	/**
	 * Linear sum of all the points added to the cluster.
	 */
	public double[] LS;
	
	protected int Nwords;
	
	private long lastEditT = -1;
    private long creationTimestamp = -1;
    private double lambda;
    private Timestamp currentTimestamp;
    //TODO save dates
    private String creationDatetime;
    private String lastEditDatetime;
    
	/**
	 * Cluster ID 
	 */
	protected int id;
	/**
	 * Hashmap of ids of the users in the cluster associated with their respective frequency
	 */
	//public HashMap<String,Double> users;
	/**
	 * Hashmap of the words in the cluster associated with their respective frequency
	 */
	public Map<String,Double> words;
	//public double[] words_count;
	//public Double[] words_tweet_count;
	//public double[] words_sqcount;
	
	public double[] distances;
	
	public void setID(int id){
		this.id = id;
	}
	public int getID(){
		return this.id;
	}
	public HashMap<String,Double> getWords(){
		return new HashMap<String,Double>(this.words);
	}
	
    public HybridMicroCluster(int id, double[] center, /*int dimensions,*/ long creationTimestamp, double lambda, Timestamp currentTimestamp, /*String user,*/ String words, String creationDatetime) {
        //super(center, dimensions);
    	setID(id);
    	this.N = 1;
		this.LS = center;
		this.distances = new double[4];
		Arrays.fill(this.distances, 0.0);
        this.creationTimestamp = creationTimestamp;
        this.lastEditT = creationTimestamp;
        this.currentTimestamp = currentTimestamp;
        this.creationDatetime = creationDatetime;
        this.lastEditDatetime = creationDatetime;
        
        this.lambda = lambda;
        
        //users = new HashMap<String,Double>();
        //users.put(user,1.0);
        this.words = new HashMap<String,Double>();
        //this.words_count = new double[1000];
        //this.words_sqcount = new double[100];
        HashMap<String,Double> tokens = TextProcessing.getCountMap(words);
        for(String s : tokens.keySet()){
        	if(this.words.containsKey(s)){	
        		this.words.put(s, this.words.get(s)+tokens.get(s));
        		//words_count[this.words.get(s)] += tokens.get(s);
        		//words_sqcount[this.words.get(s)] += Math.pow(tokens.get(s),2);
        	}else{
        		this.words.put(s, tokens.get(s));
        		//words_count[this.words.get(s)] = tokens.get(s);;
        		//words_sqcount[this.words.get(s)] = Math.pow(tokens.get(s),2);
        	}
        }
        
        Nwords = getWordsCount();
//        for(String s : tokens.keySet()){
//        	Nwords += tokens.get(s);
//        }
        	
        
    }

//    public HybridMicroCluster(Instance instance, int dimensions, long timestamp, double lambda, Timestamp currentTimestamp) {
//    	this(new double[]{instance.value(new Attribute("lat")),instance.value(new Attribute("lon")),instance.value(new Attribute("hour")),instance.value(new Attribute("weekday"))}, timestamp, lambda, currentTimestamp, instance.stringValue(new Attribute("text", (List<String>)null)), instance.stringValue(new Attribute("timestamp", (List<String>)null)));
//    }

    
    public HybridMicroCluster(int id, HybridMicroCluster cluster, List<HybridMicroCluster> microclusters) {
		//super(cluster);
        this.id = id;
    	this.N = cluster.N;
		//this.LS = cluster.LS;
    	this.LS = new double[cluster.LS.length];
		System.arraycopy(cluster.LS, 0, this.LS, 0, cluster.LS.length);
		//this.distances = cluster.distances;
		this.distances = new double[4];
        System.arraycopy(cluster.distances, 0, this.distances, 0, cluster.distances.length);
        
        this.creationTimestamp = cluster.creationTimestamp;
        this.lastEditT = cluster.lastEditT;
        this.creationDatetime = cluster.creationDatetime;
        this.lastEditDatetime = cluster.lastEditDatetime;
        this.currentTimestamp = cluster.currentTimestamp;
    	
        this.lambda = cluster.lambda;
        //this.users = cluster.users;
      
        this.words = new HashMap<String,Double>();
        this.words.putAll(cluster.words);
        //this.words_count = new double[1000];
        //this.words_sqcount = new double[1000];
        
        
        //this.words.putAll(cluster.words);
        //System.arraycopy(cluster.words_count, 0, this.words_count, 0, cluster.words_count.length);
        //System.arraycopy(cluster.words_sqcount, 0, this.words_sqcount, 0, cluster.words_sqcount.length);
                
        Nwords = getWordsCount();
//        for(String s : this.words.keySet()){
//        	Nwords += this.words.get(s);
//        }
		
		for (HybridMicroCluster hmc : microclusters) {
			if (!hmc.equals(cluster))
				this.add(hmc);
		}
	}

	
	public void insert(Instance instance, long timestamp) {
		Instances dataset = instance.dataset();
		addVectors( this.distances, HybridDenStream.distances(instance, this) );
        N++;
        //super.setWeight(super.getWeight() + 1);
        this.lastEditT = timestamp;
        this.lastEditDatetime = instance.stringValue(dataset.attribute("timestamp"));

		LS[0] += instance.value(dataset.attribute("lat"));
		LS[1] += instance.value(dataset.attribute("lon"));
		LS[2] += instance.value(dataset.attribute("hour"));
		LS[3] += instance.value(dataset.attribute("weekday"));
		
		//SS[0] += Math.pow(instance.value(new Attribute("lat")),2);
		//SS[1] += Math.pow(instance.value(new Attribute("lon")),2);
		//SS[2] += Math.pow(instance.value(new Attribute("hour")),2);
		//SS[3] += Math.pow(instance.value(new Attribute("weekday")),2);
		
//		String usr = instance.stringValue(new Attribute("user", (List<String>)null));
//		if(users.containsKey(usr)){
//			users.put(usr, users.get(usr)+1.0);
//		} else {
//			users.put(usr, 1.0);
//		}
		
		String txt = instance.stringValue(dataset.attribute("text"));
		HashMap<String,Double> count = TextProcessing.getCountMap(txt);
		
		for(String s : count.keySet()){
			if(this.words.containsKey(s)) {      
				this.words.put(s, this.words.get(s)+count.get(s));
        		//words_count[this.words.get(s)] += count.get(s);
				//words_sqcount[this.words.get(s)] += Math.pow(count.get(s),2);
			}
        	else {
        		this.words.put(s, count.get(s));
        		//this.words.put(s, this.words.size());
        		//words_count[this.words.get(s)] = count.get(s);
        		//words_sqcount[this.words.get(s)] = Math.pow(count.get(s),2);
        	}
		}
		Nwords = getWordsCount();
//		for(String s : count.keySet())
//        	Nwords += count.get(s);
    }
	
	public long getCreationTimestamp() {
        return this.creationTimestamp;
    }
	
    public long getLastEditTimestamp() {
        return this.lastEditT;
    }

    public String getCreationDate() {
        return this.creationDatetime;
    }
	
    public String getLastEditDate() {
        return this.lastEditDatetime;
    }
    
    //@Override
    public double getWeight() {
        return getWeight(currentTimestamp.getTimestamp());
    }

    private double getWeight(long timestamp) {
        long dt = timestamp - lastEditT;
        return (N * Math.pow(2, -lambda * dt));
    }
    
    public double getWordsWeight() {
    	return getWordsWeight(currentTimestamp.getTimestamp());
    }

    public double getWordsWeight(long timestamp) {
    	long dt = timestamp - lastEditT;
        return (Nwords * Math.pow(2, -lambda * dt));
    }
    
    public long getCreationTime() {
        return creationTimestamp;
    }

    //@Override
    public double[] getCenter() {
        return getCenter(currentTimestamp.getTimestamp());
    }

    private double[] getCenter(long timestamp) {
        long dt = timestamp - lastEditT;
        double w = getWeight(timestamp);
        double[] res = new double[LS.length];
        for (int i = 0; i < LS.length; i++) {
            res[i] = LS[i];
            res[i] *= Math.pow(2, -lambda * dt);
            res[i] /= w;
        }
        return res;
    }
    
    
    public double[] getGeoCenter(){
    	double[] res = new double[2];
    	res[0] = LS[0]/N;
    	res[1] = LS[1]/N;
    	return res;
    }
    
    
    //@Override
    public double getRadius() {
        return getRadius(currentTimestamp.getTimestamp())*radiusFactor;
    }
    
    public double getRadius(long timestamp){
    	long dt = timestamp - this.lastEditT;
    	double w = getWeight(timestamp);
        double max = -1;
        //double sum = 0; //media ou max?
        double[] dist = normalizeDistances();
    	//double[] dist = new double[distances.length];
    	//dist = distances.clone();
        for(int i = 0; i < dist.length; i++){
    		dist[i] *= Math.pow(2, -lambda * dt);
    		dist[i] /= w;
    		if(dist[i] > max)
    			max = dist[i];
    	}
    	return max;
    }
    
    private double[] normalizeDistances(){
    	double[] res = new double[distances.length];
    	res[0] = distances[0]/Distances.MAX_HAVERSINE;
    	res[1] = distances[1]/Distances.squaredDistance(new double[]{Distances.MIN_HOUR, Distances.MIN_WEEKDAY}, new double[]{Distances.MAX_HOUR, Distances.MAX_WEEKDAY});
    	res[2] = distances[2];
    	//TODO social
    	//res[3]...
    	return res;
    }
    
    /*
    public double getRadius(long timestamp) {
        long dt = timestamp - lastEditT;
        double[] cf1 = calcCF1(dt);
        double[] cf2 = calcCF2(dt);
        double w = getWeight(timestamp);
        double max = 0;
        //double sum = 0;
        for (int i = 0; i < SS.length; i++) {
            double x1 = cf2[i] / w;
            double x2 = Math.pow(cf1[i] / w, 2);
            //sum += Math.pow(x1 - x2,2);
            //sum += (x1 - x2);
            if (Math.sqrt(x1 - x2) > max) {
                max = Math.sqrt(x1 - x2);
            }
        }
        return max;
    }
    
    private double[] calcCF2(long dt) {
        double[] cf2 = new double[SS.length];
        for (int i = 0; i < SS.length; i++) {
            cf2[i] = Math.pow(2, -lambda * dt) * SS[i];
        }
        return cf2;
    }

    private double[] calcCF1(long dt) {
        double[] cf1 = new double[LS.length];
        for (int i = 0; i < LS.length; i++) {
            cf1[i] = Math.pow(2, -lambda * dt) * LS[i];
        }
        return cf1;
    }
    
    public double getTextRadius(){
    	System.out.println(this.radiusFactor);
    	return getTextRadius(currentTimestamp.getTimestamp())*radiusFactor;
    }
    
    public double getTextRadius(long timestamp) {
    	long dt = timestamp - lastEditT;
        double[] wcf1 = calcWCF1(dt);
        double[] wcf2 = calcWCF2(dt);
        double w = getWordsWeight(timestamp);
        double max = 0;
        double sum = 0;
        for (int i = 0; i < words_sqcount.length; i++) {
            double x1 = wcf2[i] / w;
            double x2 = Math.pow(wcf1[i] / w, 2);
            //sum += Math.pow(x1 - x2,2);
            sum += (x1 - x2);
            if (Math.sqrt(x1 - x2) > max) {
                max = Math.sqrt(x1 - x2);
            }
        }
        return max;
    }
    
    public double[]calcWCF1(long dt){
    	double[] wcf1 = new double[words_count.length];
    	for (int i = 0; i < words_count.length; i++)
    		wcf1[i] = Math.pow(2, -lambda * dt) * words_count[i];
    	return wcf1;
    }
    
    public double[]calcWCF2(long dt){
    	double[] wcf2 = new double[words_sqcount.length];
    	for (int i = 0; i < words_sqcount.length; i++)
    		wcf2[i] = Math.pow(2, -lambda * dt) * words_sqcount[i];
    	return wcf2;
    }
    */
    
//    public HashMap<String,Double> getWordsTFMap(){
//    	return getWordsTFMap(currentTimestamp.getTimestamp());
//    }
    
    public int getWordsCount(){
    	int count = 0;
    	for(String s : words.keySet()){
    		count += words.get(s);
    	}
    	return count;
    }
    
    public HashMap<String,Double> getWordsTFMap(){
//    	long dt = timestamp-lastEditT;
    	HashMap<String,Double> tf = new HashMap<String,Double>();
    	for(String s : words.keySet()){
//    		double temp = words.get(s)*Math.pow(2, -lambda * dt);
//    		double ww  = getWordsWeight();
    		//tf.put(s, temp/ww);
    		tf.put(s, words.get(s)/Nwords);
    	}
    	return tf;
    }
    

//	@Override
// 	public CFCluster getCF() {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public double getInclusionProbability(Instance arg0) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	//@Override
    public HybridMicroCluster copy() {
        HybridMicroCluster copy = new HybridMicroCluster(this.id, this.LS.clone(), this.getCreationTime(), this.lambda, this.currentTimestamp,"","");
        //copy.setWeight(this.N + 1);
        copy.N = this.N;
        //copy.SS = this.SS.clone();
        copy.distances = this.distances.clone();
        copy.LS = this.LS.clone();
        copy.lastEditT = this.lastEditT;
        //copy.users = (HashMap<String, Double>) this.users.clone();
        copy.words.putAll(this.words);
        //copy.words_count = this.words_count.clone();
    	//copy.words_sqcount = this.words_sqcount;
    	copy.creationDatetime = this.creationDatetime;
    	copy.lastEditDatetime = this.lastEditDatetime;
        return copy;
    }
	
	public void add(HybridMicroCluster hmc){
		//TODO
		this.N += hmc.N;
		addVectors( this.LS, hmc.LS );
		//addVectors( this.SS, hmc.SS );
		addVectors( this.distances, hmc.distances );
		this.Nwords += hmc.Nwords;
		
		if (this.currentTimestamp.getTimestamp() < hmc.currentTimestamp.getTimestamp())
			this.currentTimestamp = hmc.currentTimestamp;
		
		if(this.creationTimestamp > hmc.creationTimestamp){
			this.creationTimestamp = hmc.creationTimestamp;
			this.creationDatetime = hmc.creationDatetime;
		}
		
		if(this.lastEditT < hmc.lastEditT){
			this.lastEditT = hmc.lastEditT;
			this.lastEditDatetime = hmc.lastEditDatetime;
		}
		
//		for(String usr : hmc.users.keySet()){
//			if(this.users.containsKey(usr)){
//				this.users.put(usr, this.users.get(usr)+hmc.users.get(usr));
//			} else {
//				this.users.put(usr, hmc.users.get(usr));
//			}
//		}

		for(String word : hmc.words.keySet()){
			if(this.words.containsKey(word)) {      	
        		this.words.put(word, this.words.get(word)+hmc.words.get(word));
				//words_count[this.words.get(word)] += hmc.words_count[hmc.words.get(word)];
				//words_sqcount[this.words.get(word)] += hmc.words_sqcount[hmc.words.get(word)];
			}
        	else {
        		this.words.put(word, hmc.words.get(word));
        		//this.words.put(word, this.words.size());
        		//words_count[this.words.get(word)] = hmc.words_count[hmc.words.get(word)];
        		//words_sqcount[this.words.get(word)] = hmc.words_sqcount[hmc.words.get(word)];
        	}
		}
		
	}
	
	 /**
	  * Adds the second array to the first array element by element. The arrays
	  * must have the same length.
	  * @param a1 Vector to which the second vector is added.
	  * @param a2 Vector to be added. This vector does not change.
	  */
	 public static void addVectors(double[] a1, double[] a2) {
		 assert (a1 != null);
		 assert (a2 != null);
		 assert (a1.length == a2.length) : "Adding two arrays of different "
			 + "length";

		 for (int i = 0; i < a1.length; i++) {
			 a1[i] += a2[i];
		 }
	 }
	@Override
	public Instance sample(Random arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("ID: ").append(this.id).append(System.lineSeparator());
		sb.append("Npoints: ").append(this.N).append(" | Nwords: ").append(words.keySet().size()).append(" | Total words: " ).append(this.Nwords).append(System.lineSeparator());
		sb.append("Center:").append(System.lineSeparator());
		String[] str = new String[]{"   Lat: ","   Long: ","   Hour: ","   Weekday: "};
		double[] center = this.getCenter();
		for(int i = 0; i < center.length; i++ ){
			sb.append(str[i]).append(center[i]).append(System.lineSeparator());
		}
		sb.append("Words:").append(System.lineSeparator());
		HashMap<String,Double> tfmap = this.getWordsTFMap();
		for(String s : tfmap.keySet()){
			sb.append(s).append(": ").append(tfmap.get(s)).append(" | ");
		}
		sb.append(System.lineSeparator());
		sb.append("Weight: ").append(this.getWeight()).append(System.lineSeparator());
		sb.append("Radius: ").append(this.getRadius()).append(System.lineSeparator());
		//sb.append("Sum geo: ").append(this.distances[0]);
		sb.append(System.lineSeparator());
		//sb.append(System.lineSeparator());
		return sb.toString();
		
	}
	
	public int getN(){
		return this.N;
	}
	
	public int getNwords(){
		return this.Nwords;
	}
	
	public double[] getDist(){
		return this.distances;
	}
	
	public double getLambda(){
		return this.lambda;
	}
	
	
//	public Double getLat(){
//		return this.getCenter()[0];
//	}
//	public Double getLong(){
//		return this.getCenter()[1];
//	}
//	public Double getHour(){
//		return this.getCenter()[2];
//	}
//	public Double getWeekday(){
//		return this.getCenter()[3];
//	}
//    public String[] getUsers(){
//    	return (String[]) users.keySet().toArray();
//    }
//    public String[] getWords(){
//    	return (String[]) words.keySet().toArray();
//    }
}
