import { initLevel } from "./levelLoader.js";
import { getLevelData } from "./levelLoader.js";
import { psl } from "./sections/psl.js";
import { waa } from "./sections/waa.js";
import { ccr } from "./sections/ccr.js";
import { sat } from "./sections/sat.js";
import { ess } from "./sections/ess.js";
import { sbd } from "./sections/sbd.js";
import { map } from "./sections/map.js";
import { mps } from "./sections/mps.js";

let levelData;

async function start() {
	await initLevel();
	levelData = getLevelData();

	setElementByIdTextContent("mapName", levelData.name);

	psl.populate(levelData);
	waa.populate(levelData);
	ccr.populate(levelData);
	sat.populate(levelData);
	ess.populate(levelData);
	sbd.populate(levelData);
	map.populate(levelData);
	mps.populate(levelData);
}

start();


async function setLevelData() {
	try {
		levelData.chapters.forEach((chapter, i) => {
			if (Object.keys(chapter).length == 0) {
				return;
			}
			addCCRRow(chapter, i);
			addWAARatioCell(chapter, i);
			addSBDSection(chapter, i);
		});
		setPSLObjectives();
		populateWAATable();
		generateMAPSvg();
		populateSATSection();
		populateESSSection();
		populateMPSSection();
		setPSLDsc();
	}
	catch (err) {
		console.log(err);
	}
}

/* AUTORUN */

// initLevel();