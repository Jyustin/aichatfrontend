---
toc: true
comments: true
layout: base
title: island mini map
author: luna
permalink: /islandmap
---

<style>
body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#game-container {
    width: 80vw; 
    height: 100vh;
    position: relative;
    overflow: hidden;
}

#game-map {
    width: 2000px; 
    height: 2000px; 
    position: absolute;
}

#sprite {
    width: 50px; 
    height: 50px;
    background-color: #f00; 
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
}
</style>

<title>Game Map Draft</title>

<body>
    <div id="game-container">
        <img id="game-map" src="images/map-draft.png" alt="Game Map">
        <div id="sprite" class="character"></div>
    </div>
    <script src="game.js"></script>
</body>
</html>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const sprite = document.getElementById("sprite");
    const gameMap = document.getElementById("game-map");

    document.addEventListener("keydown", function (event) {
        const speed = 5; 

        switch (event.key) {
            case "ArrowUp":
                sprite.style.top = `${parseFloat(sprite.style.top || 0) - speed}px`;
                gameMap.style.top = `${parseFloat(gameMap.style.top || 0) + speed}px`;
                break;
            case "ArrowDown":
                sprite.style.top = `${parseFloat(sprite.style.top || 0) + speed}px`;
                gameMap.style.top = `${parseFloat(gameMap.style.top || 0) - speed}px`;
                break;
            case "ArrowLeft":
                sprite.style.left = `${parseFloat(sprite.style.left || 0) - speed}px`;
                gameMap.style.left = `${parseFloat(gameMap.style.left || 0) + speed}px`;
                break;
            case "ArrowRight":
                sprite.style.left = `${parseFloat(sprite.style.left || 0) + speed}px`;
                gameMap.style.left = `${parseFloat(gameMap.style.left || 0) - speed}px`;
                break;
        }
    });
});
</script>
