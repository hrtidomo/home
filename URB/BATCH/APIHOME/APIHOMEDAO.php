<?php
require_once $globalPath . '/MODEL/PL/Connection.php';

class DAOProcess {

//********************************************** */
//* DEVUELBE LOS DEVICES 
//* NO OPCION SCAN
//* SI OPCION SCANNEW
//*********************************************** */
public static function listadodevices($opcion) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                if ($opcion=="NO")
                {
                         $query = "SELECT nameshort,id FROM  devicesfibaro WHERE name!='' and scan='SI' ";
                }
                elseif ($opcion=="SI")
                {
                        $query = "SELECT nameshort,id FROM  devicesfibaro where name='x'   ";
                        
                }

                $stmt = $connection->db->prepare($query);
                if ($stmt) 
                        {
                        $position = 1;
                        $stmt->execute();
                        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                        }
                        $result->object= $rows;
           
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
//* ACTUALIZA LOS ESTADOS
//************************************************ */
// $campo  datos de json en un array
// $response json del device 
// $nameshort nombre device
// $option   NO OPCION SCAN / SI OPCION SCANNEW
//*********************************************** */

public static function devices($campo,$response,$nameshort,$option) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $update = "UPDATE devicesfibaro SET 
              
                cerrojo         = ?,
                id              = ?,
                name            = ?,
                roomid          = ?,  
                type            = ?,
                basetype        = ?,                                 
                enabled         = ?,
                visible         = ?,
                isplugin        = ?,
                parentid        = ?,
                remotegatewayid = ?,
                viewxml         = ?,        
                configxml       = ?,
                created         = ?,
                modified        = ?,
                sortorder       = ?,
                json            = ?
                WHERE nameshort = ? ";
                $stmt = $connection->db->prepare($update);
                date_default_timezone_set("UTC");
                if ($stmt) {
                              $position = 1;
                              $stmt->bindValue($position++, "1");
                              $stmt->bindValue($position++, $campo['id']);
                              $stmt->bindValue($position++, $campo['name']);
                              $stmt->bindValue($position++, $campo['roomID']);
                              $stmt->bindValue($position++, $campo['type']);
                              $stmt->bindValue($position++, $campo['baseType']);
                              $stmt->bindValue($position++, $campo['enabled']);
                              $stmt->bindValue($position++, $campo['visible']);
                              $stmt->bindValue($position++, $campo['isPlugin']);
                              $stmt->bindValue($position++, $campo['parentId']);
                              $stmt->bindValue($position++, $campo['remoteGatewayId']);
                              $stmt->bindValue($position++, $campo['viewXml']);
                              $stmt->bindValue($position++, $campo['configXml']);
                              $stmt->bindValue($position++, $campo['created']);
                              $stmt->bindValue($position++, $campo['modified']);
                              $stmt->bindValue($position++, $campo['sortOrder']);
                              $stmt->bindValue($position++, $response);
                              $stmt->bindValue($position++, $nameshort);
                              $stmt->execute();}
                //**************************************************************** */
                //Grava los campos restante 
                //*************************************************************** */
                $action=substr($nameshort,2,1);
                switch ($action) {
                        case 'a'://temp
                                if ($option=="NO")
                                        {            
                                        $dead=$campo['properties']['dead'];
                                        $update = "UPDATE devicesfibaro SET 
                                        fechastatus            = ?, 
                                        propertiesdead         = ?,
                                        typeofaction           = ?,         
                                        scan                   = ? 
                                        WHERE nameshort        = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++, $dead);
                                                $stmt->bindValue($position++, "temp");
                                                $stmt->bindValue($position++, "SI");
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                                elseif ($option=="SI")
                                        {            
                                        $dead=$campo['properties']['dead'];
                                        $update = "UPDATE devicesfibaro SET 
                                        fechacreacion          = ?,
                                        propertiesdead         = ?,
                                        typeofaction           = ?,         
                                        scan                   = ? 
                                        WHERE nameshort        = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++, $dead);
                                                $stmt->bindValue($position++, "temp");
                                                $stmt->bindValue($position++, "SI");
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                        break;
                        case 'b':// light
                                if ($option=="NO")
                                        { 
                                        $dead=$campo['properties']['dead'];
                                        $update = "UPDATE devicesfibaro SET 
                                        fechastatus            = ?,
                                        propertiesdead         = ?,
                                        typeofaction           = ?,
                                        scan                   = ? 
                                        WHERE nameshort     = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++, $dead);
                                                $stmt->bindValue($position++, "light");
                                                $stmt->bindValue($position++, "SI");
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                                elseif ($option=="SI")
                                        { 
                                        $dead=$campo['properties']['dead'];
                                        $update = "UPDATE devicesfibaro SET 
                                        fechacreacion          = ?,
                                        propertiesdead         = ?,
                                        typeofaction           = ?,
                                        scan                   = ? 
                                        WHERE nameshort     = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++, $dead);
                                                $stmt->bindValue($position++, "light");
                                                $stmt->bindValue($position++, "SI");
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                        break;  
                        case 'd'://turnon
                                if ($option=="NO")
                                        { 
                                        $dead=$campo['properties']['dead'];
                                        $value=$campo['properties']['value'];
                                        if ($campo['properties']['value']==0)
                                                { $value="turnoff" ;}
                                        else
                                                { $value="turnon" ;}
                                        $update = "UPDATE devicesfibaro SET 
                                        fechastatus            = ?,
                                        propertiesdead         = ?,
                                        typeofaction           = ?,
                                        statuonoff             = ?            
                                        WHERE nameshort      = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++,$dead);
                                                $stmt->bindValue($position++, "onoff");
                                                $stmt->bindValue($position++, $value);
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                                elseif ($option=="SI")
                                        { 
                                        $dead=$campo['properties']['dead'];
                                        $value=$campo['properties']['value'];
                                        if ($campo['properties']['value']==0)
                                                { $value="turnoff" ;}
                                        else
                                                { $value="turnon" ;}
                                        $update = "UPDATE devicesfibaro SET 
                                        fechacreacion          = ?,
                                        propertiesdead         = ?,
                                        typeofaction           = ?,
                                        statuonoff             = ?            
                                        WHERE nameshort      = ? ";
                                        $stmt = $connection->db->prepare($update);
                                        if ($stmt) {
                                                $position = 1;
                                                $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                                $stmt->bindValue($position++,$dead);
                                                $stmt->bindValue($position++, "onoff");
                                                $stmt->bindValue($position++, $value);
                                                $stmt->bindValue($position++, $nameshort);
                                                $stmt->execute();}
                                        }
                        break;
                        case 'z':
                                if ($option=="NO")
                                {  
                                $dead=$campo['properties']['dead'];
                                $value=$campo['properties']['value'];
                                if ($campo['properties']['value']=='true')
                                { $value="turnon" ;}
                                else
                                { $value="turnoff" ;}
                                $update = "UPDATE devicesfibaro SET 
                                fechastatus            = ?,
                                propertiesdead         = ?,
                                typeofaction           = ?,
                                statuonoff             = ?,            
                                scan                   = ? 
                                WHERE nameshort        = ? ";
                                $stmt = $connection->db->prepare($update);
                                if ($stmt) {
                                        $position = 1;
                                        $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                        $stmt->bindValue($position++,$dead);
                                        $stmt->bindValue($position++, "onoff");
                                        $stmt->bindValue($position++, $value);
                                        $stmt->bindValue($position++, "SI");
                                        $stmt->bindValue($position++, $nameshort);
                                        $stmt->execute();}
                                }
                        else if ($option=="SI")
                                {  
                                $dead=$campo['properties']['dead'];
                                $value=$campo['properties']['value'];
                                if ($campo['properties']['value']=='true')
                                        { $value="turnon" ;}
                                else
                                        { $value="turnoff" ;}
                                $update = "UPDATE devicesfibaro SET 
                                fechacreacion          = ?,
                                propertiesdead         = ?,
                                typeofaction           = ?,
                                statuonoff             = ?,            
                                scan                   = ? 
                                WHERE nameshort        = ? ";
                                $stmt = $connection->db->prepare($update);
                                if ($stmt) {
                                        $position = 1;
                                        $stmt->bindValue($position++, date("Y-m-d H:i:s", time()));
                                        $stmt->bindValue($position++,$dead);
                                        $stmt->bindValue($position++, "onoff");
                                        $stmt->bindValue($position++, $value);
                                        $stmt->bindValue($position++, "SI");
                                        $stmt->bindValue($position++, $nameshort);
                                        $stmt->execute();}
                                        $insertdevicesfibaroposition  = "INSERT INTO                   \n";
                                        $insertdevicesfibaroposition .= "   devicesfibaroposition      \n";
                                        $insertdevicesfibaroposition .= "(                             \n";
                                        $insertdevicesfibaroposition .= "   idroom,                    \n";
                                        $insertdevicesfibaroposition .= "   positionx,                 \n";
                                        $insertdevicesfibaroposition .= "   positiony,                 \n";
                                        $insertdevicesfibaroposition .= "   nameshort                  \n";
                                        $insertdevicesfibaroposition .= " ) VALUES (                   \n";
                                        $insertdevicesfibaroposition .= "   ?,                         \n";
                                        $insertdevicesfibaroposition .= "   ?,                         \n";
                                        $insertdevicesfibaroposition .= "   ?,                         \n";
                                        $insertdevicesfibaroposition .= "   ?                         \n";
                                       
                                        $insertdevicesfibaroposition .= ")                             \n";
                                        $stmtdevicesfibaroposition = $connection->db->prepare($insertdevicesfibaroposition);
                                        if ($stmtdevicesfibaroposition) {
                                             $position=1;
                                             $stmtdevicesfibaroposition->bindValue($position++,"xxf");
                                             $stmtdevicesfibaroposition->bindValue($position++,"50%");
                                             $stmtdevicesfibaroposition->bindValue($position++,"50%");
                                             $stmtdevicesfibaroposition->bindValue($position++,$nameshort);
                                             $stmtdevicesfibaroposition->execute();
                                            }
                                
                                
                                
                                }
                        break;                
                
                }
                
                
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
        
       // $resultx = \DAOProcess::turnonoff($url, $username, $password,"aaz","turnOn");
       // $resultx = \DAOProcess::turnonoff($url, $username, $password,"aaz","turnOff");
       // $resultx = \DAOProcess::turnonoff($url, $username, $password,"abz","turnOn");
       // $resultx = \DAOProcess::turnonoff($url, $username, $password,"abz","turnOff");
        

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
