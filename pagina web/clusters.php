<?php
$server = 'localhost';
$user = 'tweeprofiles';
$pass = 'tweeprofiles';
$dbname = 'tweeprofiles';
$con = mysql_connect($server, $user, $pass) or die(mysql_error());
//echo "Connected to MySQL<br />";
mysql_select_db($dbname) or die(mysql_error());
//echo "Connected to Database";

$test = $_GET['test'];

$result = mysql_query("SELECT * FROM clusters WHERE test={$test}");
if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
}

$a=array();

while($row = mysql_fetch_assoc($result))
{
   $a[]=$row;
}

header('Content-Type: application/json');
echo json_encode($a,JSON_NUMERIC_CHECK);

?>
