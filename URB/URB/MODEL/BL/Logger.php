<?php

namespace Business;

class Logger {
	const ERROR = 0;
	const WARNING = 1;
	const INFO = 2;
	const DEBUG = 3;

	private $severityLevel = 3;

	private $echoLog;
	private $logDirectory;
	private $filePrefix;
	private $fileName;

	public function __construct($echoLog, $severityLevel, $logDirectory, $filePrefix) {
		$this->echoLog = $echoLog;
		$this->severityLevel = $severityLevel;
		$this->logDirectory = $logDirectory;
		$this->filePrefix = $filePrefix;

		$datePart = date('Ymd');
		$rootDirectory = $logDirectory . "/";
		$this->fileName = $rootDirectory .  $datePart . $filePrefix . '.log'; 

	}

	public function log($level, $message) {
		$t = microtime(true);
		$integerMicro = intval(($t - floor($t)) * 1000000);
		$micro = sprintf("%06d", $integerMicro);
		$d = new \DateTime( date('Y-m-d H:i:s.'.$integerMicro, intval($t)) );

		$severityText = "";
		if ($level <= $this->severityLevel) {
			if       ($level == Logger::ERROR) {
				$severityText = "ERROR  ";
			} elseif ($level == Logger::WARNING) {
				$severityText = "WARNING";
			} elseif ($level == Logger::INFO) {
				$severityText = "INFO   ";
			} elseif ($level == Logger::DEBUG) {
				$severityText = "DEBUG  ";
			}

			$message = $d->format("Y-m-d H:i:s.u") . " " . $severityText . " " . $message . "\n";
			file_put_contents($this->fileName, $message, FILE_APPEND);
			if ($this->echoLog) {
				echo $message;
			}
		}

	}
}

?>
