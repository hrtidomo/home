<?php
/**
 * BATCH
 * APIHOME
 */

namespace Business;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$currentDirectory = dirname(__FILE__);
$confLocation = $currentDirectory;
global $configuration;
global $globalPath;
global $appPath;
$configuration = parse_ini_file($currentDirectory . "/../conf.ini");
$globalPath    = $configuration["GLBLPATH"];
$appPath       = trim($configuration["BATCHROOT"]) . "/APIHOMEFIBARO";
require_once $globalPath . '/MODEL/BL/Result.php';
require_once  $appPath   . '/APIHOMEFIBAROWRK.php';
use WebSocket\Client;
global $loggerObject;
// ---------------------------------------------------------------------------------
// El programa espera dos parámetros:
//    1 -> 
//    2 ->
//    3 -> 
//    4 -> 
// ---------------------------------------------------------------------------------
   $argumentsArray = $argv;
   $numberOfArguments = count($argumentsArray);
   if ($numberOfArguments >= 6) {
    $url          = $argumentsArray[1];
    $username     = $argumentsArray[2];
    $password     = $argumentsArray[3];
    $module       = $argumentsArray[4];
    $action       = $argumentsArray[5];
    $flat         = $argumentsArray[6];
    $userx        = $argumentsArray[7];
   

///$iphome = $_GET['iphome'];
///$user = $_GET['user'];
///$password = $_GET['password'];
///$module = $_GET['module'];
///$action = $_GET['action'];
///$flat = $_GET['flat'];
///$userx = $_GET['userx'];



    $servername = php_uname("n");
    echo "PASOA";
   //********************************************** */
	//*Comprueva si el servername ,modulo esta permitido
	//*********************************************** */
    
  echo "PASOB";    
  $resultapihome = APIHOMEFIBARO::performTask($url, $username, $password,$module,$action,$flat,$userx);
  echo "PASOC";  
    
    $oscar="";
}
   



?>
