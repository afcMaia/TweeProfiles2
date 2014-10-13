/**
 * Subspace MOA [DenStream_DBSCAN.java]
 * 
 * DenStream with DBSCAN as the macro-clusterer.
 * 
 * @author Stephan Wels (stephan.wels@rwth-aachen.de)
 * @editor Yunsu Kim
 * Data Management and Data Exploration Group, RWTH Aachen University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *    
 *    
 */

package algorithm.micro;

import java.util.ArrayList;
import java.util.Arrays;

import dataprocessing.TextProcessing;
import algorithm.Distances;
import moa.cluster.Cluster;
import moa.cluster.Clustering;
import moa.clusterers.AbstractClusterer;
import moa.clusterers.denstream.Timestamp;
import moa.clusterers.macro.dbscan.DBScan;
import moa.core.Measurement;
import moa.options.FloatOption;
import moa.options.IntOption;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;

public class HybridDenStream extends AbstractClusterer {

	private static final long serialVersionUID = 1L;
	
	public IntOption horizonOption = new IntOption("horizon", 'h',
			"Range of the window.", 1000);
	public FloatOption epsilonOption = new FloatOption("epsilon", 'e',
			"Defines the epsilon neighbourhood", 0.5, 0, 1);
	// public IntOption minPointsOption = new IntOption("minPoints", 'p',
	// "Minimal number of points cluster has to contain.", 10);

	public FloatOption betaOption = new FloatOption("beta", 'b', "", 0.2, 0, 1);
	public FloatOption muOption = new FloatOption("mu", 'm', "", 1, 0,
			Double.MAX_VALUE);
	public IntOption initPointsOption = new IntOption("initPoints", 'i',
			"Number of points to use for initialization.", 1000);

	public FloatOption offlineOption = new FloatOption("offline", 'o',
			"offline multiplier for epsilion.", 2, 2, 20);

	public FloatOption lambdaOption = new FloatOption("lambda", 'l', "", 0.25,
			0, 1);

	public IntOption speedOption = new IntOption("processingSpeed", 's',
			"Number of incoming points per time unit.", 100, 1, 1000);

	// private double weightThreshold = 0.01;
	double lambda;
	double epsilon;
	int minPoints;
	double mu;
	double beta;

	Clustering p_micro_cluster;
	Clustering o_micro_cluster;
	ArrayList<DenPoint> initBuffer;

	boolean initialized;
	private long timestamp = 0;
	Timestamp currentTimestamp;
	long tp;

	/* #point variables */
	protected int numInitPoints;
	protected int numProcessedPerUnit;
	protected int processingSpeed;
	// TODO Some variables to prevent duplicated processes

	protected int idcount;

	private class DenPoint extends DenseInstance {

		private static final long serialVersionUID = 1L;

		protected boolean covered;
		protected Instances dataset;

		public DenPoint(Instance nextInstance, Long timestamp) {
			super(nextInstance);
			this.setDataset(nextInstance.dataset());
			this.dataset = nextInstance.dataset();
		}

		public double getLat() {
			// System.out.println(this.value(dataset.attribute("lat")));
			return this.value(dataset.attribute("lat"));
		}

		public double getLong() {
			// System.out.println(this.value(dataset.attribute("lon")));
			return this.value(dataset.attribute("lon"));
		}

		public double getHour() {
			// System.out.println(this.value(dataset.attribute("hour")));
			return this.value(dataset.attribute("hour"));
		}

		public double getWeekday() {
			// System.out.println(this.value(dataset.attribute("weekday")));
			return this.value(dataset.attribute("weekday"));
		}

		// public String getUser() {
		// return this.stringValue(new Attribute("user", (List<String>) null));
		// }

		public String getWords() {
			return this.stringValue(dataset.attribute("text"));
		}

		public String getTimestamp() {
			// System.out.println(this.stringValue(dataset.attribute("timestamp")));
			return this.stringValue(dataset.attribute("timestamp"));
		}
	}

	public HybridDenStream() {
	}

	@Override
	public void resetLearningImpl() {
		// init DenStream
		currentTimestamp = new Timestamp();
		// lambda = -Math.log(weightThreshold) / Math.log(2)
		// / (double) horizonOption.getValue();
		lambda = lambdaOption.getValue();

		epsilon = epsilonOption.getValue();
		minPoints = (int) muOption.getValue();// minPointsOption.getValue();
		mu = (int) muOption.getValue();
		beta = betaOption.getValue();

		initialized = false;
		p_micro_cluster = new Clustering();
		o_micro_cluster = new Clustering();
		initBuffer = new ArrayList<DenPoint>();

		//tp = Math.round(1 / lambda * Math.log((beta * mu) / (beta * mu - 1))) + 1;

		tp = 50;
		
		numProcessedPerUnit = 0;
		processingSpeed = speedOption.getValue();

		idcount = 1;
		System.out.println("TP:"+tp);
	}

	public void initialDBScan() {
		for (int p = 0; p < initBuffer.size(); p++) {
			DenPoint point = initBuffer.get(p);
			if (!point.covered) {
				point.covered = true;
				ArrayList<Integer> neighbourhood = getNeighbourhoodIDs(point,
						initBuffer, epsilon);
				if (neighbourhood.size() > minPoints) {
					double[] center = new double[] { point.getLat(),
							point.getLong(), point.getHour(),
							point.getWeekday() };
					HybridMicroCluster mc = new HybridMicroCluster(idcount,
							center, timestamp, lambda, currentTimestamp,
							point.getWords(), point.getTimestamp());
					// TODO dimensions hardcoded
					idcount++;
					expandCluster(mc, initBuffer, neighbourhood);
					p_micro_cluster.add(mc);
				} else {
					point.covered = false;
				}
			}
		}
	}

	@Override
	public void trainOnInstanceImpl(Instance inst) {
		DenPoint point = new DenPoint(inst, timestamp);
		numProcessedPerUnit++;

		/* Controlling the stream speed */
		if (numProcessedPerUnit % processingSpeed == 0) {
			timestamp++;
			currentTimestamp.setTimestamp(timestamp);
		}

		// ////////////////
		// Initialization//
		// ////////////////
		if (!initialized) {
			initBuffer.add(point);
			if (initBuffer.size() >= initPointsOption.getValue()) {
				initialDBScan();
				initialized = true;
			}
		} else {
			// ////////////
			// Merging(p)//
			// ////////////
			boolean merged = false;
			if (p_micro_cluster.getClustering().size() != 0) {
				HybridMicroCluster x = nearestCluster(point, p_micro_cluster);
				HybridMicroCluster xCopy = x.copy();
				xCopy.insert(point, timestamp);
				if (xCopy.getRadius(timestamp) <= epsilon) {// TODO acrescentar
															// restriçoes
					x.insert(point, timestamp);
					merged = true;
				}
			}
			if (!merged && (o_micro_cluster.getClustering().size() != 0)) {
				HybridMicroCluster x = nearestCluster(point, o_micro_cluster);
				HybridMicroCluster xCopy = x.copy();
				xCopy.insert(point, timestamp);

				if (xCopy.getRadius(timestamp) <= epsilon) {// TODO acrescentar
															// restriçoes
					x.insert(point, timestamp);
					merged = true;
					if (x.getWeight() > beta * mu) {
						o_micro_cluster.getClustering().remove(x);
						p_micro_cluster.getClustering().add(x);
					}
				}
			}
			if (!merged) {
				o_micro_cluster.getClustering().add(
						new HybridMicroCluster(idcount, new double[] {
								point.getLat(), point.getLong(),
								point.getHour(), point.getWeekday() },
								timestamp, lambda, currentTimestamp, point
										.getWords(), point.getTimestamp()));
				// TODO hardcoded dimensions
				idcount++;
			}

			// //////////////////////////
			// Periodic cluster removal//
			// //////////////////////////
			if (timestamp % tp == 0) {
				ArrayList<HybridMicroCluster> removalList = new ArrayList<HybridMicroCluster>();
				for (Cluster c : p_micro_cluster.getClustering()) {
					if (((HybridMicroCluster) c).getWeight() < beta * mu) {
						removalList.add((HybridMicroCluster) c);
					}
				}
				for (Cluster c : removalList) {
					p_micro_cluster.getClustering().remove(c);
				}
				
				//mysql.removeClusters(removalList, test);

				for (Cluster c : o_micro_cluster.getClustering()) {
					long t0 = ((HybridMicroCluster) c).getCreationTime();
					double xsi1 = Math
							.pow(2, (-lambda * (timestamp - t0 + tp))) - 1;
					double xsi2 = Math.pow(2, -lambda * tp) - 1;
					double xsi = xsi1 / xsi2;
					if (((HybridMicroCluster) c).getWeight() < xsi) {
						removalList.add((HybridMicroCluster) c);
					}
				}
				for (Cluster c : removalList) {
					o_micro_cluster.getClustering().remove(c);
				}
				
				//mysql.insertClusters(p_micro_cluster, test);
			}

		}
	}

	private void expandCluster(HybridMicroCluster mc,
			ArrayList<DenPoint> points, ArrayList<Integer> neighbourhood) {
		for (int p : neighbourhood) {
			DenPoint npoint = points.get(p);
			if (!npoint.covered) {
				npoint.covered = true;
				mc.insert(npoint, timestamp);
				ArrayList<Integer> neighbourhood2 = getNeighbourhoodIDs(npoint,
						initBuffer, epsilon);
				if (neighbourhood.size() > minPoints) {
					expandCluster(mc, points, neighbourhood2);
				}
			}
		}
	}

	private ArrayList<Integer> getNeighbourhoodIDs(DenPoint point,
			ArrayList<DenPoint> points, double eps) {
		ArrayList<Integer> neighbourIDs = new ArrayList<Integer>();
		for (int p = 0; p < points.size(); p++) {
			DenPoint npoint = points.get(p);
			if (!npoint.covered) {
				double dist = distance(point, npoint);
				if (dist < eps) { // TODO mais restriçoes
					neighbourIDs.add(p);
				}
			}
		}
		return neighbourIDs;
	}

	private HybridMicroCluster nearestCluster(DenPoint p, Clustering cl) {
		HybridMicroCluster min = null;
		double minDist = 0;
		for (int c = 0; c < cl.size(); c++) {
			HybridMicroCluster x = (HybridMicroCluster) cl.get(c);
			if (min == null) {
				min = x;
			}
			// double dist = distance(p.toDoubleArray(), x.getCenter());
			double dist = distance(p, x);
			dist -= x.getRadius(timestamp);
			if (dist < minDist) {
				minDist = dist;
				min = x;
			}
		}
		return min;

	}

	private double distance(DenPoint p1, DenPoint p2) {
		double dist = 0.0;
//		dist += Distances.haversineDistance(
//				new double[] { p1.getLat(), p2.getLat() },
//				new double[] { p1.getLong(), p2.getLong() })
//				/ Distances.MAX_HAVERSINE;
		
//		dist += Distances.squaredDistance(
//				new double[] { p1.getHour(), p1.getWeekday() }, new double[] {
//						p2.getHour(), p2.getWeekday() })
//				/ Distances.squaredDistance(new double[] { Distances.MIN_HOUR,
//						Distances.MIN_WEEKDAY }, new double[] {
//						Distances.MAX_HOUR, Distances.MAX_WEEKDAY });
		
		dist += (1 - Distances.cosineSimilarity(
				TextProcessing.getTfMap(p1.getWords()),
				TextProcessing.getTfMap(p2.getWords())));
		
		// dist += Distances.socialDistance(p1.getUser(), p2.getUser());
		//System.out.println("Distance(p->p): " + dist);
		return dist ;
	}

	private double distance(DenPoint p, HybridMicroCluster hmc) {
		double dist = 0.0;
		double[] center = hmc.getCenter();
//		dist += Distances.haversineDistance(new double[] { p.getLat(),
//				center[0] }, new double[] { p.getLong(), center[1] })
//				/ Distances.MAX_HAVERSINE;
		
//		dist += Distances.squaredDistance(
//				new double[] { p.getHour(), p.getWeekday() }, new double[] {
//						center[2], center[3] })
//				/ Distances.squaredDistance(new double[] { Distances.MIN_HOUR,
//						Distances.MIN_WEEKDAY }, new double[] {
//						Distances.MAX_HOUR, Distances.MAX_WEEKDAY });
	
		dist += (1 - Distances.cosineSimilarity(hmc.getWordsTFMap(),
				TextProcessing.getTfMap(p.getWords())));
		
		// dist += Distances.socialDistance(p.getUser(), hmc.getUsers());
		//System.out.println("Distance(p->c): " + dist);
		return dist ;
	}

	public static double[] distances(Instance inst, HybridMicroCluster hmc) {
		DenPoint p = (DenPoint) inst;
		double[] dist = new double[4];
		Arrays.fill(dist, 0.0);
		double[] center = hmc.getCenter();
//		dist[0] = Distances.haversineDistance(new double[] { p.getLat(),
//				center[0] }, new double[] { p.getLong(), center[1] });
//				// / Distances.MAX_HAVERSINE;
		
//		dist[1] = Distances.squaredDistance(
//				new double[] { p.getHour(), p.getWeekday() }, new double[] {
//						center[2], center[3] });		
////				/ Distances.squaredDistance(new double[] { Distances.MIN_HOUR,
////						Distances.MIN_WEEKDAY }, new double[] {
////						Distances.MAX_HOUR, Distances.MAX_WEEKDAY });
		
		dist[2] = 1 - Distances.cosineSimilarity(hmc.getWordsTFMap(),
				TextProcessing.getTfMap(p.getWords()));
		
		// dist[3] = Distances.socialDistance(p.getUser(), hmc.getUsers());

		return dist;
	}

	public Clustering getClusteringResult() {
		DBScan dbscan = new DBScan(p_micro_cluster, offlineOption.getValue()
				* epsilon, minPoints);
		return dbscan.getClustering(p_micro_cluster);
	}

	@Override
	public boolean implementsMicroClusterer() {
		return true;
	}

	@Override
	public Clustering getMicroClusteringResult() {
		return p_micro_cluster;
	}

	@Override
	protected Measurement[] getModelMeasurementsImpl() {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public void getModelDescription(StringBuilder out, int indent) {
	}

	public boolean isRandomizable() {
		return true;
	}

	public double[] getVotesForInstance(Instance inst) {
		return null;
	}

	public String getParameterString() {
		StringBuffer sb = new StringBuffer();
		sb.append(this.getClass().getSimpleName() + " ");

		sb.append("-" + horizonOption.getCLIChar() + " ");
		sb.append(horizonOption.getValueAsCLIString() + " ");

		sb.append("-" + epsilonOption.getCLIChar() + " ");
		sb.append(epsilonOption.getValueAsCLIString() + " ");

		sb.append("-" + betaOption.getCLIChar() + " ");
		sb.append(betaOption.getValueAsCLIString() + " ");

		sb.append("-" + muOption.getCLIChar() + " ");
		sb.append(muOption.getValueAsCLIString() + " ");

		sb.append("-" + lambdaOption.getCLIChar() + " ");
		sb.append(lambdaOption.getValueAsCLIString() + " ");

		sb.append("-" + initPointsOption.getCLIChar() + " ");
		// NO " " at the end! results in errors on windows systems
		sb.append(initPointsOption.getValueAsCLIString());

		return sb.toString();
	}

}
