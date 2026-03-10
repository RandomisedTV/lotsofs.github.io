<?php require(__MODULES__ . '/ss2/views/partials/head.php') ?>

<?php require(__MODULES__ . '/ss2/views/partials/nav.php') ?>

<div class="mainBody">
	<h2 id="mapName">MAP NAME</h2>
	<div id="psl">
		<h3>Plot, Story, Lore</h3>
		<p>Welcome to M'Digbo, Sam! <br>
Considering what the Wizards said, I think we should find the M'keke Village and ask their Chief about the medallion. <br>
There may be obstacles blocking your path. This can be dealt with by the use of objects. To pick up, or use a specific object, press the Use button. <br>
My sensors detect that the village is on the other side of the mountain. A monkey's head marks the cave entrance, that should take you to the other side. <br>
Search this settlement in front of us, maybe you can find some useful stuff.</p>
	</div>
	<div>
		<h3>Chapter Completion Requirements</h3>
		<p>Text</p>
	</div>
	<div>
		<h3>Weapons and Ammo</h3>
		<p>Text</p>
	</div>
	<div>
		<h3>Editor Screenshots</h3>
		<p>Text</p>
	</div>
	<div>
		<h3>Score Breakdown</h3>
		<p>Text</p>
	</div>
	<div>
		<h3>Map</h3>
		<p>Text</p>
	</div>
	<div>
		<h3>Macro Program Snippets</h3>
		<p>Text</p>
	</div>
</div>

<table>
    
</table>

<script>
    const levelId = <?= $levelId ?>;
	const levelName = "<?= $levelName ?>";
    
    async function loadLevel() {
        let levelData = await readJsonAsync(`/modules/ss2/json/${levelId}.json`);
        console.log(levelData);

		setElementByIdInnerText("mapName",levelName)
    }

    loadLevel();
</script>

<?php require(__MODULES__ . '/ss2/views/partials/foot.php') ?>
