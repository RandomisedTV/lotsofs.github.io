const ammoInformation = {
	"handGrenades": { 
		"name": "Hand grenades",
		"maxAmmo": 30,
	},
	"shells": {
		"name": "Shells",
		"maxAmmo": 200,
	},
	"bullets": {
		"name": "Bullets",
		"maxAmmo": 1000,
	},
	"rockets": {
		"name": "Rockets",
		"maxAmmo": 50,
	},
	"grenades": {
		"name": "Grenades",
		"maxAmmo": 50,
	},
	"plasma": {
		"name": "Plasma",
		"maxAmmo": 500,
	},
	"sniperBullets": {
		"name": "Sniper bullets",
		"maxAmmo": 50,
	},
	"klodovik": {
		"name": "Klodovik",
		"maxAmmo": 12,
	},
	"cannonBalls": {
		"name": "Cannon balls",
		"maxAmmo": 30,
	},
	"seriousBombs": {
		"name": "Serious bomb",
		"maxAmmo": 3,
	}
};

const scoreInformation = {
	"Auto Shotgun": 100,
	"Barbarian": 200,
	"Chicken": 100,
	"Hand Grenades": 5,
	"Helmet": 5,
	"Orc Commander": 40,
	"Orc Destroyer": 20,
	"Orc Grunt": 10,
	"Rocket Launcher": 100,
	"Rollerball": 200,
	"Shells": 5,
	"Small Health": 10,
	"Treasure Bag": 1000,
	"Treasure Chest": 5000,
	"Treasure Coin": 100,
}

const tooltip = document.getElementById("popupToolTip");

let cumulativeLevelScore = 0;
let cumulativeLevelKills = 0;
let prevCumLevelKills = 0;
let enemyMultiplier = 1;

let levelData = null;
let levelId = 0;

function initLevel() {
	const levelElement = document.getElementById('levelInfo');
	levelId = levelElement.dataset.id;
	setElementByIdInnerText("mapName",levelElement.dataset.name)
	setLevelDsc();
	setLevelData();
}

async function setLevelDsc() {
	try {
		let levelDsc = await readTextFileAsync(`/modules/ss2/text/${levelId}.dsc`);
		setElementByIdInnerText("psl_p",levelDsc)
	}
	catch (err) {
		setElementByIdInnerText("psl_p","")
	}
}

async function setLevelData() {
	try {
		jsonData = await readJsonFileAsync(`/modules/ss2/json/${levelId}.json`);
		levelData = jsonData;
		levelData.chapters.forEach((chapter, i) => {
			if (Object.keys(chapter).length == 0) {
				return;
			}
			addCCRRow(chapter, i);
			addWAARatioCell(chapter, i);
			addSBDSection(chapter, i);
		});
		populateWAATable();
		generateMAPSvg();
		populateSATSection();
		populateESSSection();
		populateMPSSection();
	}
	catch (err) {
		console.log(err);
	}
}

function showTooltipPopup(text) {
	tooltip.textContent = text;
	tooltip.style.visibility = "visible";
}

function moveTooltipPopup(e) {
	tooltip.style.left = `${e.clientX + window.scrollX + 30}px`;
	tooltip.style.top = `${e.clientY + window.scrollY + 10}px`;
}

function hideTooltipPopup() {
	tooltip.style.visibility = "hidden";
	tooltip.style.left = `0`;
	tooltip.style.top = `0`;
}

/* Chapter Completion Requirements */

function addCCRRow(chapter, i) {
	const tbody = document.getElementById("ccr_tbody");
	const row = appendChildToElement(tbody, "tr", "");
	
	appendChildToElement(row, "td", i+1);
	appendChildToElement(row, "td", chapter.name || "no description");
	appendChildToElement(row, "td", chapter.passCondition ?? "?");
	appendChildToElement(row, "td", chapter.securityTimer ?? "?");
	
	let requiresStart = "N/A";
	if (i > 0) {
		requiresStart = chapter.requiresStart ? "Yes" : "No";
	}
	const cell = appendChildToElement(row, "td", requiresStart);
	if (chapter.requiresStart === false) {
		cell.classList.add("bold");
	}
}

/* Weapons and Ammo */

function addWAARatioCell(chapter, i) {
	const tr_head = document.getElementById("waa_tr_head");
	const tr_ratio = document.getElementById("waa_tr_ratio");
	appendChildToElement(tr_head, "th", i+1);
	appendChildToElement(tr_ratio, "td", chapter.ammoRatio);
	for (let key in chapter.customAmmo) {
		if (chapter.customAmmo.hasOwnProperty(key)) {
			// availableAmmoTypes.add(key);
		}
	}
}

function populateWAATable() {
	const tbody = document.getElementById("waa_tbody");
	for (const key in ammoInformation) {
		const ammo = ammoInformation[key];
		const tr_ammo = appendChildToElement(tbody, "tr", "");
		appendChildToElement(tr_ammo, "th", ammo.name);
		levelData.chapters.forEach((chapter, i) => {
			if (Object.keys(chapter).length == 0) {
				return;
			}
			if (key in chapter.customAmmo) {
				const ammoCount = chapter.customAmmo[key];
				if (ammoCount >= 0) {
					const cell = appendChildToElement(tr_ammo, "td", ammoCount);
					cell.classList.add("bold");
				}
				else {
					appendChildToElement(tr_ammo, "td", "-");
				}
			}
			else {
				const ammoCount = Math.floor(chapter.ammoRatio * ammoInformation[key].maxAmmo);
				const cell = appendChildToElement(tr_ammo, "td", ammoCount);
				cell.classList.add("italic");
			}
		})
	}
}

/* Spawner & Timings */

function populateSATSection() {
	const div = document.getElementById("satdiv");
	levelData.spawnerGroups.forEach((spawnerGroup, _) => {
		appendChildToElement(div, "h4", spawnerGroup.groupName);
		
		const pinWidth = 150;

		let svgWidth = 0;
		let svgHeight = 0;
		
		const svg = createSVGElement("svg");
		
		const g = createSVGElement("g");
		g.setAttribute("id", "markers");
		svg.appendChild(g);

		let spawners = spawnerGroup.spawners;

		spawners.forEach((s, spawnerIdx) => {
			appendChildToElement(div, "h4", s.name);
			let spawnees = [];
			let elapsedTime = 0;
			for (let i = 0; i < s.totalNumber; i++) {
				let spawnee = generateSATSpawneeData(s, elapsedTime, i);
				elapsedTime = spawnee.effect;
				spawnees.push(spawnee);

				const pin = generateSATSVGTimelinePin(spawnee, s, pinWidth, spawnerIdx);
				g.appendChild(pin);
			}
			svgWidth = Math.max(svgWidth, elapsedTime*1000 + pinWidth);
			svgHeight = spawnerIdx * 100 + 100;
		})
		svg.setAttribute("width", svgWidth / 10);
		svg.setAttribute("height", "100%");
		svg.setAttribute("preserveAspectRatio", "none");
		svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
		svg.setAttribute("xmlns", SVG_NS);
		
		generateSATSVGTimelineBackdrop(svg, svgWidth, svgHeight, pinWidth);
		
		const svgContainerDiv = appendChildToElement(div, "div", "");
		svgContainerDiv.classList.add("svgContainer");
		svgContainerDiv.appendChild(svg);
	})
}

function generateSATSpawneeData(s, elapsedTime, i) {
	let spawnee = {
		effect: 0,
		egg: 0,
		puppet: 0,
		death: 0
	};
	if (i == 0) {
		elapsedTime += s.initialDelay + s.initialDelayByScript;
	}
	// else if (bugged && i < numberInGroup) {
	// 	// TODO: bugged only applies if the spawn type = maintaingroup (it ignores singleDelay for the first group only)
	// 	elapsedTime += s.groupDelay;
	// }
	else if (i % s.numberInGroup == 0) {
		// groupDelay won't do anything if it's smaller than singleDelay. The game picks the smallest of these two for 1st spawn of subsequent groups
		let spawnTime = Math.max(s.singleDelay, s.groupDelay);
		// TODO:
		// Check the spawnEffectDuration + spawnLaunchDuration + spawneeDeathDelay + timeToKill for the numberInGroup'th enemy spawned before this one.
		// If it is greater than theoreticalSpawnTime, this enemy won't spawn just yet... (in case of maintaingroup)
		// Test how this works.
		elapsedTime += Math.max(spawnTime);
	}
	else {
		elapsedTime += s.singleDelay;
	}
	spawnee.effect = elapsedTime;
	spawnee.egg = spawnee.effect + s.spawnEffectDelay;
	spawnee.puppet = spawnee.egg + s.spawnLaunchDuration;
	spawnee.death = spawnee.puppet + s.timeToKill;
	return spawnee;
}

function generateSATSVGTimelinePin(spawnee, s, pinWidth, spawnerIdx) {
	let tooltipText = `${spawnee.puppet}s: ${s.name}`;

	const pin = createSVGElement("rect");
	pin.setAttribute("x", spawnee.puppet * 1000);
	pin.setAttribute("width", pinWidth);
	pin.setAttribute("y", spawnerIdx * 100);
	pin.setAttribute("height", 100);
	pin.setAttribute("fill", s.color);
	pin.addEventListener("mouseenter", e => {
		pin.setAttribute("fill", "#ffffff");
		showTooltipPopup(tooltipText);
	});
	pin.addEventListener("mouseleave", e => {
		pin.setAttribute("fill", s.color);
		hideTooltipPopup();
	});
	pin.addEventListener("mousemove", moveTooltipPopup);
	return pin;
}

function generateSATSVGTimelineBackdrop(svg, svgWidth, svgHeight, pinWidth) {
	for (let i = pinWidth * 0.5; i < svgWidth; i+=1000) {
		const timeline = createSVGElement("rect");
		timeline.setAttribute("x", i);
		if (i + 1000 > svgWidth) {
			timeline.setAttribute("width", svgWidth % 1000 - pinWidth);	
		}
		else {
			timeline.setAttribute("width", 1000); 
		}
		timeline.setAttribute("y", 0);
		timeline.setAttribute("height", svgHeight);
		timeline.setAttribute("fill", i % 2000 < 1000 ? "#067095" : "#023951");
		svg.insertBefore(timeline, svg.firstChild);
	}
}

/* Editor Screenshots */

function populateESSSection() {
	const div = document.getElementById("essdiv");
	levelData.imagery.forEach((img, i) => {
		appendChildToElement(div, "h4", img.title);
		appendChildToElement(div, "p", img.description);
		const imgElement = appendChildToElement(div, "img", "");
		imgElement.src = `/modules/ss2/img/levels/${levelId}/${img.fileName}`;
	})
}

/* Score Breakdown */

function purgeSBDTable() {
	const tbody = document.getElementById("sbd_tbody");
	tbody.innerHTML = "";
	cumulativeLevelScore = 0;
	cumulativeLevelKills = 0;
	prevCumLevelKills = 0;
}

function addSBDSection(chapter, i) {
	const tbody = document.getElementById("sbd_tbody");
	let row = appendChildToElement(tbody, "tr", "");
	row.classList.add("sbd_firstOfChapter");
	const td_chapter = appendChildToElement(row, "td", i+1);
	let itemCount = 0;
	
	for (const [areaName, items] of Object.entries(chapter.points)) {
		const td_area = appendChildToElement(row, "td", areaName);
		td_area.rowSpan = items.length;
		for (const item of items) {
			itemCount++;
			
			let multiplier = item.countsAsKill ? enemyMultiplier : 1;
			if (item.maxMultiplier) {
				multiplier = Math.min(multiplier, item.maxMultiplier);
			}

			let name = item.name;
			if (item.note) {
				name += ` (${item.note.toLowerCase()})`;
			}
			
			const worth = item.worth ?? scoreInformation[item.name] ?? "????";
			count = (item.count ?? 1) * multiplier;
			const countsAsKill = item.countsAsKill ?? false;
			
			const totalWorth = worth * count;
			cumulativeLevelScore += totalWorth;
			cumulativeLevelKills += countsAsKill ? count : 0;
			
			appendChildToElement(row, "td", count);
			appendChildToElement(row, "td", name);
			
			appendChildToElement(row, "td", cumulativeLevelKills == prevCumLevelKills ? "" : cumulativeLevelKills);
			
			appendChildToElement(row, "td", worth);
			appendChildToElement(row, "td", totalWorth);
			appendChildToElement(row, "td", cumulativeLevelScore);
			
			if (cumulativeLevelKills > prevCumLevelKills) {
				prevCumLevelKills = cumulativeLevelKills;
			}
			row = appendChildToElement(tbody, "tr", "");
		}
		row.classList.add("sbd_nextarea");
	}
	td_chapter.rowSpan = itemCount;
}

function changeSBDValue(change) {
	enemyMultiplier += change;
	enemyMultiplier %= 11;
	if (enemyMultiplier < 1) enemyMultiplier = 11;
	let sbd_multiplierSpan = document.getElementById("sbd_multiplierSpan");
	sbd_multiplierSpan.innerText = enemyMultiplier == 1 ? "NONE" : enemyMultiplier + "X";
	purgeSBDTable();
	levelData.chapters.forEach((chapter, i) => {
		if (Object.keys(chapter).length == 0) {
			return;
		}
		addSBDSection(chapter, i);
	});
}

/* Map */

function generateMAPSvg() {
	const imageHref = `/modules/ss2/img/maps/${levelId}.png`;
	const width = levelData.map.width;
	const height = levelData.map.height;

	const markers = levelData.map.markers;

	const svg = createSVGElement("svg");
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	svg.setAttribute("xmlns", SVG_NS);
	
	const image = createSVGElement("image");
	image.setAttribute("href", imageHref);
	image.setAttribute("x", 0);
	image.setAttribute("y", 0);
	image.setAttribute("width", width);
	image.setAttribute("height", height);
	svg.appendChild(image);

	const g = createSVGElement("g");
	g.setAttribute("id", "markers");
	markers.forEach(m => {
		const circle = createSVGElement("circle");
		circle.setAttribute("cx", m.x);
		circle.setAttribute("cy", m.y);
		circle.setAttribute("r", m.r);
		circle.setAttribute("fill", m.color);
		circle.setAttribute("stroke", "#000000");

		circle.addEventListener("mouseenter", e => {
			circle.setAttribute("fill", "#ffffff");
			showTooltipPopup(m.tooltip);
		});
		circle.addEventListener("mouseleave", e => {
			circle.setAttribute("fill", m.color);
			hideTooltipPopup();
		});
		circle.addEventListener("mousemove", moveTooltipPopup);

		g.appendChild(circle);
	})
	svg.appendChild(g);

	document.getElementById("mapSvgContainer").appendChild(svg);
}

/* Macro Program Snippets */

async function populateMPSSection() {
	const div = document.getElementById("mpsdiv");
	for (const m of levelData.macros) {
		try {
			const text = await readTextFileAsync(`/modules/ss2/text/macros/${levelId}/${m.fileName}.mps`);
			appendChildToElement(div, "h4", `${m.title} [${m.fileName}]`);
			const pre = appendChildToElement(div, "pre", "");
			appendChildToElement(pre, "code", text);
		}
		catch (e) {
			console.log(e);
		}
	}
}

/* AUTORUN */

initLevel();