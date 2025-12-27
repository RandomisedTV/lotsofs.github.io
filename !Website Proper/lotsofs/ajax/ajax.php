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
			$sql = "INSERT INTO artist DEFAULT VALUES";
			$stmt = $db->query($sql);
			
			if ($stmt) {
				$id = $db->pdo->lastInsertId();
			}
		}
		if ($id != -1) {
			$sql = "INSERT OR IGNORE INTO artist_alias (artist_id, name) VALUES (?, ?)";
			$stmt = $db->query($sql, [$id, $datum["og_name"]]);
			// we'll get to this later
		}
	}
}