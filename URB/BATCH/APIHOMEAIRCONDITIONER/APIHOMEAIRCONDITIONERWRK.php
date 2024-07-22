<?php

namespace Business;
require_once $globalPath . '/MODEL/BL/Result.php';
require_once $globalPath . '/MODEL/BL/XLSX.php';
require_once $globalPath . '/MODEL/BL/Mail.php';
require_once $globalPath . '/MODEL/BL/SMTP.php';
require_once $appPath    . '/APIHOMEAIRCONDITIONERDAO.php';

class APIHOMEAIRCONDITIONER {

//********************************************** */
//*
//*********************************************** */
public static function performTask($url, $username, $password,$module,$action,$flat,$userx) {
	$result = new \Business\Result();
    switch ($action) {
		//**************************************************** */
		//* ACTUALIZA LOS ESTADOS DEL CLIMATIZADOR 
		//**************************************************** */
		case "temp":
				$result = \DAOProcess::searchsensorairconditioner($action,$flat);
				foreach ($result->moduleid as $row)
				{
					$resultmoduleairconditionermax=$row['max'];
					$resultmoduleairconditionermin=$row['min'];
					$resultmoduleairconditioner=$row['airconditioner'];	
					$resultmoduleid=$row['id'];
					$resultmodulname=$row['name'];
					$resultmodulenameshort=$row['nameshort'];
					$resultmodulenameroom="";
					$resultmodulenamepositionx=$row['positionx'];
					$resultmodulenamepositiony=$row['positiony'];
					$strurl="http://" . $url ."/api/devices?id=".$resultmoduleid;
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL,$strurl );
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
					$response = curl_exec($ch);	
					//SI NO  HAY COMUNICACION DEVUELBE ERROR 10
					if($response === false)
						{
						}
					else
						{
						$array = json_decode($response, true);
						$value=(double) $array['properties']['value'];
						$result = \DAOProcess::savesensorairconditioner($url, $username, $password,$row,$value,$action);
						}
				
				
				
				}
				curl_close($ch);
			break;		
	
	}
	
	return $result ;


	}
		
}


?>
