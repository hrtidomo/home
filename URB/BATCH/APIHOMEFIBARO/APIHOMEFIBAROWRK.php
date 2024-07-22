<?php

namespace Business;
require_once $globalPath . '/MODEL/BL/Result.php';
require_once $globalPath . '/MODEL/BL/XLSX.php';
require_once $globalPath . '/MODEL/BL/Mail.php';
require_once $globalPath . '/MODEL/BL/SMTP.php';
require_once $appPath    . '/APIHOMEFIBARODAO.php';

class APIHOMEFIBARO {



//********************************************** */
//*
//*********************************************** */
public static function performTask($url, $username, $password,$module,$action,$flat,$userx) {
	$result = new \Business\Result();
    switch ($action) {
		//*******************************************************************
		//*ESCANEA LOS NUEVOS DISPOSITIVOS FIBARO
		//***************************************************************** */
		case "scannew":
			$strurl="http://" . $url ."/api/devices";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL,$strurl );
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
			$response = curl_exec($ch);	
			if($response === false)
				{
					//$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
				}
			else
				{
					$array = json_decode($response, true);
					$result = \DAOProcess::listadodevices("SI");
					foreach($array  as  $campo)
					{
						$name=substr ($campo['name']."xxxxxxxxxxxx",0,3);
                        foreach($result->object  as  $row)
							{
								$nameshort=$row['nameshort'];      
								if($nameshort==$name) 
									{
										
										$strurl="http://" . $url ."/api/devices?id=".$campo["id"];;
										$ch = curl_init();
										curl_setopt($ch, CURLOPT_URL,$strurl );
										curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
										curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
										curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
										$response = curl_exec($ch);	
										$resultx = \DAOProcess::devices($campo,$response,$nameshort,"SI");		
									}
							}
					}
				}
		break;	
		//*******************************************************************
		//*ACTUALIZA LOS ESTADOS DE LOS DISPOSITIVOS FIBARO
		//***************************************************************** */
		case "scan":
			$strurl="http://" . $url ."/api/devices";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL,$strurl );
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
			$response = curl_exec($ch);	
			if($response === false)
				{
					//$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
				}
			else
				{
					$array = json_decode($response, true);
					$result = \DAOProcess::listadodevices("NO");
					foreach($array  as  $campo)
					{
						$name=substr ($campo['name']."xxxxxxxxxxxx",0,3);
                        foreach($result->object  as  $row)
							{
								$nameshort=$row['nameshort'];      
								if($nameshort==$name) 
									{
										
										$strurl="http://" . $url ."/api/devices?id=".$campo["id"];;
										$ch = curl_init();
										curl_setopt($ch, CURLOPT_URL,$strurl );
										curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
										curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
										curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
										$response = curl_exec($ch);	
										$resultx = \DAOProcess::devices($campo,$response,$nameshort,"NO");		
									}
							}
					}
				}
		break;
				
	
	}
	
	return $result ;
	}
		
}


?>
