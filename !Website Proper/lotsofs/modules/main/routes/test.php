<?php

$pageTitle = "Test Page";

$dbName = php_sapi_name() === 'cli-server' ? "test_test_db.sqlite" : "live_test_db.sqlite";

$db = new Database($dbName);

$db->execSQL('PRAGMA foreign_keys = ON');

$sqlFiles = glob(__ROOT__ .'/database/migrations/*.sql');
sort($sqlFiles);


foreach($sqlFiles as $file) {
    $sql = file_get_contents($file);
    
    $statements = array_filter(explode(";", $sql));

    foreach ($statements as $stmt) {
        $db->execSQL($stmt);
    }
}

$globalData['artistNames'] = $db->selectAllFromTable("artist_alias");

require __MAIN__ . "/views/test.view.php";