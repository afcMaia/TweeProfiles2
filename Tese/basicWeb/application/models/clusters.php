<?php

class Clusters extends CI_Model {

    function getAllClusters(){
        $query = $this->db->query('SELECT * FROM clusters');

        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}
