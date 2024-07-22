<?php
/**
 * BATCH
 * APIHOMEACTIO
 */



 
namespace Business;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$currentDirectory = dirname(__FILE__);
$confLocation = $currentDirectory;
global $configuration;
global $globalPath;
global $webdavPath;
global $appPath;
$configuration = parse_ini_file($currentDirectory . "/../conf.ini");
$globalPath    = $configuration["GLBLPATH"];
$webdavPath    = $configuration["WEBDAVPATH"];
$appPath       = trim($configuration["BATCHROOT"]) . "/APIHOMEACTION";
 
require_once $globalPath . '/MODEL/BL/Result.php';
require_once $globalPath . '/MODEL/BL/Logger.php';
require_once $webdavPath . '/vendor/autoload.php';
require_once  $appPath   . '/APIHOMEWRKACTION.php';
global $loggerObject;
$result = new \Business\Result();
// ---------------------------------------------------------------------------------
// El programa espera dos parámetros:
//    1 -> 
//    2 ->
//    3 -> 
//    4 -> 
// ---------------------------------------------------------------------------------

///$argumentsArray = $_GET;
///$argumentsArray = $argv;
///$numberOfArguments = count($argumentsArray);

$iphome = $_GET['iphome'];
$user = $_GET['user'];
$password = $_GET['password'];
$module = $_GET['module'];
$action = $_GET['action'];
$flat = $_GET['flat'];
$userx = $_GET['userx'];



///if ($numberOfArguments >= 5) {
   /// $iphome       = $argumentsArray[1];
   /// $user         = $argumentsArray[2];
   /// $password     = $argumentsArray[3];
   /// $module       = $argumentsArray[4];
   /// $action       = $argumentsArray[5];
   /// $flat         = $argumentsArray[6];
   /// $userc        = $argumentsArray[7];
    

    $servername = php_uname("n");
    //********************************************** */
	//*Comprueva si el servername ,modulo esta permitido
	//*********************************************** */
    //iphome=192.168.200.111&user=admin&password=admin&modulo=abd&accion=turnOn

    
    $result = APIHOMEACTION::performTask($iphome,$user,$password,$module,$action,$flat,$userx);
    echo $result->object;
 //}

?>
