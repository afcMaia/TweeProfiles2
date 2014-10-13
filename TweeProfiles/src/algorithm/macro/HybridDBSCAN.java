package algorithm.macro;

/**
 * [DBScan.java] for Subspace MOA
 * 
 * An implementation of DBSCAN.
 * 
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

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;


//import dataprocessing.TextProcessing;
import algorithm.Distances;
import algorithm.micro.HybridMicroCluster;
import moa.cluster.Cluster;
import moa.cluster.Clustering;
import moa.clusterers.macro.AbstractMacroClusterer;

public class HybridDBSCAN extends AbstractMacroClusterer {

	// Clustering datasource;
	private double mEps;
	private int mMinPts;
	public int n, noise;

	public HybridDBSCAN(/* Clustering microClusters, */double eps, int MinPts) {
		// datasource = microClusters;
		mEps = eps;
		mMinPts = MinPts;
	}

	private ArrayList<DenseMicroCluster> expandCluster(DenseMicroCluster dmc,
			List<DenseMicroCluster> neighbours,
			ArrayList<DenseMicroCluster> arrayList,
			Vector<DenseMicroCluster> dbmc) {

		if (!dmc.isClustered()) {
			dmc.setClustered();
			arrayList.add(dmc);
		}
		while (!neighbours.isEmpty()) {
			DenseMicroCluster mc = neighbours.get(0);
			neighbours.remove(0);
			if (!mc.isVisited()) {
				mc.setVisited();
				List<DenseMicroCluster> neighbours2 = getNeighbourhood(mc, dbmc);
				if (neighbours2.size() >= mMinPts) {
					while (!neighbours2.isEmpty()) {
						DenseMicroCluster temp = neighbours2.get(0);
						neighbours2.remove(0);
						if (!temp.isVisited()) {
							neighbours.add(temp);
						}
					}
					neighbours.addAll(neighbours2);
					if (!mc.isClustered()) {
						mc.setClustered();
						arrayList.add(mc);
					}
				}
			}
		}
		return arrayList;
	}

	private List<DenseMicroCluster> getNeighbourhood(DenseMicroCluster mc,
			Vector<DenseMicroCluster> dbmc) {
		List<DenseMicroCluster> res = new Vector<DenseMicroCluster>();
		for (DenseMicroCluster dmc : dbmc) {
//			System.out.println("dist(c->c)="+distance(dmc.getCluster(), mc.getCluster()));
			if (distance(dmc.getCluster(), mc.getCluster()) < mEps) {
				res.add(dmc);
			}
		}
		return res;
	}

	// private double distance(double[] center, double[] center2) {
	// double d = 0D;
	// for (int i = 0; i < center.length; i++) {
	// d += Math.pow((center[i] - center2[i]), 2);
	// }
	// return Math.sqrt(d);
	// }
	//
	private double distance(HybridMicroCluster hmc, HybridMicroCluster hmc2) {
		double[] center1 = hmc.getCenter();
		double[] center2 = hmc2.getCenter();
		double dist = 0;
//		dist += Distances.haversineDistance(new double[] { center1[0],
//				center2[0] }, new double[] { center1[1], center2[1] })
//				/ Distances.MAX_HAVERSINE;
//		System.out.println("Haversine:"+dist);
		
//		dist += Distances.squaredDistance(
//				new double[] { center1[2], center1[3] }, new double[] {
//						center2[2], center2[3] })
//				/ Distances.squaredDistance(new double[] { Distances.MIN_HOUR,
//						Distances.MIN_WEEKDAY }, new double[] {
//						Distances.MAX_HOUR, Distances.MAX_WEEKDAY });
////		System.out.println("Euclidean:"+dist);
				
		dist += 1-Distances.cosineSimilarity(hmc.getWordsTFMap(),
				hmc2.getWordsTFMap());
//		System.out.println("Cosine:"+dist);
		
		return dist;
	}

	@Override
	public Clustering getClustering(Clustering microClusters) {
		this.n = microClusters.size();
		if (microClusters != null && microClusters.size() != 0) {
			Vector<DenseMicroCluster> dbmc = new Vector<DenseMicroCluster>();
			for (Cluster c : microClusters.getClustering()) {
//				HybridMicroCluster hmc = null;
				if (c instanceof HybridMicroCluster) {
					HybridMicroCluster hmc = (HybridMicroCluster) c;
//					System.out.println(hmc.toString());
					dbmc.add(new DenseMicroCluster(hmc));
				} else
					throw new RuntimeException();
			}

			ArrayList<ArrayList<DenseMicroCluster>> clusters = new ArrayList<ArrayList<DenseMicroCluster>>();

			for (DenseMicroCluster dmc : dbmc) {
				if (!dmc.isVisited()) {
					dmc.setVisited();
					List<DenseMicroCluster> neighbours = getNeighbourhood(dmc,
							dbmc);
					if (neighbours.size() >= mMinPts) {
						ArrayList<DenseMicroCluster> cluster = expandCluster(
								dmc, neighbours,
								new ArrayList<DenseMicroCluster>(), dbmc);
						clusters.add(cluster);
					}
				}
			}
			// ** create big microclusters,
			// CFCluster[] res = new CFCluster[clusters.size()];
			// int clusterPos = 0;
			// for (ArrayList<DenseMicroCluster> cluster : clusters) {
			// if (cluster.size() != 0) {
			// CFCluster temp = (CFCluster) (cluster.get(0).mCluster.copy());
			// res[clusterPos] = temp;
			// for (int i = 1; i < cluster.size(); i++) {
			// res[clusterPos].add(cluster.get(i).mCluster);
			// }
			// clusterPos++;
			// }
			// }
			// Clustering result = new Clustering(res);

			// **
			HybridMicroCluster[] res = new HybridMicroCluster[clusters.size()];
			int clusterPos = 0;
			for (ArrayList<DenseMicroCluster> cluster : clusters) {
				if (cluster.size() != 0) {
					HybridMicroCluster temp = new HybridMicroCluster(clusterPos,cluster
							.get(0).getCluster(),
							Convert2microclusterList(cluster));
					res[clusterPos] = temp;

					// for (int i = 1; i < cluster.size(); i++) {
					// res[clusterPos].add(cluster.get(i).getCluster());
					// }

					clusterPos++;
				}
			}

			// //// count Noise
			int noise = 0;
			for (DenseMicroCluster c : dbmc) {
				if (!c.isClustered()) {
					noise++;
				}
			}
			// System.out.println("microclusters which are not clustered:: "+
			// noise);
			this.noise = noise;
			Clustering result = new Clustering(res);
			//setClusterIDs(result);
//			for (Cluster c : result.getClustering()) {
//				c.setId(i++);
//			}
			return result;
		}
		return new Clustering();
	}

	private List<HybridMicroCluster> Convert2microclusterList(
			ArrayList<DenseMicroCluster> cluster) {
		List<HybridMicroCluster> mClusterList = new Vector<HybridMicroCluster>();
		for (DenseMicroCluster d : cluster) {
			mClusterList.add(d.getCluster());
		}
		return mClusterList;
	}
}
