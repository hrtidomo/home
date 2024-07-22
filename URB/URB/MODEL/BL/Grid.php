<?php
/**
 * Result
 */

namespace Business;

require_once dirname(__FILE__) . '/Result.php';

class GRequest {
	public $sUID = "";
	public $iPage = 0;
	public $iRPP = 0;
	public $sSName = "";
	public $sSOrder = "";
	public $sQField = "";
	public $sQValue = "";
	public $vConditions = Array();
	public $vOrder = Array();
	public $vParameters = Array();
}

class GRow {
	public $id = 0;
	public $vCells = Array();
}

class GData {
	public $iPage = 0;
	public $iTRows = 0;
	public $vRows = Array();

	public function addData($rows) {
		$result = new Result();

		foreach($rows as $row) {
			$gridRow = new GRow();
			$gridRow->id = 0;
			foreach($row as $cell) {
				array_push($gridRow->vCells, $cell);
			}

			array_push($this->vRows, $gridRow);
		}

		$result->object = $this;
		return $result;
	}
}

?>