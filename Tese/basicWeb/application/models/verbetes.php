<?php

class Verbetes extends CI_Model {

    function getVerbete(){
        $query = $this->db->query('SELECT * from persons_ids');

        return $query->result();
    }

}