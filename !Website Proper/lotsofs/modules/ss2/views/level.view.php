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
					<!-- Populated by script -->
				</tr>
				<!-- Populated by script -->
			</tbody>
		</table>
		<p>Bold cells: Ammo is set by a fixed value for this chapter.</p>
		<p>Italic cells: Ammo is determined by the generic ammo ratio value of this chapter.</p>
		<p>Dashes: Impossible to get this ammo type at this point in the game.</p>
	</div>
	<div id="sat">
		<h3>Spawners & Timings</h3>
		<div id="satdiv">
			<!-- Populated by script -->
		</div>
	</div>
	<div id="ess">
		<h3>Editor Screenshots</h3>
		<div id="essdiv">
			<!-- Populated by script -->
		</div>
	</div>
	<div id="sbd">
		<h3>Score Breakdown</h3>
		<p class="sbd_multiplierText">
			Enemy Multiplier: 
			<button class="sbd_button" onclick="changeSBDValue(-1)">◀</button>
			<span id="sbd_multiplierSpan">NONE</span>
			<button class="sbd_button" onclick="changeSBDValue(1)">▶</button>
		</p>
		<table id="sbd_table">
			<thead>
				<tr>
					<th colspan=4>Source</th>
					<th colspan=1>Kills</th>
					<th colspan=3>Score</th>
				</tr>
				<tr>
					<th>Ch.</th>
					<th>Area</th>
					<th>Count</th>
					<th>Type</th>
					<th>Cum. Kills</th>
					<th>Worth</th>
					<th>Total Worth</th>
					<th>Cum. Score</th>
				</tr>
			</thead>
			<tbody id="sbd_tbody">
				<!-- Populated by script -->
			</tbody>
		</table>
	</div>
	<div id="map">
		<h3>Map</h3>
		<div id="mapSvgContainer">
			<div id="mapTooltip">
				Sample Text
			</div>
			<!-- Populated by script -->
		</div>
	</div>
	<div id="mps">
		<h3>Macro Program Snippets</h3>
		<div id="mpsdiv">
			<!-- Populated by script -->
		</div>
	</div>
</div>

<div id="levelInfo"
	data-id="<?= $levelId ?>"
	data-name="<?= $levelName ?>"
></div>
<script src="/modules/ss2/js/level.js"></script>

<?php require(__MODULES__ . '/ss2/views/partials/foot.php') ?>
