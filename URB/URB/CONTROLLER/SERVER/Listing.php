<?php
/**
 * Result
 */

namespace Controller;

class Listing {

	protected function cleanDirectory($filesPath) {

		foreach (glob($filesPath . "*.pdf") as $file) {
			if(time() - filectime($file) > 300) {
				unlink($file);
			}
		}
	}

}

?>