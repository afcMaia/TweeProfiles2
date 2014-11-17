<?php

class Cwords extends CI_Model {

    function getAllClustersWords(){

        // $query = $this->db->query("SELECT * FROM micro_cluster_words WHERE test={$test} and mcluster_id={$id}" );
        $query = $this->db->query("SELECT * FROM cluster_words" );
        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}
