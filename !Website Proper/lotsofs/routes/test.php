<?php

$pageTitle = "Test Page";

$db_config = php_sapi_name() === 'cli-server' ? $config['database_test'] : $config['database'];

$db = new Database($db_config);

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

require "views/test.view.php";