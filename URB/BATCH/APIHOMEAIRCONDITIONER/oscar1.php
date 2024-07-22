<?php
require 'vendor/autoload.php';

use WebSocket\Client;


$myObj = new stdClass();
$myObj->action = "x";
$myObj->value  = "";
$myObj->plane  = "";
$myJSON = json_encode($myObj);
echo $myJSON;

$client = new Client("ws://192.168.200.127:8080");
//$client->send("Hello WebSocket Server!");
$client->send($myJSON);
echo $client->receive(); // will output 'Hello WebSocket Server!'
?>
