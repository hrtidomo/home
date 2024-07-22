<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../class/Items.php';

$database = new Database();
$db = $database->getConnection();
 
$items = new Items($db);

$items->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

$result = $items->read();

if($result->num_rows > 0){    
    $itemRecords=array();
    $itemRecords["items"]=array(); 
	while ($item = $result->fetch_assoc()) { 	
        extract($item); 
        $itemDetails=array(
            "id" => $id,
            "Codigo" => $Codigo,
			"Tipo" => $Tipo,
			"Codigox" => $Codigox,
            "Tipox" => $Tipox,
			"Nombre" =>  base64_decode($Nombre),
            "Pais" => base64_decode($Pais),
			"CodigoPostal" => $CodigoPostal,
			"Region" => base64_decode($Region),
			"Provincia" => base64_decode($Provincia),
			"Poblacion" => base64_decode($Poblacion),
			"TipoVia" =>  base64_decode($TipoVia),
			"NombreVia" =>  base64_decode($NombreVia),
			"NumeroVia" => $NumeroVia,
			"Resto" =>  base64_decode($Resto),
			"Google" => base64_decode($Google),
			"Latitud" => $Latitud,
			"Longitud" => $Longitud,
			"Zona" => base64_decode($Zona),
			"GrupoZona" => base64_decode($GrupoZona)			
          	
        ); 
       array_push($itemRecords["items"], $itemDetails);
    }    
    http_response_code(200);     
    echo json_encode($itemRecords);
}else{     
    http_response_code(404);     
    echo json_encode(
        array("message" => "No item found.")
    );
} 