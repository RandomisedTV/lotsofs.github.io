<?php require(__MODULES__ . '/ss2/views/partials/head.php') ?>

<table>
    
</table>

<script>
    const levelId = <?= $levelId ?>;
    
    async function loadLevel() {
        let levelData = await readJsonAsync(`/modules/ss2/json/${levelId}.json`);
        console.log(levelData);
    }

    loadLevel();
</script>