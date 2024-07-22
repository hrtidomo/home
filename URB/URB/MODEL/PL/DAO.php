<?php
/**
 * DAO
 */

namespace Persistence;

use Business\Logger;

require_once dirname(__FILE__) . '/Connection.php';
require_once dirname(__FILE__) . '/../BL/Result.php';
require_once dirname(__FILE__) . '/../BL/Logger.php';

class DAO {

	public static function logTransaction($pdoObject, $transactionData) {
		$result = new \Business\Result();

		$insert  = "";
		$insert .= "INSERT INTO   \n";
		$insert .= "   auditoria  \n";
		$insert .= "(             \n";
		$insert .= "   momento,   \n";
		$insert .= "   idmodulo,  \n";
		$insert .= "   usuario,   \n";
		$insert .= "   tabla,     \n";
		$insert .= "   accion,    \n";
		$insert .= "   idpk       \n";
		$insert .= ") VALUES (    \n";
		$insert .= "   NOW(),     \n";
		$insert .= "   ?,         \n";
		$insert .= "   ?,         \n";
		$insert .= "   ?,         \n";
		$insert .= "   ?,         \n";
		$insert .= "   ?          \n";
		$insert .= ")             \n";

		try {
			$stmt = $pdoObject->prepare($insert);
			if ($stmt) {
				$position = 1;
				$stmt->bindValue($position++, $transactionData["module"]);
				$stmt->bindValue($position++, $transactionData["user"]);
				$stmt->bindValue($position++, $transactionData["tablename"]);
				$stmt->bindValue($position++, $transactionData["action"]);
				$stmt->bindValue($position++, $transactionData["idpk"]);

				$stmt->execute();
				$stmt = null;

			} else {
				$result->errorCode = -3;
				$result->errorDescription = "ERROR: SQL Prepare";

				// Logger::log("::ERROR (-3) [" . $result->errorDescription . "]", Logger::ERROR);
			}
		} catch (\PDOException $e) {
			$result->errorCode = -2;
			$result->errorDescription = $e->getMessage();

			// Logger::log("logTransaction::ERROR [" . $result->errorDescription . "]", Logger::ERROR);
		} catch (\Exception $e) {
			$result->errorCode = -1;
			$result->errorDescription = $e->getMessage();

			// Logger::log("logTransaction::ERROR [" . $result->errorDescription . "]", Logger::ERROR);
		}

		return $result;
	}

}

?>