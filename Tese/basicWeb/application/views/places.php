<?php
         $hostname="localhost";
         $database="tweeprofiles";
         $username="tweeprofiles";
         $password="tweeprofiles";

   //DO NOT EDIT BELOW THIS LINE
     $link = mysql_connect($hostname, $username, $password);
     mysql_select_db($database) or die('Could not select database');

$result = mysql_query("SELECT * FROM tweets");
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