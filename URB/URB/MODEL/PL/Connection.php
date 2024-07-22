<?php

namespace Persistence;

/**
 * Connect the persistence layer with an actual database.
 *
 * Singleton to provide connection to data base. All instances of entities share the same connection.
 */
class Connection {

	public $db; /**< ::PDO Object to hold the connection */

	private static $instance; /**< Persistence::Warehouse instance Singleton instance */

	/**
	 * Constructor.
	 *
	 */
	private function __construct() {

		//$connectionString = "pgsql:host=192.168.200.242;port=5432;dbname=dbfibaro";
		$connectionString = "pgsql:host=127.0.0.1;port=5432;dbname=dbfibaro";
		
		$this->db = new \PDO($connectionString, "fibaro", "23121970pegaso1970");
		
		
		//$connectionString = "pgsql:host=127.0.0.1;port=5432;dbname=urb";
		//$connectionString = "pgsql:host=212.231.185.45;port=5432;dbname=urb";
		//$this->db = new \PDO($connectionString, "urb", "password");
		
		$this->db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

	}

	/**
	 * Singleton instance.
	 *
	 */
	public static function getInstance() {
		if (!isset(self::$instance)) {
			self::$instance = new Connection();
		}
		return self::$instance;
	}
}

?>
