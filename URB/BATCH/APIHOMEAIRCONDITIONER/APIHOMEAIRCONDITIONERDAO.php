<?php
require_once $globalPath . '/MODEL/PL/Connection.php';

class DAOProcess {
//********************************************** */
//*Debuelbe el listado de sensores de temp
//*********************************************** */
public static function searchsensorairconditioner($action,$idroom) {
    $result = new \Business\Result();
    $connection = \Persistence\Connection::getInstance();
    try {
        $query = "SELECT  devicesfibaro.airconditioner,devicesfibaroaux.min,devicesfibaroaux.max,devicesfibaro.airconditioner,devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort join devicesfibaroaux on devicesfibaroaux.nameshort = devicesfibaro.nameshort   WHERE ( devicesfibaro.typeofaction = ?  and devicesfibaroposition.idroom = ? and devicesfibaroaux.selectairconditioner = ? )   ";
        $stmt = $connection->db->prepare($query);
        if ($stmt) 
                {
                $position = 1;
                $stmt->bindValue($position++,$action );
                $stmt->bindValue($position++,$idroom );
                $stmt->bindValue($position++,"S" );
                $stmt->execute();
                $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                }
                $result->moduleid=$rows;  
        } 
          catch (\PDOException $e) {
                $result->errorCode = -2;
                $result->errorDescription = $e->getMessage();
        } catch (\Exception $e) {
                $result->errorCode = -1;
                $result->errorDescription = $e->getMessage();
        }   
return $result;
}
//********************************************** */
//* Convierte un nameshort en un id
//*********************************************** */
public static function searchnameid($nameshort) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
            $query = "SELECT  devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort  FROM devicesfibaro     WHERE  devicesfibaro.nameshort = ?  ";  
            $stmt = $connection->db->prepare($query);
            if ($stmt) 
                    {
                    $position = 1;
                    $stmt->bindValue($position++,$nameshort );
                    $stmt->execute();
                    $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    }
                    $result->moduleid=$rows;  
            
                } catch (\PDOException $e) {
                    $result->errorCode = -2;
                    $result->errorDescription = $e->getMessage();
            } catch (\Exception $e) {
                    $result->errorCode = -1;
                    $result->errorDescription = $e->getMessage();
            }   
    return $result;
    }
//********************************************** */
//*
//*********************************************** */
public static function saveturnonoff($nameshort,$action) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $update = "UPDATE devicesfibaro SET 
                statuonoff         = ?
                WHERE nameshort = ? ";
                $stmt = $connection->db->prepare($update);
                date_default_timezone_set("UTC");
                if ($stmt) {
                              $position = 1;
                              $stmt->bindValue($position++,$action);
                              $stmt->bindValue($position++,$nameshort);
                              $stmt->execute();}
            } 
              catch (\PDOException $e) {
                    $result->errorCode = -2;
                    $result->errorDescription = $e->getMessage();
            } catch (\Exception $e) {
                    $result->errorCode = -1;
                    $result->errorDescription = $e->getMessage();
            }   
    return $result;
    }
//********************************************** */
//* Actiba o desactiva  turnonoff
//* $url fibaro
//* $username usuario de fibaro
//* $password pass de fivaro
//* $nameshort nombre del device
//* $action turnon /turnoff
//*********************************************** */
public static function turnonoff($url, $username, $password,$nameshort,$action) 
{
	$result = \DAOProcess::searchnameid($nameshort);
	$resultmoduleid=$result->moduleid[0]['id'];
	$strurl="http://" . $url ."/api/devices?id=".$resultmoduleid;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$strurl );
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
	$response = curl_exec($ch);	
	if($response === false)
	{
	}				
	else
	{
	$array = json_decode($response, true);
	$value=$array['properties']['value'];
	if (  $value=="true" and $action=="turnOff")//APAGA BOMBILLA
		{	
                $result = \DAOProcess::saveturnonoff($nameshort,"turnOff");
                $strurl="http://". $url ."/api/callAction?deviceID=" .$resultmoduleid ."&name=".$action;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$strurl );
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
		$response = curl_exec($ch);
		}	
	elseif ( $value=="false" and$action=="turnOn")//ENCIENDE LA BOMBILLA
		{	
                $result = \DAOProcess::saveturnonoff($nameshort,"turnOn");
                $strurl="http://". $url ."/api/callAction?deviceID=" .$resultmoduleid ."&name=".$action;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$strurl );
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
		$response = curl_exec($ch);	
		}	
	
	}
	curl_close($ch);
}

/************************************************* */
//* DEVUELBE UN ARRAY DE ELEMENOS SENSOR POR HABITACION
//*********************************************** */
public static function savesensorairconditioner($url, $username, $password,$row,$value,$action) {
         $result = new \Business\Result();
         $connection = \Persistence\Connection::getInstance();
         try {
                 $data = date('Y-m-d H:i:s');
                 $query = "SELECT idx,value,typestatu,max,min FROM  atmosphereh  WHERE nameshort = ? ORDER BY idx DESC  ";
                 $stmt = $connection->db->prepare($query);
                 if ($stmt) 
                         {
                         $position = 1;
                         $stmt->bindValue($position++,$row['nameshort'] );
                         $stmt->execute();
                         $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                         }
                         $result->moduleid=$rows;  
                         $temprows=$rows[0];
                         $valuered=( double )$temprows['value'];
                         $temprowmax=(int) $row['max'];
                         $temprowmin=(int) $row['min'];
                         $temprowatypeirconditioner=$row['airconditioner'];
                         $temprowsmax=(int)$temprows['max'];
                         $temprowsmin=(int)$temprows['min'];
                         $temprowstypeairconditioner=$temprows['typestatu'];
                         if ( $temprowmax == 0  and  0 ==  $temprowmin  )
                         {
                                 $resultmoduleairconditionerstatu="grey";
                                 $deviceshort=substr($row['nameshort'],0,2)."z";
                                 $resultx = \DAOProcess::turnonoff($url, $username, $password,$deviceshort,"turnOff");
                         }
                         else if ( ($temprowmax >=$value)  and  ($value >=  $temprowmin)  )
                         {
                                  $resultmoduleairconditionerstatu="green";
                                  $deviceshort=substr($row['nameshort'],0,2)."z";
                                  $resultx = \DAOProcess::turnonoff($url, $username, $password,$deviceshort,"turnOff");
           
                         }
                         else 
                         {
                                 $resultmoduleairconditionerstatu="red";
                                 $deviceshort=substr($row['nameshort'],0,2)."z";
                                 $resultx = \DAOProcess::turnonoff($url, $username, $password,$deviceshort,"turnOn");
          
                         }
                 
                 if ($valuered == $value  and $temprowsmax == $temprowmax and  $temprowmin== $temprowmin and $temprowatypeirconditioner ==  $temprowstypeairconditioner)
                 {
                 }
                 else 
                 {
                 $insertsensortemp  = "INSERT INTO                   \n";
                 $insertsensortemp .= "   atmosphereh                \n";
                 $insertsensortemp .= "(                             \n";
                 $insertsensortemp .= "   action,                    \n";
                 $insertsensortemp .= "   nameshort,                 \n";
                 $insertsensortemp .= "   datetimer,                 \n";
                 $insertsensortemp .= "   value,                     \n";
                 $insertsensortemp .= "   typestatu,                 \n";
                 $insertsensortemp .= "   max,                       \n";
                 $insertsensortemp .= "   min,                       \n";
                 $insertsensortemp .= "   statu                      \n";
                 $insertsensortemp .= " ) VALUES (                   \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?,                         \n";
                 $insertsensortemp .= "   ?                          \n";
                 $insertsensortemp .= ")                             \n";
                 $stmtsensortemp = $connection->db->prepare($insertsensortemp);
                 if ($stmtsensortemp) {
                      $position=1;
                      $stmtsensortemp->bindValue($position++,$action);
                      $stmtsensortemp->bindValue($position++,$row['nameshort']);
                      $stmtsensortemp->bindValue($position++,$data);
                      $stmtsensortemp->bindValue($position++,$value);
                      $stmtsensortemp->bindValue($position++,$row['airconditioner']);
                      $stmtsensortemp->bindValue($position++,(int)$row['max']);
                      $stmtsensortemp->bindValue($position++,(int)$row['min']);
                      $stmtsensortemp->bindValue($position++,$resultmoduleairconditionerstatu);
                      $stmtsensortemp->execute();
                     }
                     }
         } catch (\PDOException $e) {
                       $result->errorCode = -2;
                       $result->errorDescription = $e->getMessage();
               } catch (\Exception $e) {
                       $result->errorCode = -1;
                       $result->errorDescription = $e->getMessage();
               }   
         return $result;
         }

}








?>
