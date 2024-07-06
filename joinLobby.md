---
layout: menulayout
search_exclude: true
---

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap">
<script src="uri.js"></script>
<script src="connectionURI.js"></script>

<style>
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .fadeAnimation {
        animation: fade-in 0.5s;
    }
    #backIcon {
        position: absolute;
        top: 40px;
        left: 40px;
        color: white;
        font-size: 5em;
        transition: all .3s ease-in-out;
    }
    body {
        font-family: 'Noto Sans Mono', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0;
    }
    .lobby-list {
        margin-top: 20%;
        width: 700px; /* Change the width percentage or use an absolute width */
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: scroll; /* Change from 'auto' to 'scroll' */
        max-height: 72vh; /* Set a maximum height to trigger scrolling */
        margin-left: 5%; /* Adjust margin if needed */
    }
    .lobby-item {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .lobby-item button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .lobby-item button:hover {
        background-color: #0056b3;
    }
</style>

<div class="fadeAnimation">
    <a href="multiplayer"><i class="bx bx-arrow-back" id="backIcon"></i></a>
    <div class="lobby-list">
        <h2>Available Lobbies</h2>
        <div id="lobbyContainer"></div>
    </div>
</div>

<script>
    let playerName, playerDmg, playerHealth;

    fetch(connectionuri + "/api/lobby/availableLobbies", {
            method: "GET",
            redirect: "follow"
        })
        .then((response) => response.json())
        .then((data) => {
            const lobbyContainer = document.getElementById("lobbyContainer");
            Object.keys(data).forEach((lobbyId) => {
                const lobbyData = data[lobbyId];
                const lobbyItem = document.createElement("div");
                lobbyItem.classList.add("lobby-item");
                lobbyItem.style.color = "black"; // Set text color to black

                let playersText = "Empty Lobby"; // Default text for no players
                const players = Object.keys(lobbyData.players);
                if (players.length > 0) {
                    playersText = "In Lobby: " + players.join(", ");

                    // Add health and damage only if there's a player in the lobby
                    const player = lobbyData.players[players[0]];
                    lobbyItem.innerHTML = `
                        <div># ${lobbyData.id}</div>
                        <div>${playersText}</div>
                        <div>Health: <img src="game/img/heart.png" style="width: 20px; height: auto;"> ${player.health}</div>
                        <div>Damage: <img src="game/img/sword.png" style="width: 20px; height: auto;"> ${player.attack}</div>
                        <button onclick="joinLobby('${lobbyData.id}')">Join</button>
                    `;
                } else {
                    // No players in the lobby, display default text
                    lobbyItem.innerHTML = `
                        <div># ${lobbyData.id}</div>
                        <div>${playersText}</div>
                        <button onclick="joinLobby('${lobbyData.id}')">Join</button>
                    `;
                }

                lobbyContainer.appendChild(lobbyItem);
            });
        })
        .catch((error) => console.error(error));

    fetch(uri + "/api/person/characterData", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include'
    })
        .then((response) => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 401:
                        alert("Please log into or make an account");
                        window.location.href = "login";
                        break;
                    case 403:
                        alert("Access forbidden. You do not have permission to access this resource.");
                        break;
                    case 404:
                        alert("User not found. Please check your credentials.");
                        break;
                    default:
                        alert("Login failed. Please try again later.");
                }

                return Promise.reject('Login failed');
            }
            return response.json();
        })
        .then((data) => {
            // Store the character data in variables
            playerName = data.name;
            playerDmg = data.totalDamage;
            playerHealth = data.totalHealth;

            // Optionally log data for debugging purposes
            console.log(playerName, playerDmg, playerHealth);
        })
        .catch((error) => {
            // Handle any errors that occur during fetch or parsing
            console.error("Error fetching character data:", error);
        });

    function joinLobby(lobbyId) {
        // Log the lobbyId and player data for debugging purposes
        console.log(lobbyId, playerName, playerDmg, playerHealth);
        localStorage.setItem("lobbyId", lobbyId);

        fetch(`${connectionuri}/api/lobby/registerAndJoin?lobbyId=${lobbyId}&playerName=${playerName}&attack=${playerDmg}&health=${playerHealth}`, {
            method: "POST",
            redirect: "follow"
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
            })
            .catch(error => console.error(error));
        location.href = "multiplayerLobby";
    }
</script>
