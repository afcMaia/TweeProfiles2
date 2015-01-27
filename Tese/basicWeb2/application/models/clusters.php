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

        function getTimeClusters(){
        $query = $this->db->query('SELECT * FROM clusters_time');

        return $query->result();
        }

        function getSpaceClusters(){
        $query = $this->db->query('SELECT * FROM clusters_space');

        return $query->result();
        }

        function getContentClusters(){
        $query = $this->db->query('SELECT * FROM clusters_content');

        return $query->result();
        }

        function getTimeSpaceClusters(){
            $query = $this->db->query('SELECT * FROM clusters_timespace');

            return $query->result();
        }

        function getSpaceContentClusters(){
            $query = $this->db->query('SELECT * FROM clusters_spacecontent');

            return $query->result();
        }

        function getContentTimeClusters(){
            $query = $this->db->query('SELECT * FROM clusters_timecontent');

            return $query->result();
        }

}
