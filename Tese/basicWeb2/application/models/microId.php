<?php

class MicroId extends CI_Model {

    function getMicroIds($cId,$type){
        $query = $this->db->query('SELECT * FROM IDS WHERE cIDS='.$cId.' and type='.$type.' LIMIT 2000');
        // // foreach ($query->result() as $row) {
        // //     echo $row->id;
        // //     echo $row->lat;
        // //     echo $row->lon;
        // //     echo $row->text;
        // // }
        return $query->result();
    }

}
