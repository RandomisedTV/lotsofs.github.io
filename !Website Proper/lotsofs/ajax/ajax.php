<?php

set_include_path($_SERVER['DOCUMENT_ROOT']);

require 'util.php';

require 'classes/Database.php';
$config = require('config.php');

$db_config = php_sapi_name() === 'cli-server' ? $config['database_test'] : $config['database'];
$db = new Database($db_config);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$data = json_decode(file_get_contents("php://input"), true);
	
	foreach ($data as $datum) {
		$id = $datum["artist_id"];
		if ($id == 0) {
			$sql = "INSERT INTO ARTIST DEFAULT VALUES";
			$stmt = $db->query($sql);
			
			if ($stmt) {
				$newId = $db->pdo->lastInsertId();
				$sql = "INSERT INTO ARTIST_ALIAS (artist_id, name) VALUES (?, ?)";
				$stmt = $db->query($sql, [$newId, $datum["provided_name"], 1]);
			}
		}
		if ($id != -1) {
			// we'll get to this later
		}
	}
	var_dump("DONE");
}