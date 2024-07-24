<?php
require_once $globalPath . '/MODEL/PL/Connection.php';

class DAOProcess {


/**
 * 
 */

/********************************************** */
//* DEVUELBE UN ARRAY DE CAM
//* case "state": 
//* case "flat":
//* case "camon":        
//*********************************************** */
public static function searchcam($idroom) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $query = "SELECT  devicescam.presetx,devicecamaux.preset,devicecamaux.user,devicecamaux.pass,devicecamaux.httpport,devicecamaux.url,devicescamposition.positionx,devicescamposition.positiony,devicescam.nameshort,devicescam.activate  FROM devicescam  join  devicescamposition  on   devicescam.nameshort = devicescamposition.nameshort join devicecamaux on devicescam.room =devicecamaux.room where  devicescamposition.idroom= ? ";
                $stmt = $connection->db->prepare($query);
                if ($stmt) 
                        {
                        $position = 1;
                        $stmt->bindValue($position++,$idroom );
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

/*********************************************** */
//* DEVUELBE LOS PARAMETROS DE UN CAM
//* case "camon":
//*********************************************** */
public static function searchcamid($nameshort,$action) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
            $update = "UPDATE devicescam SET activate = ?  ";
            $stmt = $connection->db->prepare($update);
            if ($stmt) {
                     $position = 1;
                     $stmt->bindValue($position++, 'false');
                     $stmt->execute();
                     $result->updated = true;}
           $update = "UPDATE devicescam SET activate = ? WHERE nameshort = ? ";
           $stmt = $connection->db->prepare($update);
           if ($stmt) {
                $position = 1;
                $stmt->bindValue($position++, 'true');
                $stmt->bindValue($position++, $nameshort);
                $stmt->execute();
                $result->updated = true;}
            $query = "SELECT devicescam.presetx,devicecamaux.preset,devicecamaux.user,devicecamaux.pass,devicecamaux.httpport,devicecamaux.url,devicescamposition.positionx,devicescamposition.positiony,devicescam.nameshort,devicescam.activate  FROM devicescam  join  devicescamposition  on   devicescam.nameshort = devicescamposition.nameshort join devicecamaux on devicescam.room =devicecamaux.room       ";
            $stmt = $connection->db->prepare($query);
            if ($stmt) 
                    {
                    $position = 1;
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

//************************************************* */
//* DEVUELBE UN ARRAY DE ELEMENOS SENSOR POR HABITACION
//* case "flat":
//* case "state":
//* case "temp":        
 //*********************************************** */
 public static function searchsensorroom($idroom) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                    $query = "SELECT  devicesfibaro.airconditioner,devicesfibaroaux.min,devicesfibaroaux.max,devicesfibaro.airconditioner,devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort join devicesfibaroaux on devicesfibaroaux.nameshort = devicesfibaro.nameshort    WHERE ( devicesfibaro.typeofaction = ?  and devicesfibaroposition.idroom = ? and devicesfibaroaux.selectairconditioner = ?)  ";
                    $stmt = $connection->db->prepare($query);
                    if ($stmt) 
                            {
                            $position = 1;
                            $stmt->bindValue($position++,"temp" );
                            $stmt->bindValue($position++,$idroom);
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

/********************************************** ****/
//* DEVUELBE UN ARRAY DE ELEMENOS ONOFF
//* case "flat":
//* case "state":
//*************************************************/
public static function turnconf($module) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                    $query = "SELECT html   FROM devicesfibaro   WHERE nameshort = ?   ";
                    $stmt = $connection->db->prepare($query);
                    if ($stmt) 
                            {
                            $position = 1;
                           
                            $stmt->bindValue($position++,$module);
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

/********************************************** ****/
//* DEVUELBE UN ARRAY DE ELEMENOS ONOFF
//* case "flat":
//* case "state":
//*************************************************/
public static function searchonoff($idroom) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                    $query = "SELECT  devicesfibaro.statuonoff,devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort  WHERE ( devicesfibaro.typeofaction = ?  and devicesfibaroposition.idroom = ? )  ";
                    $stmt = $connection->db->prepare($query);
                    if ($stmt) 
                            {
                            $position = 1;
                            $stmt->bindValue($position++,"onoff" );
                            $stmt->bindValue($position++,$idroom);
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
/********************************************** */
//* DEVUELBE UN ARRAY DE FLAT
//* case "state": 
//* case "flat":
//*********************************************** */
public static function searchflaticon($nameshort) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $update = "UPDATE devicesflat SET activate = ?  ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                         $position = 1;
                         $stmt->bindValue($position++, 'false');
                         $stmt->execute();
                         $result->updated = true;}
                $update = "UPDATE devicesflat SET activate = ? WHERE nameshort = ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                              $position = 1;
                              $stmt->bindValue($position++, 'true');
                              $stmt->bindValue($position++, $nameshort);
                              $stmt->execute();
                              $result->updated = true;}         
          
          
                $query = "SELECT  devicesflat.nameshort,devicesflat.activate,devicesflatposition.positionx,devicesflatposition.positiony,devicesflatposition.idroomout,devicesflat.file   FROM devicesflat  join  devicesflatposition  on   devicesflat.nameshort = devicesflatposition.nameshort where  devicesflatposition.idroomin = ?  "  ;
                $stmt = $connection->db->prepare($query);
                if ($stmt) 
                    {
                    $position = 1;
                    $stmt->bindValue($position++, $nameshort);
                  
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
 /************************************************* */
//* DEVUELBE UN ARRAY DE ELEMENOS SENSOR POR MODULO
//* case "tempbed":
//* case "tempsun":
//* case "tempstop":
//*********************************************** */
 public static function searchsensormodule($module,$estadotempid) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $update = "UPDATE devicesfibaro  SET airconditioner = ?  WHERE  nameshort= ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                         $position = 1;
                         $stmt->bindValue($position++, $estadotempid);
                         $stmt->bindValue($position++, $module);
                         $stmt->execute();
                         $result->updated = true;}
                
                $update = "UPDATE devicesfibaroaux  SET selectairconditioner = ?  WHERE   nameshort= ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                        $position = 1;
                        $stmt->bindValue($position++, "");
                        $stmt->bindValue($position++, $module);
                        $stmt->execute();
                        $result->updated = true;}
                
                $update = "UPDATE devicesfibaroaux  SET selectairconditioner = ?  WHERE typeairconditioner = ? and  nameshort= ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                           $position = 1;
                           $stmt->bindValue($position++, "S");
                           $stmt->bindValue($position++, $estadotempid);
                           $stmt->bindValue($position++, $module);
                           $stmt->execute();
                           $result->updated = true;}
                    
                $query = "SELECT  devicesfibaroaux.min,devicesfibaroaux.max,devicesfibaro.airconditioner,devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort   join devicesfibaroaux on devicesfibaroaux.nameshort = devicesfibaro.nameshort   WHERE ( devicesfibaro.typeofaction = ?  and devicesfibaro.nameshort = ? and devicesfibaroaux.typeairconditioner= ?)  ";
                $stmt = $connection->db->prepare($query);
                if ($stmt) 
                        {
                        $position = 1;
                        $stmt->bindValue($position++,"temp" );
                        $stmt->bindValue($position++,$module);
                        $stmt->bindValue($position++,$estadotempid);
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
//* Convierte un nombre  en un id device
//* case "turnOn"
//*********************************************** */
public static function searchnameid($nameshort) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
            $query = "SELECT  devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort  WHERE  devicesfibaro.nameshort = ?  ";  
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

/********************************************** */
//* DEVUELBE UN ARRAY DE FLAT
//* case "state": 
//* case "flat":
//*********************************************** */
public static function searchaircon($idroom) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                    $query = "SELECT  devicesfibaro.statuonoff,devicesfibaro.id,devicesfibaro.name,devicesfibaro.nameshort,devicesfibaroposition.positionx,devicesfibaroposition.positiony  FROM devicesfibaro   join devicesfibaroposition on devicesfibaroposition.nameshort = devicesfibaro.nameshort  WHERE ( devicesfibaro.typeofaction = ?  and devicesfibaroposition.idroom = ? )  ";
                    $stmt = $connection->db->prepare($query);
                    if ($stmt) 
                            {
                            $position = 1;
                            $stmt->bindValue($position++,"onoffz" );
                            $stmt->bindValue($position++,$idroom);
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
/********************************************************* */
/********************************************************* */
/********************************************** */
//* Grava las operaciones de apirest fibaro
//* case "turnOn"
//* case "temp":
//* case "state":
//* case "flat":
//*********************************************** */
public static function logapirest($userweb,$module,$value,$status,$action) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        $data = date('Y-m-d H:i:s');
        try {
                $insertlogapirest  = "INSERT INTO                   \n";
                $insertlogapirest .= "   logapirest                 \n";
                $insertlogapirest .= "(                             \n";
                $insertlogapirest .= "   datetimer,                 \n";
                $insertlogapirest .= "   userweb,                   \n";
                $insertlogapirest .= "   module,                    \n";
                $insertlogapirest .= "   value,                     \n";
                $insertlogapirest .= "   status,                    \n";
                $insertlogapirest .= "   action                     \n";
                $insertlogapirest .= " ) VALUES (                   \n";
                $insertlogapirest .= "   ?,                         \n";
                $insertlogapirest .= "   ?,                         \n";
                $insertlogapirest .= "   ?,                         \n";
                $insertlogapirest .= "   ?,                         \n";
                $insertlogapirest .= "   ?,                         \n";
                $insertlogapirest .= "   ?                          \n";
                $insertlogapirest .= ")                             \n";
                $stmtlogapirest = $connection->db->prepare($insertlogapirest);
                if ($stmtlogapirest) {
                     $position=1;
                     $stmtlogapirest->bindValue($position++,$data);
                     $stmtlogapirest->bindValue($position++,$userweb);
                     $stmtlogapirest->bindValue($position++,$module);
                     $stmtlogapirest->bindValue($position++,$value);
                     $stmtlogapirest->bindValue($position++,$status);
                     $stmtlogapirest->bindValue($position++,$action);
                     $stmtlogapirest->execute();
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

//********************************************** */
//* Guarfa los turn On Off
//* case "turnOn"
//*********************************************** */
public static function logsaveonoff($module,$action,$moduleid)
{
    $result = new \Business\Result();
    $connection = \Persistence\Connection::getInstance();
    $data = date('Y-m-d H:i:s');
    try {
        if ($action=="turnOn")
            {
            $insertlogsaveonoff  = "INSERT INTO                   \n";
            $insertlogsaveonoff .= "   deviceactiononoff          \n";
            $insertlogsaveonoff .= "(                             \n";
            $insertlogsaveonoff .= "   id,                        \n";
            $insertlogsaveonoff .= "   nameshort,                 \n";
            $insertlogsaveonoff .= "   dataini,                   \n";
            $insertlogsaveonoff .= "   value                      \n";
            $insertlogsaveonoff .= " ) VALUES (                   \n";
            $insertlogsaveonoff .= "   ?,                         \n";
            $insertlogsaveonoff .= "   ?,                         \n";
            $insertlogsaveonoff .= "   ?,                         \n";
            $insertlogsaveonoff .= "   ?                          \n";
            $insertlogsaveonoff .= ")                             \n";
            $stmtlogsaveonoff = $connection->db->prepare($insertlogsaveonoff);
            if ($stmtlogsaveonoff) {
                 $position=1;
                 $stmtlogsaveonoff->bindValue($position++,$moduleid);
                 $stmtlogsaveonoff->bindValue($position++,$module);
                 $stmtlogsaveonoff->bindValue($position++,$data);
                 $stmtlogsaveonoff->bindValue($position++,$action);
                 $stmtlogsaveonoff->execute();
                }
            } 
        else
            {
                $query = "SELECT idx  FROM deviceactiononoff WHERE nameshort = ? ORDER BY idx DESC LIMIT 1  ";
                $stmt = $connection->db->prepare($query);
                if ($stmt) 
                        {
                        $position = 1;
                        $stmt->bindValue($position++,$module );
                        $stmt->execute();
                        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                        }
                foreach ($rows as $value) {
                        $oscar=$value["idx"];}  
                        
                $update = "UPDATE deviceactiononoff SET datafin = ? ,value = ?  WHERE idx = ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                        $position = 1;
                        $stmt->bindValue($position++, $data);
                        $stmt->bindValue($position++, $action);
                        $stmt->bindValue($position++, $oscar);
                        $stmt->execute();}
            }
            $itemRecords=array();
            $itemRecords["items"]=array(); 
            $itemDetails=array(
                "moduleid" => $moduleid,
                "module" => $module,
                "action" => $action
            ); 
            array_push($itemRecords["items"], $itemDetails);
            $result->object=json_encode($itemRecords);
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
//* case "turnOn"
//*********************************************** */
public static function savestatusonoff($resultmodulname,$action) {
        $result = new \Business\Result();
        $connection = \Persistence\Connection::getInstance();
        try {
                $update = "UPDATE devicesfibaro  SET   statuonoff = ?  WHERE  name= ? ";
                $stmt = $connection->db->prepare($update);
                if ($stmt) {
                         $position = 1;
                         $stmt->bindValue($position++, $action);
                         $stmt->bindValue($position++, $resultmodulname);
                         $stmt->execute();
                         $result->updated = true;}

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





/**************************************************** */
/***************************************************** */


}




?>
