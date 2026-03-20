let levelData = null;
let levelId = 0;

export function getLevelData() {
	return levelData;
}

export function getLevelId() {
	return levelId;
}

export async function initLevel() {
	const levelElement = document.getElementById('levelInfo');
	levelId = levelElement.dataset.id;
	// setElementByIdInnerText("mapName",levelElement.dataset.name)
	try {
		const jsonData = await readJsonFileAsync(`/modules/ss2/json/${levelId}.json`);
		levelData = jsonData;
	}
	catch (err) {
		console.log(err);
	}
}