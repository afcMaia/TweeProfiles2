<?php

class AllTweets extends CI_Model {

    function getAllTweets(){
        $query = $this->db->query('SELECT * from tweets ORDER BY id DESC LIMIT 2500');

        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}