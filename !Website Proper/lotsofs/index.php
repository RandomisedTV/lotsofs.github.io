<?php

require 'util.php';

require 'classes/Database.php';

$config = require('config.php');
$db_config = php_sapi_name() === 'cli-server' ? $config['database_test'] : $config['database'];

$db = new Database($db_config);

$migrationPath = __DIR__ .'/database/migrations';
$sqlFiles = glob($migrationPath . '/*.sql');
sort($sqlFiles);

foreach($sqlFiles as $file) {
    $sql = file_get_contents($file);
    $db->execSQL($sql);
}

$data_artistNames = $db->selectAllFromTable("ARTIST_ALIAS");  // TODO: PHP is asinine about scope. This doesnt get passed along because the router is a function and this is not and its dumb
require 'router.php';