<?php

define('__ROOT__', $_SERVER['DOCUMENT_ROOT']);

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