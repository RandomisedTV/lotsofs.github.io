<?php

define('__ROOT__', $_SERVER['DOCUMENT_ROOT']);
define('__MODULES__', __ROOT__ . '/modules');
define('__MAIN__', __MODULES__ . '/main');
define('__MAIN_URL__', '/modules/main');

$globalData = [];

$config = require('config.php');

function dd($value) {
	echo "<pre>";
	var_dump($value);
	error_log($value);
	echo "</pre>";

	die();
}

function urlIs($value) {
	return $_SERVER['REQUEST_URI'] === $value;
}