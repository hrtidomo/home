<?php

namespace Business;
require_once $globalPath . '/MODEL/BL/Result.php';
require_once $appPath    . '/APIHOMEDAOACTION.php';

class APIHOMEACTION {

//********************************************** */
//*
//*cam		  :	Controla las camaras on/off winsocked
//*camon      : Controla las camaras on/off button
//*flat       : Devuelve los objetos de una habitacion 
//*state      : Devuelve los objetos de una casa
//*Temp       : Devuelbe las diferentes temperaturas winsocked

//*Tempstop   : Devuelbe las diferentes temperaturas button
//*Tempbed    : Devuelbe las diferentes temperaturas button
//*Tempsun    : Devuelbe las diferentes temperaturas button
//*turnconf    
//*turn      : Controla los interruptores on/off winsocked
//*turnonoff  : Controla los interruptores on/off button
//*********************************************** */
public static function performTask($url, $username, $password,$module,$action,$flat,$userx) {
	$result = new \Business\Result();
	switch ($action) {
		//**************************************************** */
		//* Carga los Cam
		//**************************************************** */
		//**************************************************** */
		//* action : winsoccked
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
		
		case "cam"://winsoccked w
			$result = \DAOProcess::searchcam($flat);
			$itemRecords=array();
			$itemRecords["items"]=array();
			foreach ($result->moduleid as $row)
			{
				if ('true' == $row['activate'])
				{
				$resultmoduleurlpreset = str_replace("preset",$row['presetx'],$row['httpport'].$row['preset']);
				$resultmoduleurlpreset = str_replace("user",$row['user'],$resultmoduleurlpreset);
				$resultmoduleurlpreset = str_replace("pass",$row['pass'],$resultmoduleurlpreset);
				//$ch = curl_init();
				//curl_setopt($ch, CURLOPT_URL,$resultmoduleurlpreset );
				//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				//$response = curl_exec($ch);	
				}
				$resultmoduleurl=$row['httpport'].$row['url'];
				$resultmodulepreset=$row['httpport'].$row['preset'];
				$resultmodulepositionx=$row['positionx'];
				$resultmodulepositiony=$row['positiony'];
				$resultmodulenameshort=$row['nameshort'];
				$resultmoduleactivate=$row['activate'];
				$resultmoduleuser=$row['user'];
				$resultmodulepass=$row['pass'];
				$resultmoduleurl=str_replace("user",$resultmoduleuser,$resultmoduleurl);
				$resultmoduleurl=str_replace("pass",$resultmodulepass,$resultmoduleurl);
				$itemDetails=array(
					"url" => $resultmoduleurl,
					"preset" => $resultmodulepreset,
					"positionx" => $resultmodulepositionx,
					"positiony" => $resultmodulepositiony,
					"module" => $resultmodulenameshort,
					"activate" => $resultmoduleactivate
				); 
				array_push($itemRecords["items"], $itemDetails);
			}
		$result->object=json_encode($itemRecords); 	
		break;	
		case "camon":
			//**************************************************** */
		    //* Carga una camara 
		    //**************************************************** */
			//**************************************************** */
			//* action :BUTTON
			//* module :El dispositivo 
			//* flat   : Vacio
			//**************************************************** */
			$result = \DAOProcess::searchcamid($module,$action);
			$itemRecords=array();
			$itemRecords["items"]=array(); 
			foreach ($result->moduleid as $row)
			{
				if ($module == $row['nameshort'])
				{
				$resultmoduleurlpreset = str_replace("preset",$row['presetx'],$row['httpport'].$row['preset']);
				$resultmoduleurlpreset = str_replace("user",$row['user'],$resultmoduleurlpreset);
				$resultmoduleurlpreset = str_replace("pass",$row['pass'],$resultmoduleurlpreset);
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,$resultmoduleurlpreset );
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$response = curl_exec($ch);	
				}
				$resultmoduleurl=$row['httpport'].$row['url'];
				$resultmodulepreset=$row['httpport'].$row['preset'];
				$resultmodulepositionx=$row['positionx'];
				$resultmodulepositiony=$row['positiony'];
				$resultmodulenameshort=$row['nameshort'];
				$resultmoduleactivate=$row['activate'];
				$resultmoduleuser=$row['user'];
				$resultmodulepass=$row['pass'];
				$resultmoduleurl=str_replace("user",$resultmoduleuser,$resultmoduleurl);
				$resultmoduleurl=str_replace("pass",$resultmodulepass,$resultmoduleurl);
				$itemDetails=array(
					"url" => $resultmoduleurl,
					"preset" => $resultmodulepreset,
					"positionx" => $resultmodulepositionx,
					"positiony" => $resultmodulepositiony,
					"module" => $resultmodulenameshort,
					"activate" => $resultmoduleactivate
				); 
				array_push($itemRecords["items"], $itemDetails);
			}	
		$result->object=json_encode($itemRecords); 
		break;	
		case "flatx":
		case "state"://
		//**************************************************** */
		//* Carga todo los objetos de la casa 
		//**************************************************** */
		//**************************************************** */
		//* action : state
		//* module : Vacio 
		//* flat   : Vacio
		//* A CARGA LOS SENSORES  DE LA CASA
		//* B CARGA LOS SENSORES  DE LA CASA ILUM(NO CONFIG)
		//* C CARGA LOS CONSUMOS DE LA LUZ (NO CONFIG)
		//* D CARGA ONOFFF DE LA CASA
		//* F CARGA LAS LUPAS  DE LA CASA
		//* P CARGA EL FLAT PRINCIPAL
		//* W CARGA LAS CAMS LA CASA
		//* Z CARGA LOS SESNSORES DE LAS TOMAS DE AIRE 
		
		//**************************************************** */
			$itemRecords=array();
			$itemRecords["items"]=array(); 
			//****************************************** */
			//* CARGA LOS SENSORES  DE LA CASA
			//******************************************** */
			$result = \DAOProcess::searchsensorroom($flat);
			foreach ($result->moduleid as $row)
			{
				if ($row['airconditioner'] == "tempstop") 
				{
				 $estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-stop"></i>';
				   }
				else  if ($row['airconditioner'] == "tempbed")
					{
				 $estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-bed "></i>';
				   }
				else if ($row['airconditioner'] == "tempsun")
					{
				 $estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-sun-o"></i>';
				   }
				$resultmoduleairconditionermax=$row['max'];
				$resultmoduleairconditionermin=$row['min'];
				$resultmoduleairconditionerhtml=$estadotemp;
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
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
				$itemRecords=array();
				$itemRecords["items"]=array(); 
				$itemDetails=array(
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $estadotemp,
					"airconditioner" => $resultmoduleairconditioner,						
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => "Error 10"); 
				array_push($itemRecords["items"], $itemDetails);
				$result->object=json_encode($itemRecords);
				}
				else
				{
				$array = json_decode($response, true);
				$value=$array['properties']['value'];
				$value=(double)$value;
				$max=intval($resultmoduleairconditionermax);
				$min=intval($resultmoduleairconditionermin);
				if (intval($resultmoduleairconditionermax) == 0  and  0 ==  intval($resultmoduleairconditionermin)  )
				{
					$resultmoduleairconditionerstatu="grey";
				}
				else if ( ($max >=$value)  and  ($value >=  $min)  )
				{
 					$resultmoduleairconditionerstatu="green";
				}
				else 
				{
					$resultmoduleairconditionerstatu="red";
				}
				
				
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,$value,'ok',$action);
				$itemDetails=array(
					"airconditionerstatu" => $resultmoduleairconditionerstatu,
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $estadotemp,
					"airconditioner" => $estadotemp,	
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => $value
				);
			}
				array_push($itemRecords["items"], $itemDetails);
			}
			//****************************************** */
			//* CARGA ONOFFF DE LA CASA
			//******************************************** */
			$result = \DAOProcess::searchonoff($flat);
			foreach ($result->moduleid as $row)
			{
				$resultmoduleid=$row['id'];
				$resultmodulname=$row['name'];
				$resultmodulenameshort=$row['nameshort'];
				$resultmodulenameroom="";
				$resultmodulenamepositionx=$row['positionx'];
				$resultmodulenamepositiony=$row['positiony'];
				$strurl="http://" . $url ."/api/devices?id=".$row["id"];;
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,$strurl );
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
				$response = curl_exec($ch);	
				//SI NO  HAY COMUNICACION DEVUELBE ERROR 10
				if($response === false)
					{
						$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
						$estadoonoff="Error 10";;
					}	
					else
					{
						
						$array = json_decode($response, true);
						$estado=$array['properties']['value'];
						$result = \DAOProcess::logapirest('',$resultmodulenameshort,$estado,'ok',$action);
						if ($estado==0)
						{ $estadoonoff="turnOff"; }
						else
						{ $estadoonoff="turnOn";}	
					}
				$itemDetails=array(
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => $estadoonoff
				); 
				array_push($itemRecords["items"], $itemDetails);
				$resultx = \DAOProcess::savestatusonoff($resultmodulname,$estadoonoff);	
			}
			//****************************************** */
			//* CARGA LAS LUPAS  DE LA CASA
			//******************************************** */		
			$result = \DAOProcess::searchflaticon($flat);
			foreach ($result->moduleid as $row)
			{
			 $resultmodulenameshort=$row['nameshort'];
			 $resultmoduleactivate=$row['activate'];
			 $resultmodulepositionx=$row['positionx'];
			 $resultmodulepositiony=$row['positiony'];
			 $resultmodulefile=$row['file'];
			 $resultmoduleidroomout=$row['idroomout'];
			 $itemDetails=array(
				"module" => $resultmodulenameshort,
				"activate" => $resultmoduleactivate,
				"positionx" => $resultmodulepositionx,
				"positiony" => $resultmodulepositiony,
				"idroomout" => $resultmoduleidroomout,
				"file" => $resultmodulefile
				); 
			array_push($itemRecords["items"], $itemDetails); 
			}
			//****************************************** */
			//*  CARGA LAS CAMS LA CASA
			//******************************************** */
			$result = \DAOProcess::searchcam($flat);
			foreach ($result->moduleid as $row)
			{
				if ('true' == $row['activate'])
				{
				$resultmoduleurlpreset = str_replace("preset",$row['presetx'],$row['httpport'].$row['preset']);
				$resultmoduleurlpreset = str_replace("user",$row['user'],$resultmoduleurlpreset);
				$resultmoduleurlpreset = str_replace("pass",$row['pass'],$resultmoduleurlpreset);
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,$resultmoduleurlpreset );
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				$response = curl_exec($ch);	
				}
				$resultmoduleurl=$row['httpport'].$row['url'];
				$resultmodulepreset=$row['httpport'].$row['preset'];
				$resultmodulepositionx=$row['positionx'];
				$resultmodulepositiony=$row['positiony'];
				$resultmodulenameshort=$row['nameshort'];
				$resultmoduleactivate=$row['activate'];
				$resultmoduleuser=$row['user'];
				$resultmodulepass=$row['pass'];
				$resultmoduleurl=str_replace("user",$resultmoduleuser,$resultmoduleurl);
				$resultmoduleurl=str_replace("pass",$resultmodulepass,$resultmoduleurl);
				$itemDetails=array(
					"url" => $resultmoduleurl,
					"preset" => $resultmodulepreset,
					"positionx" => $resultmodulepositionx,
					"positiony" => $resultmodulepositiony,
					"module" => $resultmodulenameshort,
					"activate" => $resultmoduleactivate
				); 
				array_push($itemRecords["items"], $itemDetails);
			}
			//****************************************** */
			//*  CARGA LOS SENSORES DE LOS PORTONES 
			//******************************************** */
			$result = \DAOProcess::searchaircon($flat);
			foreach ($result->moduleid as $row)
			{
			$resultmodulenameshort=$row['nameshort'];
		    $resultmodulestatuonoff=$row['statuonoff'];
			$resultmodulepositionx=$row['positionx'];
			$resultmodulepositiony=$row['positiony'];
			$itemDetails=array(
				"module" => $resultmodulenameshort,
				"action" => $resultmodulestatuonoff,
				"positionx" => $resultmodulepositionx,
				"positiony" => $resultmodulepositiony,
				); 
			array_push($itemRecords["items"], $itemDetails); 
			}
			$result->object=json_encode($itemRecords); 
		//curl_close($ch);
		
		break;
		case "temp":
		//**************************************************** */
		//* Carga los sensores temp
		//**************************************************** */
		//**************************************************** */
		//* action : winsoccked
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
			$itemRecords=array();
			$itemRecords["items"]=array(); 
			$result = \DAOProcess::searchsensorroom($flat);
			foreach ($result->moduleid as $row)
			{
				if ($row['airconditioner'] == "tempstop") 
				   {
					$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-stop"></i>';
		   		   }
		   		else  if ($row['airconditioner'] == "tempbed")
		   			{
					$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-bed "></i>';
		  			}
		   		else if ($row['airconditioner'] == "tempsun")
		   			{
					$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-sun-o"></i>';
		  			}
				$resultmoduleairconditionermax=$row['max'];
				$resultmoduleairconditionermin=$row['min'];
				$resultmoduleairconditionerhtml=$estadotemp;
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
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
				$itemRecords=array();
				$itemRecords["items"]=array(); 
				$itemDetails=array(
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $resultmoduleairconditionerhtml,
					"airconditioner" => $resultmoduleairconditioner,	
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => "Error 10"); 
				array_push($itemRecords["items"], $itemDetails);
				$result->object=json_encode($itemRecords);
				}
				else
				{
				$array = json_decode($response, true);
				$value=$array['properties']['value'];
				//$value=(str_replace(".",",",$value));
				$value=(double)$value;
				$max=intval($resultmoduleairconditionermax);
				$min=intval($resultmoduleairconditionermin);
				if (intval($resultmoduleairconditionermax) == 0  and  0 ==  intval($resultmoduleairconditionermin)  )
				{
					$resultmoduleairconditionerstatu="grey";
				}
				else if ( ($max >=$value)  and  ($value >=  $min)  )
				{
 					$resultmoduleairconditionerstatu="green";
				}
				else 
				{
					$resultmoduleairconditionerstatu="red";
				}
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,$value,'ok',$action);
				$itemDetails=array(
					"airconditionerstatu" => $resultmoduleairconditionerstatu,
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $resultmoduleairconditionerhtml,
					"airconditioner" => $resultmoduleairconditioner,	
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => $value
				);
			}
				array_push($itemRecords["items"], $itemDetails);
			}	
			$result = \DAOProcess::searchaircon($flat);
			foreach ($result->moduleid as $row)
			{
			$resultmodulenameshort=$row['nameshort'];
		    $resultmodulestatuonoff=$row['statuonoff'];
			$resultmodulepositionx=$row['positionx'];
			$resultmodulepositiony=$row['positiony'];
			$itemDetails=array(
				"module" => $resultmodulenameshort,
				"action" => $resultmodulestatuonoff,
				"positionx" => $resultmodulepositionx,
				"positiony" => $resultmodulepositiony,
				); 
			array_push($itemRecords["items"], $itemDetails); 
			}
				
				
				
				$result->object=json_encode($itemRecords);
			
			curl_close($ch);
		break;		
		//**************************************************** */
		//* Carga los sensores temp
		//**************************************************** */
		//**************************************************** */
		//* action : button
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
		case "tempbed":
		case "tempsun":
		case "tempstop":
		   if ($action == "tempbed")
		   {
			$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-stop"></i>';
			$estadotempid='tempstop';
		   }
		   else  if ($action == "tempsun")
		   {
			$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-bed "></i>';
			$estadotempid='tempbed';
		  }
		   else if ($action == "tempstop")
		   {
			$estadotemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-sun-o"></i>';
			$estadotempid='tempsun';
		   }
		   $result = \DAOProcess::searchsensormodule($module,$estadotempid);
		   $itemRecords=array();
		   $itemRecords["items"]=array();   
		   foreach ($result->moduleid as $row)
		   {
				$resultmoduleairconditionermax=$row['max'];
				$resultmoduleairconditionermin=$row['min'];
				$resultmoduleairconditionerhtml=$estadotemp;
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
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,'xx','Error 10',$action);
				$itemRecords=array();
				$itemRecords["items"]=array(); 
				$itemDetails=array(
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $resultmoduleairconditionerhtml,	
					"airconditioner" => $resultmoduleairconditioner,	
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => "Error 10"); 
				array_push($itemRecords["items"], $itemDetails);
				$result->object=json_encode($itemRecords);
				}
				else
				{
				$array = json_decode($response, true);
				$value=$array['properties']['value'];
				//$value=(double)(str_replace(".",",",$value));
				$value=(double)$value;
				$max=intval($resultmoduleairconditionermax);
				$min=intval($resultmoduleairconditionermin);
				if (intval($resultmoduleairconditionermax) == 0  and  0 ==  intval($resultmoduleairconditionermin)  )
				{
					$resultmoduleairconditionerstatu="grey";
				}
				else if ( ($max >=$value)  and  ($value >=  $min)  )
				{
 					$resultmoduleairconditionerstatu="green";
				}
				else 
				{
					$resultmoduleairconditionerstatu="red";
				}
					
				$result = \DAOProcess::logapirest('',$resultmodulenameshort,$value,'ok',$action);
				$itemDetails=array(
					"airconditionerstatu" => $resultmoduleairconditionerstatu,
					"airconditionermax" => $resultmoduleairconditionermax,
					"airconditionermin" => $resultmoduleairconditionermin,
					"airconditionerhtml" => $resultmoduleairconditionerhtml,	
					"airconditioner" => $resultmoduleairconditioner,	
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => $value
				);
			}
		   
		   }
			array_push($itemRecords["items"], $itemDetails);
			$result->object=json_encode($itemRecords);
		break;	
		//**************************************************** */
		//* ONOFF
		//**************************************************** */
		//**************************************************** */
		//* action : Configura los paramteros
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
		case "turnconf":
			$itemRecords=array();
			$itemRecords["items"]=array(); 
			$result = \DAOProcess::turnconf($module);
			foreach ($result->moduleid as $row)
			{
				 $resultmodulehtml=$row['html'];
				 $itemDetails=array(
					"html" => $resultmodulehtml
				
				);
				
			}

			array_push($itemRecords["items"], $itemDetails);
			$result->object=json_encode($itemRecords);
			break;
		
		
		//**************************************************** */
		//* Carga los ONOFF
		//**************************************************** */
		//**************************************************** */
		//* action : winsoccked
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
		case "turn":
			$itemRecords=array();
			$itemRecords["items"]=array(); 
			$result = \DAOProcess::searchonoff($flat);
			foreach ($result->moduleid as $row)
			{
				$resultmoduleid=$row['id'];
				$resultmodulname=$row['name'];
				$resultmodulenameshort=$row['nameshort'];
				$resultmodulenameroom="";
				$resultmodulenamepositionx=$row['positionx'];
				$resultmodulenamepositiony=$row['positiony'];
				$resultmodulenamestatuonoff=$row['statuonoff'];
				
				
				
				$itemDetails=array(
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => $resultmodulenamestatuonoff
				); 
				array_push($itemRecords["items"], $itemDetails);
				
			}
			$result->object=json_encode($itemRecords);
		break;
		//**************************************************** */
		//* Carga los ONOFF
		//**************************************************** */
		//**************************************************** */
		//* action : BUTTON
		//* module : Vacio 
		//* flat   : vacio
		//**************************************************** */
		case "turnOff":
		case "turnOn": //ACTIVA O DESACTIVA UN ELEMENTO ONOFF
				$result = \DAOProcess::searchnameid($module);
				$resultmoduleid=$result->moduleid[0]['id'];
				$resultmodulname=$result->moduleid[0]['name'];
				$resultmodulenameshort=$result->moduleid[0]['nameshort'];
				$resultmodulenameroom="";
				$resultmodulenamepositionx=$result->moduleid[0]['positionx'];
				$resultmodulenamepositiony=$result->moduleid[0]['positiony'];
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
				$result = \DAOProcess::logapirest('',$module,'xx','Error 10',$action);
				$itemRecords=array();
				$itemRecords["items"]=array(); 
				$itemDetails=array(
					"moduleid" => $resultmoduleid,
					"module" => $resultmodulenameshort,
					"modulename" => $resultmodulname,
					"nameroom" => $resultmodulenameroom,
					"positionx" => $resultmodulenamepositionx,
					"positiony" => $resultmodulenamepositiony,
					"action" => "Error 10"); 
				array_push($itemRecords["items"], $itemDetails);
				$result->object=json_encode($itemRecords);
				}
				else
				{
				$array = json_decode($response, true);
				$value=$array['properties']['value'];
				$result = \DAOProcess::logapirest('',$module,$value,'ok',$action);
				if ($value <> "0" and  $action=="turnOff")//APAGA BOMBILLA
					{	
					$strurl="http://". $url ."/api/callAction?deviceID=" .$resultmoduleid ."&name=".$action;
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL,$strurl );
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
					$response = curl_exec($ch);
					$array = json_decode($response, true);
					$result = \DAOProcess::logsaveonoff($module,$action,$resultmoduleid);
					}	
				elseif ($value == "0" and  $action=="turnOff")// YA ESTA APAGADO LA BOMBILLA
					{  
					$itemRecords=array();
					$itemRecords["items"]=array(); 
					$itemDetails=array(
						"moduleid" => $resultmoduleid,
						"module" => $resultmodulenameshort,
						"modulename" => $resultmodulname,
						"nameroom" => "",
						"positionx" => $resultmodulenamepositionx,
						"positiony" => $resultmodulenamepositiony,						
						"action" => $action);
					array_push($itemRecords["items"], $itemDetails);
					$result->object=json_encode($itemRecords);
					}
				elseif ($value == "0" and  $action=="turnOn")//ENCIENDE LA BOMBILLA
					{	
					$strurl="http://". $url ."/api/callAction?deviceID=" .$resultmoduleid ."&name=".$action;
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL,$strurl );
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
					$response = curl_exec($ch);	
					$array = json_decode($response, true);
					$result = \DAOProcess::logsaveonoff($module,$action,$resultmoduleid);
					}	
				elseif ($value == "99" and  $action=="turnOn")// YA ESTA ENCENDIDa LA BOMBILA
					{  
					$itemRecords=array();
					$itemRecords["items"]=array(); 
					$itemDetails=array(
						"moduleid" => $resultmoduleid,
						"module" => $resultmodulenameshort,
						"modulename" => $resultmodulname,
						"nameroom" => $resultmodulenameroom,
						"positionx" => $resultmodulenamepositionx,
						"positiony" => $resultmodulenamepositiony,						
						"action" => $action); 
					array_push($itemRecords["items"], $itemDetails);
					$result->object=json_encode($itemRecords);
					}
				}
				curl_close($ch);
			   $resultx = \DAOProcess::savestatusonoff($resultmodulname,$action);	
				break;
	}
	
	return $result ;
	}
}


?>
