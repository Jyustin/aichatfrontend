---
toc: true
comments: true
layout: multiplayer
title: Fight!
author: Theo H
---

<script src="uri.js"></script>
<script src="connectionURI.js"></script>

<div>
    <div class="alert" id="alert" style="display: none;">
        <div id="home-btn" class="move">
            Go back to homepage
        </div>
    </div>
    <div class="health-box">
        <div class="topRow">
            <div class="move" id="playerName">NAME</div>
            <div class="move" id="playerLevel">LEVEL</div>
        </div>
        <div class="bottomRow">
            <!-- <div class="move" id="damage">Damage</div> -->
            <div class="move" id="playerHealth">HEALTH</div>
        </div>
    </div>
    <div class="health-box" style="margin-left: 65vw; margin-right: 10vw;margin-top: 25vh;">
        <div class="move" id="opponentName">Enemy: </div>
        <div class="move" id="opponentHealth">Enemy Health: </div>
    </div>
    <div class="fight-container">
        <div class="player-box" id="p1">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box" id="p2" style="width: 150px">
            <img id="pIMG" id="eIMG" class="" src="{{site.baseurl}}/images/opponent.png">
        </div>
    </div>
    <div class="question-box" id="question-box" style="display: none;">
        <h1>Attack</h1>
        <p id="question-text">Select an Attack</p>
        <div id="answers">
            <!-- Dynamically filled answers will go here -->
        </div>
    </div>
    <div id="moves" class="controller">
        <div id="attack" class="backgroundStyle" id="ChangeATK" onclick="fetchQuestion()">
            <h1>Attack</h1>
        </div>
    </div>
    <div id="moves" class="controllerSIGN">
        <div id="waitSign" class="backgroundStyle">
            <h1>Please wait until your opponent attacks</h1>
        </div>
    </div>
</div>

<div class="scroll" id="weaponMenu" style="display: none;">
    <div id="profile-container">
        <br>
        <div id="playerStats">
            <h1 class="centered">Player Stats</h1><hr/>
            <h1 id="characterHealth"></h1>
            <h1 id="characterDamage"></h1>
            <br>
            <h1>Equipped Gear</h1>
            <div id="equipped" class="flex-container">
            </div>
        </div>
        <div id="inventory">
        <div class="inventoryArmor">
            <h1>Armor</h1>
        </div>
        <br>
        <div class="inventoryWeapons">
            <h1>Weapons</h1>
        </div>
        <br>
        <!-- 
        <div class="inventoryAccessories">
            <h1>Accessories</h1>
        </div> -->
        <div id="equip-spot" ondrop="drop(event)" ondragover="allowDrop(event)">Drop Here to Equip</div>
    </div>
    </div>
</div>

<script>
var questionBox = document.getElementById("question-box");
var playerIMG = document.getElementById("pIMG");
var enemyIMG = document.getElementById("eIMG");



function fetchQuestion() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
        redirect: 'follow'
    };
    
    fetch(uri + `/api/questions/randomQuestion/CSA`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // For debugging

        document.getElementById("question-box").style = "display: block;";
        document.getElementById("question-text").innerText = result.question;

        // Clear previous answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        // Dynamically create answer buttons or text for each possible answer
        for (let i = 1; i <= 4; i++) {
            let answerDiv = document.createElement("div");
            answerDiv.innerText = result[`answer${i}`];
            answerDiv.onclick = function() { checkAnswer(i, result.correctAnswer); };
            answersDiv.appendChild(answerDiv);
        }
    })
    .catch(error => console.log('error', error));
}

function checkAnswer(selectedAnswer, correctAnswer) {

    if (selectedAnswer === correctAnswer) {
        console.log("Correct! You attack the enemy.");
        attackEnemy();
        setTimeout(function() {
            enemyIMG.classList.remove('flashing');
        }, 2000);
    } else {
        console.log("Incorrect. You lost your turn");
        updateGameTurn();
        setTimeout(function() {
            playerIMG.classList.remove('flashing');
        }, 2000);
    }

    // Call Battle to check for end-of-battle scenarios
    questionBox.style = " display: none;";
}

</script>

<script>
    let currentPlayerParameter = "";

    setInterval(updateGameInfo, 6000); // Fetch every 5 seconds (adjust interval as needed)

    // function leave() {
    //     window.location.href = "/codemaxxerFrontend/game/index.html";
    // }

    window.addEventListener('onload', characterData());

    function showPopup(message) {
    // Create a popup element with the message
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<h1>${message}</h1>`;

    // Add a close button (optional)
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => {
        popup.remove();
    });
    popup.appendChild(closeButton);

    // Style the popup (optional)
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid black";
    popup.style.borderRadius = "5px";
    popup.style.color = "black";

    // Append the popup to the body
    document.body.appendChild(popup);
    }

    function characterData() {
        fetch(uri + "/api/person/characterData", {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("playerName").innerHTML = data.name;
            document.getElementById("playerLevel").innerHTML = "Level: " + data.accountLevel;

            // Match the player in the game info request with the name
            initialDataLoad(data.name);
        })
        .catch((error) => console.error(error));
    }

    function attackEnemy() {
        const requestOptions = {
        method: "POST",
        redirect: "follow"
        };

        let name = localStorage.getItem("playerName");
        let target = localStorage.getItem("opponentName");
        let lobbyId = localStorage.getItem("lobbyId");

        fetch(connectionuri + `/api/lobby/attack?attackerName=${name}&targetName=${target}&lobbyId=${lobbyId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

        updateGameTurn();
        // window.location.reload();
    }

    function updateGameInfo() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let lobbyId = localStorage.getItem("lobbyId");
        let playerName = localStorage.getItem("playerName");
        let opponentName = localStorage.getItem("opponentName");

        fetch(connectionuri + `/api/lobby/lobbyInfo?lobbyId=${lobbyId}&type=info&player=${playerName}&target=${opponentName}&lastCurrentPlayer=${currentPlayerParameter}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

      // Check for win/lose conditions
        if (data.players[playerName].health <= 0) {
            document.getElementById("playerHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-righ: 5px;">' + 0;
            showPopup("You Lost!");
            // Redirect to desired location after a short delay (e.g., homepage)
            setTimeout(() => {
            window.location.href = "multiplayer";
            }, 20000);
            return;  // Exit the function if player lost
        } else if (data.players[opponentName].health <= 0) {
            document.getElementById("opponentHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + 0;
            showPopup("You Won!");
            // Redirect to desired location after a short delay (e.g., homepage)
            setTimeout(() => {
            window.location.href = "multiplayer";
            }, 20000);
            return;  // Exit the function if player won
        }

        const controllers = document.getElementsByClassName("controller");
            const signControllers = document.getElementsByClassName("controllerSIGN");
            if (data.currentPlayer == playerName) {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "block";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "none";
                }
            } else {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "none";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "block";
                }
            }


            // YOUR DATA DISPLAYED
            if (data.players && data.players[playerName]) {
                const playerInfo = data.players[playerName];
                document.getElementById("playerName").innerHTML = playerInfo.name;
                document.getElementById("playerHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + playerInfo.health;
            } else {
                console.log("Player not found in game info.");
            }
            // YOUR DATA DISPLAYED


            // OPPONENT DATA DISPLAYED
            let opponentData = null;
            for (const player in data.players) {
                if (player !== playerName) {
                    opponentData = data.players[player];
                    break;
                }
            }
            // Display the opponent's data if found
            if (opponentData) {
                document.getElementById("opponentName").innerHTML = "Enemy: " + opponentData.name;
                document.getElementById("opponentHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + opponentData.health;
            } else {
                console.log("Opponent not found in game info.");
            }
            // OPPONENT DATA DISPLAYED

            localStorage.setItem("playerName", playerName);
            localStorage.setItem("opponentName", opponentData.name);
    })
    .catch((error) => console.error(error));
}


    function updateGameTurn() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let lobbyId = localStorage.getItem("lobbyId");
        let playerName = localStorage.getItem("playerName");
        let opponentName = localStorage.getItem("opponentName");

        fetch(connectionuri + `/api/lobby/lobbyInfo?lobbyId=${lobbyId}&type=turn&player=${playerName}&target=${opponentName}&lastCurrentPlayer=${currentPlayerParameter}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Check for win/lose conditions
            if (data.players[playerName].health <= 0) {
                document.getElementById("playerHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + 0;
                showPopup("You Lost!");
                // Redirect to desired location after a short delay (e.g., homepage)
                setTimeout(() => {
                window.location.href = "multiplayer";
                }, 20000);
                return;  // Exit the function if player lost
            } else if (data.players[opponentName].health <= 0) {
                document.getElementById("opponentHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-left: 5px;">' + 0;
                showPopup("You Won!");
                // Redirect to desired location after a short delay (e.g., homepage)
                setTimeout(() => {
                window.location.href = "multiplayer";
                }, 20000);
                return;  // Exit the function if player won
            }

            const controllers = document.getElementsByClassName("controller");
            const signControllers = document.getElementsByClassName("controllerSIGN");
            if (data.currentPlayer == playerName) {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "block";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "none";
                }
            } else {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "none";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "block";
                }
            }


            // YOUR DATA DISPLAYED
            if (data.players && data.players[playerName]) {
                const playerInfo = data.players[playerName];
                document.getElementById("playerName").innerHTML = playerInfo.name;
                document.getElementById("playerHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px;">' + playerInfo.health;
            } else {
                console.log("Player not found in game info.");
            }
            // YOUR DATA DISPLAYED


            // OPPONENT DATA DISPLAYED
            let opponentData = null;
            for (const player in data.players) {
                if (player !== playerName) {
                    opponentData = data.players[player];
                    break;
                }
            }
            // Display the opponent's data if found
            if (opponentData) {
                document.getElementById("opponentName").innerHTML = "Enemy: " + opponentData.name;
                document.getElementById("opponentHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + opponentData.health;
            } else {
                console.log("Opponent not found in game info.");
            }
            // OPPONENT DATA DISPLAYED

            localStorage.setItem("playerName", playerName);
            localStorage.setItem("opponentName", opponentData.name);
        })
        .catch((error) => console.error(error));
    }

    function initialDataLoad(playerName) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let lobbyId = localStorage.getItem("lobbyId");
        let opponentName = localStorage.getItem("opponentName");

        fetch(connectionuri + `/api/lobby/lobbyInfo?lobbyId=${lobbyId}&type=initial&player=${playerName}&target=${opponentName}&lastCurrentPlayer=none`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            currentPlayerParameter = data.currentPlayer;
            console.log("AFTER INITIAL LOADING, CURRENT PLAYER IS " + currentPlayerParameter);

            const controllers = document.getElementsByClassName("controller");
            const signControllers = document.getElementsByClassName("controllerSIGN");
            if (data.currentPlayer == playerName) {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "block";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "none";
                }
            } else {
                for (let i = 0; i < controllers.length; i++) {
                    controllers[i].style.display = "none";
                }
                for (let i = 0; i < signControllers.length; i++) {
                    signControllers[i].style.display = "block";
                }
            }


            // YOUR DATA DISPLAYED
            if (data.players && data.players[playerName]) {
                const playerInfo = data.players[playerName];
                document.getElementById("playerName").innerHTML = playerInfo.name;
                document.getElementById("playerHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px;">' + playerInfo.health;
            } else {
                console.log("Player not found in game info.");
            }
            // YOUR DATA DISPLAYED


            // OPPONENT DATA DISPLAYED
            let opponentData = null;
            for (const player in data.players) {
                if (player !== playerName) {
                    opponentData = data.players[player];
                    break;
                }
            }
            // Display the opponent's data if found
            if (opponentData) {
                document.getElementById("opponentName").innerHTML = "Enemy: " + opponentData.name;
                document.getElementById("opponentHealth").innerHTML = '<img src="game/img/heart.png" style="width: 20px; height: auto; margin-bottom: 5px; margin-right: 5px;">' + opponentData.health;
            } else {
                console.log("Opponent not found in game info.");
            }
            // OPPONENT DATA DISPLAYED

            localStorage.setItem("playerName", playerName);
            localStorage.setItem("opponentName", opponentData.name);
        })
        .catch((error) => console.error(error));
    }


    function removeLobby() {
        const lobbyId = localStorage.getItem('lobbyId');

        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(connectionuri + `/api/lobby/removeLobby?lobbyId=${lobbyId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        localStorage.removeItem('lobbyId');
        localStorage.removeItem('playerName');
        localStorage.removeItem('opponentName');
    }

// window.addEventListener('beforeunload', function(event) {
//         removeLobby();
//     }
// );
</script>

<style>
.controllerSIGN {
    display: none;
} 
#attack {
    width: 100%;
}
#profile-container {
    position: absolute;
    right: 43vw;
    top: 10%;
    width: 550px;
    padding: 40px;
    background-color: #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: black;
    font-family: "DotGothic16", sans-serif;
    z-index: 99;
}

.controller {
    bottom: 100px;
    position: absolute;
    left: 10px;
}

#level {
    background-color: #71b9e2;
}

.health-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35vh;
    width: 15vw;
}

.topRow, .bottomRow {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

#userName {
    font-size: 1.2em;
}

#move {
    font-size: 2em;
}
</style>
