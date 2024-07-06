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
        color: black;
    }
    h1 {
        color: black;
    }
    .lobby-list {
        margin-top: 40%;
        width: 700px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: scroll;
        max-height: 72vh;
        scale: 1.5;
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
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input[type="number"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    input[type="submit"] {
        padding: 8px 16px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    input[type="submit"]:hover {
        background-color: #218838;
    }
    #blackText {
        color: black;
    }
    #playerImage {
        width: 100px;
        height: auto;
    }
    .playerInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        align-items: center;
    }
    .playerStats {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .playerStats h2 {
        margin: 0;
    }
    .equippedItems {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .equippedItems img {
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
</style>

<div class="fadeAnimation">
    <a href="multiplayer"><i class="bx bx-arrow-back" id="backIcon"></i></a>
    <div class="lobby-list">
        <h1>Confirm Your Character</h1>
        <div class="playerInfo">
            <h2 id="playerName"></h2>
            <img id="playerImage" src="game/img/player.png">
            <div class="playerStats">
                <img src="game/img/heart.png" style="width: 35px; height: 35px; margin-bottom: 5px;">
                <h2 id="playerHealth"></h2>
                <img src="game/img/sword.png" style="width: 35px; height: 35px; margin-bottom: 5px;">
                <h2 id="playerDamage"></h2>
            </div>
            <div class="equippedItems">
                <img id="equippedArmor">
                <img id="equippedWeapon">
            </div>
        </div>
        <form id="create-lobby-form">
            <input type="submit" value="Create & Join Lobby">
        </form>
    </div>
</div>

<script>
window.onload = function() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(uri + "/api/person/characterData", requestOptions)
        .then(response => {
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
        .then(data => {
            document.getElementById('playerName').textContent = data.name;
            document.getElementById('playerHealth').textContent = data.totalHealth;
            document.getElementById('playerDamage').textContent = data.totalDamage;
            if (data.armorGearIdEquipped == 0) {
                document.getElementById('equippedArmor').style.display = "none";
            } else {
                document.getElementById('equippedArmor').src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/armor/" + data.armorGearIdEquipped + ".png";
            }
            if (data.weaponGearIdEquipped == 0) {
                document.getElementById('equippedWeapon').style.display = "none";
            } else {
                document.getElementById('equippedWeapon').src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/weapons/" + data.weaponGearIdEquipped + ".png";
            }
        })
        .catch(error => console.log('error', error));
}

document.getElementById('create-lobby-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    fetch(connectionuri + `/api/lobby/createLobby`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            let lobbyId = result.match(/\d+/)[0];
            joinLobby(lobbyId);
        })
        .catch(error => console.error(error));
});

function joinLobby(lobbyId) {
    localStorage.setItem('lobbyId', lobbyId);
    let name = document.getElementById('playerName').textContent;
    let dmg = document.getElementById('playerDamage').textContent;
    let health = document.getElementById('playerHealth').textContent;
    console.log(lobbyId, name, dmg, health);

    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    fetch(`${connectionuri}/api/lobby/registerAndJoin?lobbyId=${lobbyId}&playerName=${name}&attack=${dmg}&health=${health}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);

            const lobbyList = document.querySelector('.lobby-list');
            lobbyList.innerHTML = '';

            const lobbyCreatedMsg = document.createElement('h1');
            lobbyCreatedMsg.textContent = "Lobby " + lobbyId + " created and joined";
            lobbyList.appendChild(lobbyCreatedMsg);

            const timerMsg = document.createElement('p');
            timerMsg.textContent = "You will be redirected when the opposing player joins the lobby.";
            lobbyList.appendChild(timerMsg);

            startPolling(lobbyId);
        })
        .catch(error => console.error(error));
}

let pollInterval;
let pollTimeout;
let isLobbyFull = false; // Global flag to track lobby status

function checkLobbyStatus(lobbyId) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${connectionuri}/api/lobby/checkIfLobbyIsFull?lobbyId=${lobbyId}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error);
                });
            }
            return response.json();
        })
        .then(result => {
            if (result.isFull) {
                console.log("Lobby is full!");
                isLobbyFull = true; // Set the flag to true when lobby is full
                clearInterval(pollInterval);
                clearTimeout(pollTimeout);
                window.location.href = "multiplayerLobby";
            } else {
                console.log("Lobby is not full, continuing to poll...");
            }
        })
        .catch(error => console.error(error));
}

function startPolling(lobbyId) {
    pollInterval = setInterval(() => {
        checkLobbyStatus(lobbyId);
    }, 5000);

    pollTimeout = setTimeout(() => {
        clearInterval(pollInterval);
        console.log("Stopped polling after 3 minutes.");
        alert("Max time of 3 minutes reached. Please try again later.");
        removeLobby();
        window.location.href = "multiplayer";
    }, 3 * 60 * 1000);
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
}

window.addEventListener('beforeunload', function(event) {
    if (!isLobbyFull) { // Check if the lobby is not full before removing it
        event.preventDefault();
        removeLobby();
        clearInterval(pollInterval);
        clearTimeout(pollTimeout);
    }
});

</script>
