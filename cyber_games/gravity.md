---
layout: none
title: Gravity game
author: Grace
permalink: /gravity
---
<script src="uri.js"></script>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gravity Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            position: relative;
            width: 100%;
            height: 100%;
        }
        canvas {
            display: block;
            background-color: white;
            background-image: url("{{site.baseurl}}/images/earth.png"); /* Add this line */
            background-size: cover; /* Ensure the image covers the entire canvas */
            width: 100vw; /* Set to the viewport width */
            height: 100vh; /* Set to the viewport height */
        }
        #typingBar {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: none; /* Hide initially */
        }
        input {
            font-size: 16px;
            width: 300px;
            padding: 10px;
            margin-top: 20px;
        }
        #startScreen {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
        }
        #startScreen button {
            padding: 20px;
            font-size: 20px;
            margin: 10px;
            cursor: pointer;
        }
        #endScreen {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none; /* Hide initially */
            color: white;
        }
        #endScreen button {
            padding: 20px;
            font-size: 20px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="startScreen">
        <h1>Gravity Game</h1>
        <button id="startCSP">Start CSP</button>
        <button id="startCSA">Start CSA</button>
        <button id="startCyber">Start Cyber</button>
    </div>
    <div id="endScreen">
        <h1>Game Over</h1>
        <p>Your score is: <span id="finalScore"></span></p>
        <button id="restartButton">Restart</button>
    </div>
    <canvas id="gameCanvas" style="display: none;"></canvas>
    <div id="typingBar">
        <input type="text" id="userInput" placeholder="Type the definition">
        <div id="inputHistory"></div>
    </div>
</body>
</html>
<div id="games-played-div">
    <h1 id="gamesPlayed"></h1>
</div>

<script>
    const canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const userInput = document.getElementById("userInput");
    const inputHistory = document.getElementById("inputHistory");
    const startScreen = document.getElementById("startScreen");
    const endScreen = document.getElementById("endScreen");
    const restartButton = document.getElementById("restartButton");
    const typingBar = document.getElementById("typingBar");
    const startCSP = document.getElementById("startCSP");
    const startCSA = document.getElementById("startCSA");
    const startCyber = document.getElementById("startCyber");
    const finalScore = document.getElementById("finalScore");
    let rocks = [];
    let score = 10;
    let topic = "";
    let gameRunning = false;
    const backgroundImage = new Image();
    backgroundImage.src = "{{site.baseurl}}/images/earth.png";
    backgroundImage.onload = function() {
        draw();
    };
    async function fetchTerm(topic) {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
        };
        try {
            const response = await fetch(uri + '/api/terms/randomTerm/' + topic, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const termAndDefinition = {
                term: data.term,
                definition: data.definition
            };
            console.log(termAndDefinition);
            return termAndDefinition;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    }
    async function newRock() {
        const termData = await fetchTerm(topic);
        if (!termData) {
            return;
        }
        const { term, definition } = termData;
        let newX, newY;
        do {
            newX = Math.random() * (canvas.width - 300) + 100;
            newY = 0;
        } while (isOverlapping(newX, newY));
        const rock = {
            term: term,
            definition: definition,
            x: newX,
            y: newY,
            speed: .1
        };
        rocks.push(rock);
    }
    function isOverlapping(newX, newY) {
        for (const rock of rocks) {
            const distance = Math.sqrt((newX - rock.x) ** 2 + (newY - rock.y) ** 2);
            if (distance < 200) {
                return true;
            }
        }
        return false;
    }
    function drawText(text, x, y, width = 200, height = 200, fontSize = 18) {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = "white";
        const lines = [];
        let currentLine = "";
        const words = text.split(' ');
        for (const word of words) {
            const testLine = currentLine + (currentLine === "" ? "" : " ") + word;
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > width && currentLine !== "") {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, y + i * fontSize);
        }
    }
    function draw() {
        if (!gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        for (const rock of rocks) {
            drawText(rock.definition, rock.x, rock.y);
            rock.y += rock.speed;
            if (rock.y > canvas.height) {
                const index = rocks.indexOf(rock);
                rocks.splice(index, 1);
                score -= 1;
                if (score <= 0) {
                    endGame();
                    return;
                }
            }
        }
        drawText(`Score: ${score}`, 50, 750);
        requestAnimationFrame(draw);
    }
    function checkInput() {
        const userTyped = userInput.value.trim().toLowerCase();
        for (const rock of rocks) {
            if (userTyped === rock.term.toLowerCase()) {
                const index = rocks.indexOf(rock);
                rocks.splice(index, 1);
                score += 1;
                userInput.value = "";
            }
        }
    }
    async function gameLoop() {
        if (!gameRunning) return;
        await newRock();
        checkInput();
        setTimeout(gameLoop, 10000);
    }
    function startGame(selectedTopic) {
        startScreen.style.display = "none";
        endScreen.style.display = "none";
        canvas.style.display = "block";
        typingBar.style.display = "block";
        topic = selectedTopic;
        score = 10;
        rocks = [];
        gameRunning = true;
        gameLoop();
        draw();
        addGamePlay();
    }
    function endGame() {
        gameRunning = false;
        finalScore.textContent = score;
        endScreen.style.display = "block";
        canvas.style.display = "none";
        typingBar.style.display = "none";
    }
    userInput.addEventListener("input", checkInput);
    startCSP.addEventListener("click", () => startGame("csp"));
    startCSA.addEventListener("click", () => startGame("csa"));
    startCyber.addEventListener("click", () => startGame("cyber"));
    restartButton.addEventListener("click", () => startGame(topic));

    //key and game play code
    let addPlays = 1;

    function addGamePlay(){
        const myHeaders = new Headers();

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };
        //Adding points to the account
        fetch(uri + `/api/person/addGamePlay?plays=${addPlays}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                addKey(gamesPlayed);
                console.log("games played: " + gamesPlayed + " key given heh");
                })
            .catch(error => console.log('error lol', error));
        return;
    }

    let numKeys = 1;

    function addKey(games) {
        if (games == 3 && totalKeys < 3){
            const myHeaders = new Headers();

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                credentials: 'include'
            };
            //Adding points to the account
            fetch(uri + `/api/person/addKey?numKeys=${numKeys}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    resetGamePlay();
                    console.log("reset done");
                })
                .catch(error => console.log('error lol', error));
            return;
        }
    }

    let removePlays = 3;

    function resetGamePlay() {
        const myHeaders = new Headers();

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };
        //Adding points to the account
        fetch(uri + `/api/person/resetGamePlay?plays=${removePlays}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('reset game play failed', error));
        return;
    }

</script>
