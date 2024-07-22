<?php
class Database{
	
	private $host  = '185.136.91.173';
    private $user  = 'Admin_PuntoDeRed';
    private $password   = "23121970pegaso1970";
    private $database  = "PuntoDeRed"; 
    
    public function getConnection(){		
		$conn = new mysqli($this->host, $this->user, $this->password, $this->database);
		if($conn->connect_error){
			die("Error failed to connect to MySQL: " . $conn->connect_error);
		} else {
			return $conn;
		}
    }
}
?>