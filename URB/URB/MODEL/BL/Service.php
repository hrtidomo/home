<?php
/**
 * Service.
 */

/**
 * Business layer. 
 *
 *
 */

namespace Business;

class Service {
	protected $language;
	protected $resourcesPath;

	public function __construct($resourcesPath) {
		$this->language = "es-ES";
		$this->resourcesPath = $resourcesPath;

		if (isset($_SESSION['LANGUAGE'])) {
			$this->language = $_SESSION['LANGUAGE'];
		} else {
			$_SESSION['LANGUAGE'] = $this->language;
		}
	}

	/**
	 * Returns the JSON resource for the indicated identifier according to the language.
	 * 
	 * @param string $id
	 * @param string $subdirectory
	 * @return string
	 */
	protected function findLiteral($id, $subdirectory) {


		$file = $this->resourcesPath;
		if ($subdirectory == null) {
			$file .= "/" . $this->language . "/" . $this->language . ".csv";
		} else {
			$file .= "/" . $this->language . "/" . $subdirectory . ".csv";
		}

		$resources=$this->loadCSV($file, ";");

		return $resources[$id];
	}

	/**
	 * Returns the content of the indicated filename as an array.
	 * 
	 * @param string $filename
	 * @param string $delimiter
	 * @return string[]
	 */
	protected function loadCSV($filename, $delimiter) {
		$data = false;
	
		if(file_exists($filename) && is_readable($filename)) {
			if (($handle = fopen($filename, 'r')) !== FALSE) {
				$data = array();
				while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE) {
					if (count($row) > 1) {
						$data[$row[0]] = $row[1];
					}
				}
				fclose($handle);
			}
		}

		return $data;
	}

	/**
	 * Finds all literals enclosed in braces contained in original string
	 * and replaces them with their translations.
	 * 
	 * @param string $original
	 * @return string
	 */
	protected function translateText($original, $subdirectory) {
		$translation = $original;

		$matches = [];
		if (preg_match_all('/{(.*?)}/', $original, $matches)) {
			foreach ($matches[0] as $match) {
				$length = strlen($match);
				$literal = substr($match, 1, $length-2);

				$translated = $this->findLiteral($literal, $subdirectory);
				$translation = str_replace($match, $translated, $translation);
			}
		} else {
			$translation = $original;
		}
	
		return $translation;
	}

	/**
	 * Reads the content of the file associated to the resource indicated by its id.
	 * 
	 * @param string $resource
	 * @return string
	 */
	public function loadResource($resource, $location = null) {
		$file = $this->resourcesPath;
		if ($location == null) {
			$file .= "/" . $this->language . "/" . $resource. ".res";
		} else {
			$file .= "/" . $this->language . "/" . $location . "/" . $resource. ".res";
		}
 
		$content = file_get_contents($file);

		return $content;
	}

	/**
	 * Generates random string.
	 * 
	 * @return string
	 */
	protected static function randomPassword() {
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}

	/**
	 * Gets the content of the indicated file and replaces label tags by their language correspondences.
	 *
	 * @param string $file
	 * @return string
	 */
	public function loadHTML($file, $subdirectory = null) {
		$original = file_get_contents($file);
		$translated = $this->translateText($original, $subdirectory);

		return $translated;
	}

}

?>
