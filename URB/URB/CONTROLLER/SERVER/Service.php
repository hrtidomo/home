<?php

namespace Controller;

require_once $globalPath . '/MODEL/BL/Grid.php';


/**
 * Controller server side. 
 *
 * Provides common functionality to communicate with the client side of the controller
 * in order to honor client requests. 
 *
 */
class Service {

	protected $response;	/**< string		JSON response to controller client side. */
	protected $model;

	public $postArray;	/**< string[]	Array of parameters in the POST. */
	public $command;	/**< string		Command requested by client side controller. */
	public $method;		/**< string		Method requested by client side controller. */

	function __construct($model=null) {
		$this->model = $model;
	}

	/**
	 * Gets the value of the indicated parameter from POST request.
	 * 
	 * @param string $key
	 * @return string
	 */
	protected function getPOST($key) {
		$value = "";

		if (isset($this->postArray[$key])) {
			$value = $this->postArray[$key];
		}
		return $value;
	}

	/**
	 * Places POST parameters into an array.
	 * 
	 * @return string[]
	 */
	protected function postData() {

		$pos = false;
		if (isset($_SERVER["CONTENT_TYPE"])) {
			$contenttype = $_SERVER["CONTENT_TYPE"];
			$pos = strpos($contenttype, "multipart/form-data");
		}

		if ($pos === false) {
			$postData = file_get_contents('php://input');
			$this->postArray = json_decode($postData, true);
		} else {
			$this->postArray = array();
			foreach ($_POST as $key => $value) {
				$this->postArray[$key] = $value;
			}
		}

		return $this->postArray;
	}

	/**
	 * Determines if the user has a session.
	 *
	 * @return bool
	 */
	protected function isLogged() {
		return isset($_SESSION['IDUSER']);
	}

	/**
	 * Determines if the requests comes from POST
	 *
	 * @return bool
	 */
	public function isPOST() {
		$rtype = "";

		if (isset($_SERVER['REQUEST_METHOD'])) {
			$rtype = $_SERVER['REQUEST_METHOD'];
		}

		return ($rtype == "POST");
	}

	/**
	 * Determines if the GET requests is allowed
	 *
	 * @return bool
	 */
	private function allowedGET() {
		$rtype = "";

		if (isset($_SERVER['REQUEST_METHOD'])) {
			$rtype = $_SERVER['REQUEST_METHOD'];
		}

		$isAllowed = false;
		if(isset($_GET["CH01"]) && isset($_GET["RS02"])) {
			$isAllowed = true;
		}

		return $isAllowed;
	}

	/**
	 * Only POST requests are allowed. Build fake 404 response. 
	 *
	 */
	public function protocolError() {
		if (!$this->allowedGET()) {
			if (isset($_SERVER["SERVER_PROTOCOL"])) {
				header($_SERVER["SERVER_PROTOCOL"]." 403 Forbidden");
			}
			header("Status: 403 Forbidden");
			header("Connection: close");

			if (isset($_SERVER['REDIRECT_STATUS'])) {
				$_SERVER['REDIRECT_STATUS'] = 404;
			}

			$exitMessage = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">';
			$exitMessage .= '<html><head>';
			$exitMessage .= '<title>403 Forbidden</title>';
			$exitMessage .= '</head><body>';
			$exitMessage .= '<h1>Forbidden</h1>';
			$exitMessage .= "<p>You don't have permission to access on this server.</p>";
			$exitMessage .= '<hr>';
			$exitMessage .= '<address>Apache Server Port 443</address>';
			$exitMessage .= '</body></html>';
			exit($exitMessage);
		} else {
			// Recovery procedure.
			$contentHTML  = "<!DOCTYPE html>                                                                        \n";
			$contentHTML .= "<html lang='es'>                                                                       \n";
			$contentHTML .= "    <head>                                                                             \n";
			$contentHTML .= "        <meta http-equiv='Cache-Control' content='no-store' />                         \n";
			$contentHTML .= "        <meta http-equiv='Pragma' content='no-cache' />                                \n";
			$contentHTML .= "        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />          \n";
			$contentHTML .= "        <meta http-equiv='X-UA-Compatible' content='IE=edge' />                        \n";
			$contentHTML .= "        <meta name='viewport' content='width=device-width, initial-scale=1.0'>         \n";
			$contentHTML .= "     </head>                                                                           \n";
			$contentHTML .= "    <body onload='startApplication();'></body>                                         \n";
			$contentHTML .= "    <script>                                                                           \n";
			$contentHTML .= "        var g_oApplication;                                                            \n";
			$contentHTML .= "        function startApplication() {                                                  \n";
			$contentHTML .= "            var oPOST;                                                                 \n";
			$contentHTML .= "            var xmlHttp;                                                               \n";
			$contentHTML .= "            xmlHttp = new XMLHttpRequest();                                            \n";
			$contentHTML .= "            xmlHttp.onreadystatechange=function() {                                    \n";
			$contentHTML .= "                var responseObject;                                                    \n";
			$contentHTML .= "                if(xmlHttp.readyState == 4) {                                          \n";
			$contentHTML .= "                    if(xmlHttp.status == 200) {                                        \n";
			$contentHTML .= "                        responseObject = JSON.parse(xmlHttp.responseText);             \n";
			$contentHTML .= "                        if (responseObject.iCode == 0) {                               \n";
			$contentHTML .= "                            if (window.execScript) {                                   \n";
			$contentHTML .= "                                window.execScript(responseObject.sCode);               \n";
			$contentHTML .= "                            } else {                                                   \n";
			$contentHTML .= "                                eval.call(null, responseObject.sCode);                 \n";
			$contentHTML .= "                            }                                                          \n";
			$contentHTML .= "                        }                                                              \n";
			$contentHTML .= "                    }                                                                  \n";
			$contentHTML .= "                }                                                                      \n";
			$contentHTML .= "            };                                                                         \n";
			$contentHTML .= "            xmlHttp.open('POST', 'GATE.php', true);                                    \n";
			$contentHTML .= "            xmlHttp.setRequestHeader('Content-Type','application/json; charset=utf-8');\n";
			$contentHTML .= "            oPOST={};                                                                  \n";
			$contentHTML .= "            oPOST.sCMD='RECOVER';                                                      \n";
			$contentHTML .= "            oPOST.sURL=window.location.href;                                           \n";
			$contentHTML .= "            oPOST.CH01='" . $_GET["CH01"] . "'\n";
			$contentHTML .= "            oPOST.RS02='" . $_GET["RS02"] . "'\n";
			$contentHTML .= "            xmlHttp.send(JSON.stringify(oPOST));                                       \n";
			$contentHTML .= "        }                                                                              \n";
			$contentHTML .= "    </script>                                                                          \n";
			$contentHTML .= "</html>                                                                                \n";

			exit($contentHTML);
		}

	}

	public  function gridRequest() {
		$gr = new \Business\GRequest();

		$gr->sUID        = $this->getPOST("sUID");
		$gr->iPage       = $this->getPOST("iPage");
		$gr->iRPP        = $this->getPOST("iRPP");
		$gr->sSName      = $this->getPOST("sSName");
		$gr->sSOrder     = $this->getPOST("sSOrder");
		$gr->sQField     = $this->getPOST("sQField");
		$gr->sQValue     = $this->getPOST("sQValue");
		$gr->vConditions = $this->getPOST("vConditions");

		if (isset($this->postArray["vParameters"])) {
			$parametersArray = $this->getPOST("vParameters");
			if (sizeof($parametersArray) > 0) {
				if (key($parametersArray[0]) == "oFilter") {
					$filterObject = $parametersArray[0];
					$gr->oFilters = new \stdClass();

					foreach ($filterObject as $fiterCategories) {
						$categoriesKeys = array_keys($fiterCategories);
						$categoriesCount = count($categoriesKeys);
						for ($i = 0; $i < $categoriesCount; $i++) {
							$categoryKey = $categoriesKeys[$i];
							$gr->oFilters->$categoryKey = new \stdClass();

							$categoryElements = $fiterCategories[$categoryKey];
							$elementsInCategory = count($categoryElements);
							for ($j=0; $j < $elementsInCategory; $j++) {
								$categoryElement = $categoryElements[$j];
								$elementKeys = array_keys($categoryElement);
								$itemCount = count($elementKeys);
								for ($k=0; $k < $itemCount; $k++) {
									$itemKey = $elementKeys[$k];
									$gr->oFilters->$categoryKey->$itemKey = $categoryElement[$itemKey];
								}
							}
						}
					}
				} else {
					foreach ($parametersArray as $element) {
						$parameterElement = new \stdClass();
						$parameterElement->key = key($element);
						$parameterElement->value = $element[$parameterElement->key];
						array_push($gr->vParameters, $parameterElement);
					}
				}
			}

		}

		return $gr;

	}

	public function reportRequest() {
		$rr = new \stdClass();

		$tmpCollection = $this->getPOST("oReport");
		$rr->iPage       = 1;
		$rr->iRPP        = 60;
		$rr->sSName      = $tmpCollection["sSName"     ];
		$rr->sSOrder     = $tmpCollection["sSOrder"    ];
		$rr->sQField     = isset($tmpCollection["sQField"]) ? $tmpCollection["sQField"] : ""; 
		$rr->sQValue     = $tmpCollection["sQValue"    ];
		$rr->vConditions = $tmpCollection["vConditions"];
		$rr->vParameters = array();

		if (isset($tmpCollection["vParameters"])) {
			$parametersArray = $tmpCollection["vParameters"];
			foreach ($parametersArray as $element) {
				$parameterElement = new \stdClass();
				$parameterElement->key = key($element);
				$parameterElement->value = $element[$parameterElement->key];
				array_push($rr->vParameters, $parameterElement);
			}
		}
		
		return $rr;
	}

}

?>