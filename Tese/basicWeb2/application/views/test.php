<?php

//see http://php.net/manual/en/function.call-user-func-array.php how to use extensively
if(isset($_GET['runFunction']) && function_exists($_GET['runFunction']))
call_user_func($_GET['runFunction']);
else
echo "Function not found or wrong input";

function test()
{
echo("test");
}

function hello()
{
echo("hello");
}

?>