<?php

class Places extends CI_Model {

    function getplaces(){
        $query = $this->db->query('SELECT * from tweets ORDER BY id DESC LIMIT 1000');

        // foreach ($query->result() as $row) {
        //     echo $row->id;
        //     echo $row->lat;
        //     echo $row->lon;
        //     echo $row->text;
        // }
        return $query->result();
    }

}