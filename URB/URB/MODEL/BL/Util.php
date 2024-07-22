<?php
/**
 * Util
 */

namespace Business;

class Util {

	public static function objArraySearch($array, $index, $value) {
		$arrayElement = null;

		foreach($array as $arrayInf) {
			if($arrayInf->{$index} == $value) {
				$arrayElement = $arrayInf;
				break;
			}
		}

		return $arrayElement;
	}

	public static function stringDateToDBDate($formatedDate) {
		$dateParts = explode("/", $formatedDate);
		$dayPart = $dateParts[0];
		$monthPart = $dateParts[1];
		$yearPart = $dateParts[2];
		$formatedDate = $yearPart . "-" . $monthPart . "-" .$dayPart;

		return $formatedDate;
	}
}

?>