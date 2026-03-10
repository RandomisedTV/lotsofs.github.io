<?php require(__MODULES__ . '/ss2/views/partials/head.php') ?>

<?php require(__MODULES__ . '/ss2/views/partials/nav.php') ?>

<div class="mainBody">
	<h2 id="mapName">MAP NAME</h2>
	<div id="psl">
		<h3>Plot, Story, Lore</h3>
		<p id="psl_p">Level .dsc file blurb</p>
	</div>
	<div id="ccr">
		<h3>Chapter Completion Requirements</h3>
		<table id="ccr_table">
			<thead>
				<tr>
					<th>Ch.</th>
					<th>Official Description</th>
					<th>Completion Condition</th>
					<th>Security Timer</th>
					<th>Requires previous chapter completion?</th>
				</tr>
			</thead>
			<tbody id="ccr_tbody">
				<!-- Populated by script -->
			</tbody>
		</table>
	</div>
	<div id="waa">
		<h3>Weapons and Ammo</h3>
		<table id="waa_table">
			<thead>
				<tr id="waa_tr_head">
					<th>Weapon \ Chapter</th>
					<!-- Populated by script -->
				</tr>
			</thead>
			<tbody id="waa_tbody">
				<tr id="waa_tr_ratio">
					<th>Ammo Ratio</th>
				</tr>
				<!-- Populated by script -->
			</tbody>
		</table>
		<p>Bold cells: Ammo is set by a fixed value for this chapter.</p>
		<p>Italic cells: Ammo is determined by the generic ammo ratio value of this chapter.</p>
		<p>Dashes: Impossible to get this ammo type at this point in the game.</p>
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

<div id="levelInfo"
	data-id="<?= $levelId ?>"
	data-name="<?= $levelName ?>"
></div>
<script src="/modules/ss2/js/level.js"></script>

<?php require(__MODULES__ . '/ss2/views/partials/foot.php') ?>
