---
layout: none
permalink: /password
---

<html>
<body>
    <h1 id="ID"></h1>
    <div class="container">
        <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
        <h2>Password Game</h2>
        <br>
        <button id="startBtn" class="startBtn" onclick="startGame()">Start</button>
        <div id="play_container" class="play_container" style="display:none">
            <input type="text" id="passwordInput" placeholder="Enter your password">
            <br><br>
            <button id="check_button" class="check_button" onclick="checkPassword()">Check</button>
            <ul id="requirements">
                <br>
                <li id="length">At least 8 characters</li>
                <li id="uppercase" style="display:none;">At least one uppercase letter</li>
                <li id="lowercase" style="display:none;">At least one lowercase letter</li>
                <li id="numbers" style="display:none;">At least one number</li>
                <li id="specialChars" style="display:none;">At least one special character</li>
            </ul>
            <div id="timerDisplay" style="font-size: 24px; margin: 20px;">0:00</div>
            <button id="restart_button" class="restart_button" onclick="restartGame()" style="display:none;">Restart</button>
        </div>
    </div>
    <div id="resultModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <h3>You met all the requirements, your password's:</h3>
            <p id="strengthResult">-</p>
            <p id="crackTimeResult">-</p>
        </div>
    </div>
</body>
</html>
<div id="games-played-div">
    <h1 id="gamesPlayed"></h1>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
* {
font-family: "DotGothic16", sans-serif;
box-sizing: border-box;
}

:root {
      --pastel-pink: #ffb6c1;
      --dark-pink: #ff69b4;
      --purple: #9b30ff;
      --blue: #4169e1;
      --black: #000000;
      --green: #90EE90;
      --red: #ffb6c1;
      --gray: #A9A9A9;
      --yellow: #FFD700;
      --font-family: 'Comic Sans MS', cursive, sans-serif;
    }

.startBtn,
.check_button {
    border: 2px solid black;
}
.startBtn {
    background-color: var(--pastel-pink);
}

#play_container {
    display: none;
}

h2 {
    color: rgb(218, 165, 32); /* golden yellow color!*/
}

.container {
    width: 300px;
    margin: 0 auto;
    display: flex; /* Use flexbox */
    flex-direction: column; /* Stack children vertically */
    justify-content: center; /* Center content vertically */
    height: 100vh; /* Set height to full viewport height */
}

.container input {
    width: 100%;
    margin: 0 auto;
    text-align: center; /* Center align the content */
    /* padding: 10px;
    margin-top: 10px; */
}

.container button {
    width: fit-content;
    padding: .4rem 1rem;
    font-size: 1.2rem;
    white-space: nowrap;
    background-color: var(--primary-color);
    color: var(--white);
    outline: none;
    border-radius: 10px; 
    transition: .3s;
    cursor:pointer;
}

.container button:hover {
        background-color: var(--primary-color-dark);
    }

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.backBtn:hover {
        background-color: #ddd;
    }
    .backBtn{
        border: 3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        position: absolute; left: 20px; top: 10px;
    }

.passwordInput {
    padding: 10px;
}
</style>

<script src="{{site.baseurl}}/password_game/passwordscript.js">

    const playContainer = document.getElementById("play_container");
    const startButton = document.getElementById("start_button");
    const checkButton = document.getElementById("check_button");
    const timerDisplay = document.getElementById("timerDisplay");

</script>
