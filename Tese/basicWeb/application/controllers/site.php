<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	public function index(){
		$this->load->view("view_home3");
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

	function getTimeClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getTimeClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getSpaceClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getSpaceClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getContentClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getContentClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getTimeSpaceClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getTimeSpaceClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getSpaceContentClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getSpaceContentClusters();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getContentTimeClusters(){
	$this->load->model("clusters");
	$data = $this->clusters->getContentTimeClusters();

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

	function getVerbetes(){
	$this->load->model("verbetes");
	$data = $this->verbetes->getVerbete();

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getNews($id, $today){
	
	$url = 'http://services.sapo.pt/InformationRetrieval/Epicentro/GetNews?ESBToken=01.GROnLHWLh7UtJo2XIpn6DA&limit=8&nodesIDs='+$id+'&beginDate=2014-11-20&sectionsIDs=1,2,3,4,5,6,7,8,9&endDate='+$today+'';
	$data = file_get_contents($url);

    // $this->output->set_content_type('application/json')
    //              ->set_output(json_encode($data));

	$obj = json_decode($data);
	echo $obj->access_token;

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}

	function getMicroIds($id, $type){
		
	$this->load->model("microId");
	$data = $this->microId->getMicroIds($id, $type);

    $this->output->set_content_type('application/json')
                 ->set_output(json_encode($data));

	header('Access-Control-Allow-Origin: http://localhost:8080');
	}
}
?>