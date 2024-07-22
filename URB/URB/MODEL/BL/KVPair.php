<?php
/**
 * Key value pair.
 */

namespace Business;

class KVPair {
	public $sKey = "";
	public $sValue = "";

	public function __construct($k, $v) {
		$this->sKey = $k;
		$this->sValue = $v;
	}

}

?>