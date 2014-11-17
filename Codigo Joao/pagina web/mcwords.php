<?php

class Mcwords extends CI_Model {

    function getAllMicroClustersWords(id, test){

        $query = $this->db->query("SELECT * FROM micro_cluster_words WHERE test={$test} and mcluster_id={$id}" );

        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}
