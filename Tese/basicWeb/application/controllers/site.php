<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	public function index(){
		$this->load->view("view_home");
		$this->load->helper('url');
	}

	function getTweets(){
		$this->load->model("places");
		$data = $this->places->getplaces();
		// return ($data);
		// $this->load->view("view_db", $data);

        // $arrays = array($data);

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getMicroClusters(){
	$this->load->model("microclusters");
	$data = $this->microclusters->getAllMicroClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getMicroClustersWords(){
	$this->load->model("mcwords");
	$data = $this->mcwords->getAllMicroClustersWords();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getAllClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getClustersWords(){
	$this->load->model("cwords");
	$data = $this->cwords->getAllClustersWords();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}
}