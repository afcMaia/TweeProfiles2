<?php
$server = 'localhost';
$user = 'tweeprofiles';
$pass = 'tweeprofiles';
$dbname = 'tweeprofiles';
$con = mysql_connect($server, $user, $pass) or die(mysql_error());
//echo "Connected to MySQL<br />";
mysql_select_db($dbname) or die(mysql_error());
//echo "Connected to Database";

mysql_query("SET NAMES 'utf8'", $con);

$test = $_GET['test'];
$id = $_GET['id'];

$result = mysql_query("SELECT * FROM cluster_words WHERE test={$test} and cluster_id={$id} and freq > 1 ORDER BY freq DESC LIMIT 500 OFFSET 0 " );
if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
}

$a=array();

while($row = mysql_fetch_assoc($result))
{
   $a[]=$row;
}

mysql_close();

header('Content-Type: application/json');
echo json_encode($a,JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);

?>
