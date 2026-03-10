initLevel();

const ammoInformation = {
    "handGrenades": { 
        "name": "Hand Grenades",
        "maxAmmo": 30,
    },
    "shells": {
        "name": "Shells",
        "maxAmmo": 200,
    },
    "bullets": {
        "name": "Bullets",
        "maxAmmo": 0,
    },
    "rockets": {
        "name": "Rockets",
        "maxAmmo": 0,
    },
    "grenades": {
        "name": "Grenades",
        "maxAmmo": 0,
    },
    "plasma": {
        "name": "Plasma",
        "maxAmmo": 0,
    },
    "sniperRounds": {
        "name": "Sniper Rounds",
        "maxAmmo": 0,
    },
    "klodovik": {
        "name": "Klodovik",
        "maxAmmo": 0,
    },
    "cannonBalls": {
        "name": "Cannon Balls",
        "maxAmmo": 0,
    },
    "seriousBombs": {
        "name": "Serious Bombs",
        "maxAmmo": 0,
    }
};

const scoreInformation = {
    "Autoshotgun": 100,
    "Chicken": 100,
    "Hand Grenades": 5,
    "Helmet": 5,
    "Orc Soldier": 10,
    "Shells": 5,
    "Treasure Bag": 1000,
    "Treasure Chest": 5000,
    "Treasure Coin": 100,
}

function initLevel() {
    const levelElement = document.getElementById('levelInfo');
    setElementByIdInnerText("mapName",levelElement.dataset.name)
    setLevelDsc(levelElement.dataset.id);
    setLevelData(levelElement.dataset.id);
}

async function setLevelData(levelId) {
    try {
        let levelData = await readJsonFileAsync(`/modules/ss2/json/${levelId}.json`);
        populateCCRTable(levelData);
        populateWAATable(levelData);
    }
    catch (err) {
    }
}

async function setLevelDsc(levelId) {
    try {
        let levelDsc = await readTextFileAsync(`/modules/ss2/text/${levelId}.dsc`);
        setElementByIdInnerText("psl_p",levelDsc)
    }
    catch (err) {
        setElementByIdInnerText("psl_p","")
    }
}

function populateWAATable(levelData) {
    const tr_head = document.getElementById("waa_tr_head");
    const tr_ratio = document.getElementById("waa_tr_ratio");
    let availableAmmoTypes = new Set();
    levelData.chapters.forEach((chapter, i) => {
        if (Object.keys(chapter).length == 0) {
            return;
        }
        appendChildToElement(tr_head, "th", i+1);
        appendChildToElement(tr_ratio, "td", chapter.ammoRatio);
        for (let key in chapter.customAmmo) {
            if (chapter.customAmmo.hasOwnProperty(key)) {
                availableAmmoTypes.add(key);
            }
        }
    })
    console.log(availableAmmoTypes);
    const tbody = document.getElementById("waa_tbody");
    for (const key in ammoInformation) {
        // if (!availableAmmoTypes.has(key)) {
        //     continue;
        // }
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
                    const cell = appendChildToElement(tr_ammo, "td", "-");
                }
            }
            else {
                if (availableAmmoTypes.has(key)) {
                    const ammoCount = chapter.ammoRatio * ammoInformation[key].maxAmmo;
                    const cell = appendChildToElement(tr_ammo, "td", ammoCount);
                    cell.classList.add("italic");
                }
                else {
                    const cell = appendChildToElement(tr_ammo, "td", "-");
                }
            }
        })
    }
}

function populateCCRTable(levelData) {
    const tbody = document.getElementById("ccr_tbody");
    levelData.chapters.forEach((chapter, i) => {
        if (Object.keys(chapter).length == 0) {
            return;
        }
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
    });
}
