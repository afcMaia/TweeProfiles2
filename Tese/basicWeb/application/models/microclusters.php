<?php

class Microclusters extends CI_Model {

    function getAllMicroClusters(){

        $query = $this->db->query('SELECT * FROM micro_clusters ORDER BY nwords DESC');

        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}
