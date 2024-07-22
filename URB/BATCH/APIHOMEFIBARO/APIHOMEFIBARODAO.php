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


}








?>
