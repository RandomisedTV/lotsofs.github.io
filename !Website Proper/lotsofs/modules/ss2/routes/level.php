<?php


$levels = [
	'11' => "Jungle (M'Digbo)",
	'12' => "Riverdance (M'Digbo)",
];
	
$levelId = getLastUrlPart();

$pageTitle = $levels[$levelId];

require(__MODULES__ . '/ss2/views/level.view.php');