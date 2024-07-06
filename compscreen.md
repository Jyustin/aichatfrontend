---
layout: none
title: Computer Screen Close Up 
author: Emma
permalink: /compscreen
---

<body>
<img class = "screen_img" src="{{site.baseurl}}/images/blankScreenWide.png">
<div class="container"> 
    <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
    <div class="inside-container">
        <a id="gravityBtn" href="{{site.baseurl}}/gravity"> <img class="gravityBtn"></a>
    </div>
    <div class="inside-container">
        <a id="phishingBtn" href="#"> <img class="phishingBtn"></a>
    </div>
    <div class="inside-container">
        <a id="passwordBtn" href="#"> <img class="passwordBtn"></a>
    </div>
</div>

<!-- gravity game modal -->
<div class="g-modal" id="g-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="gravity_game/gravitystyle.css">
        <body>
            <button class ="closeGBtn" id="closeGModal"> Close </button>
            <button class="playAgainBtnG" id="playAgainBtnG">Reset</button>
            <div id="gameCanvasContainer">
                <canvas id="gameCanvas" width="900" height="900"></canvas>
            </div>
            <div id="typingBar">
                <input type="text" id="userInput" placeholder="Type the definition">
                <div id="inputHistory"></div>
            </div>
            <script src="gravity_game/gravityscript.js"></script>
        </body>
    </div>
</div>

<!-- phishing game modal -->
<div class="phish-modal" id="phish-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="phishing_game/phishingstyle.css">
        <body>
            <button class="closePhishBtn" id="closePhishModal">Close</button>
            <button class="playAgainBtnP" id="playAgainBtnP">Reset</button>
            <canvas id="gameCanvas" width="1200" height="900"></canvas>
            <div id="game-container">
                <h1>Email Phishing Game</h1>
                <button id="startPhish" class="startPhish" onclick="startPhish()">Start</button>
                <div id="phishing-container">
                    <p id="email-text" style="position: relative; bottom: 340px;"></p>
                    <button class="legitBtn">Legitimate Email</button>
                    <button class="phishingButton">Phishing Email</button>
                    <p id="result"></p>
                </div>
            </div>
            <script src="phishing_game/phishingscript.js"></script>
        </body>
    </div>
</div>

<!-- password game modal -->
<div class="pass-modal" id="pass-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="password_game/passwordstyle.css">
        <body>
            <div class="container">
                <h2>Password Game</h2>
                <br>
                <button id="start_button" class="select_button" onclick="startGame()">Start</button>
                <div id="play_container" class="play_container" style="display:none">
                    <input type="text" id="passwordInput" placeholder="Enter your password">
                    <br><br>
                    <button id="check_button" class="check_button" onclick="checkPassword()">Check</button>
                    <ul id="requirements">
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
            <script src="password_game/passwordscript.js"></script>
        </body>
        <button class ="closePassBtn" id="closePassModal"> Close </button>
    </div>
</div>
</body>

<script>
    var backBtn = document.getElementById("back-btn");
    function goBack() {
        window.location.href = '{{site.baseurl}}/insidehouse';
    }

    const gravityBtn = document.getElementById('gravityBtn');
    const phishingBtn = document.getElementById('phishingBtn');
    const passwordBtn = document.getElementById('passwordBtn');

    const closeGBtn = document.getElementById('closeGModal');
    const gmodal = document.getElementById('g-modal');

    const closePhishBtn = document.getElementById('closePhishModal');
    const phishmodal = document.getElementById('phish-modal');

    const closePassBtn = document.getElementById('closePassModal');
    const passmodal = document.getElementById('pass-modal');

    //gravity popup
    gravityBtn.addEventListener("click", () => {
        gmodal.classList.add("open");
    });

    closeGBtn.addEventListener("click", () => {
        gmodal.classList.remove("open");
    });

    //phishing game popup
    phishingBtn.addEventListener("click", () => {
        phishmodal.classList.add("open");
    });

    closePhishBtn.addEventListener("click", () => {
        phishmodal.classList.remove("open");
    });

    //password game popup
    passwordBtn.addEventListener("click", () => {
        passmodal.classList.add("open");
    });

    closePassBtn.addEventListener("click", () => {
        passmodal.classList.remove("open");
    });

function startPhish() {
    document.getElementById("phishing-container").style = "display:block;";
    document.getElementById("startPhish").style = "display:none;";
}

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .legitBtn {
        background-color: green; 
        font-size: 23px;
        border-radius: 10px;
        position: absolute; bottom: 190px; left: 650px;
    }

    .phishingButton {
        background-color: red; 
        font-size: 23px;
        border-radius: 10px;
        position: absolute; bottom: 190px; right: 650px;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .backBtn:hover {
        background-color: #ddd;
    }

    .backBtn{
        border: 3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        position: absolute; left: 20px; top: 20px;
    }

    body {
        /*
        background-image: url("{{site.baseurl}}/images/blankScreenWide.png");*/
        background-image: url("https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/pb2.jpeg");
        background-repeat: repeat;
        background-size: auto;
        background-position: center; /* optional, to center the image */
        height: 25vh;
        margin-bottom: 30px;
        background-size: 300px;
    }

    /* pop up change positioning*/
    .g-modal, .pass-modal, .phish-modal {
        background-color: none;
        opacity: 0;
        position: fixed;
        top:0px;
        left: 55px;
        right: 0;
        bottom: 250px;
        transition: all 0.3s ease-in-out;
        z-index: -1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .g-modal.open {
        opacity: 1;
        z-index: 999;
    }

    .screen_img {
        border: 5px solid black;
        width: 1550;
        position: absolute;
            top: 10%;
            left: 9%;
    }

    .pass-modal.open {
        opacity: 1;
        z-index: 999;
    }

    .phish-modal.open {
        opacity: 1;
        z-index: 999;
    }

    /* pop up change size*/
    .modal-inner {
        background-color: white;
        border-radius: 2px;
        padding: 40px 25px;
        text-align: center;
        width: 1002px;
        height: 521px;
    }

    #popup-window {
        position: fixed;
        width: 70%;
        height: 70%;
        background: white;
        border: 1px solid black;
        padding: 10px;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: none;
    }  

    /* the invisible button*/
    .gravityBtn {
        width: 135px;
        height: 135px;
        position: absolute; left: 31%; top:190%; 
    }

    .phishingBtn {
        width: 175px;
        height: 120px;
        position: absolute; left: 47%; top:190%; 
    }

    .passwordBtn {
        width: 140px;
        height: 180px;
        position: absolute; left: 65.7%; top:170%; 
    }
    
    h1 {
        position: absolute; top: 120px; left: 35%;
        text-align: center;
        font-size: 60px;
        color: black; 
    }

    h2, h3, p {
        color: black;
    }

    .closeGBtn, .closePassBtn, .closePhishBtn{
        position: absolute;
            top: 140px;
            left: 75%;
    }

    .playAgainBtnG {
        position: absolute;
            top: 140px;
            left: 72%;
    }

    .playAgainBtnP {
        position: absolute;
            top: 140px;
            left: 72%;
    }

    .restart_button  {
        position: absolute;
            top: 140px;
            left: 69%;
    }

    #phishing-container {
        display: none;
    }
</style>

