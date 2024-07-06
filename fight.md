---
toc: true
comments: true
layout: battle
title: fight everything
author: Finn C
permalink: /fight
---


<div>
    <div class="alert" id="alert" style="display: none;">
        <div id="home-btn" class="move">
            Go back to homepage
        </div>
    </div>
    <div class="health-box">
        <div class="topRow">
            <div class="move" id="userName">name</div>
            <div class="move" id="level">Player Level</div>
        </div>
        <div class="bottomRow">
            <!-- <div class="move" id="damage">Damage</div> -->
            <div class="move" id="health">Health</div>
        </div>
    </div>
    <div class="health-box" style="margin-left: 65vw; margin-right: 10vw;margin-top: 25vh;">
        <div class="move" id="EnemyName">Enemy: </div>
        <div class="move" id="EnemyHealth">Enemy Health: </div>
    </div>
    <div class="fight-container">
        <div class="player-box">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box">
            <img id="eIMG" class="fade-in" src="{{site.baseurl}}/images/">
        </div>
    </div>
    <div class="question-box" id="question-box" style="display: none;">
        <h1>Attack</h1>
        <p id="question-text">Select an Attack</p>
        <div id="answers">
            <!-- Dynamically filled answers will go here! -->
        </div>
        <div id="hint-box">
            <h1 id="hint-text"></h1>
        </div>
    </div>
    <div id="moves" class="controller">
        <div class="move" class="backgroundStyle" id="ChangeATK" onclick="attackMENU()">
            <h1>Attack</h1>
        </div>
        <div class="move" class="backgroundStyle" id="ChangePT" onclick="potionMENU()">
            <h1>Potions</h1>
        </div>
        <div class="move" class="backgroundStyle" id="ChangeInv" onclick="inventoryMENU()">
            <h1>Inventory</h1>
        </div>
        <div class="move" class="backgroundStyle" id="run" onclick="leave()">
            <h1>Run Away</h1>
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

<div id="key-div" class="key-box">
    <div>
        <h1>Keys:</h1>
        <h1 id="key_num" class="hidden"></h1>
        <div id="keys"></div>
    </div>
    <button class="key-btn" onclick="useKey()"> Use Key</button>
</div>

<div id="keyPopup" class="hidden">
    <div class="keyPopup-box">
        <button class="close-btn" onclick="closeKeyPopup()">X</button>
        <h2>Power-up Options</h2>
        <p>Earn keys by playing cyber games in the cyber house!</p>
        <p>Use a key for one of the following power-ups:</p>
        <div class="keyPopup-options">
            <div class="option">
                    <button onclick="useHint()">Hint</button>
                    <img src="images/keyHint.png" alt="Hint">
                </div>
                <div class="option">
                    <button onclick="useSkip()">Skip</button>
                    <img src="images/keySkip.png" alt="Skip">
                </div>
                <div class="option">
                    <button onclick="useDmg()">+10 Damage</button>
                    <img src="images/keyDmg.png" alt="+10 Damage">
                </div>
        </div>
    </div>
</div>

<script src="{{site.baseurl}}/assets/js/fight.js"></script>

<script src="{{site.baseurl}}/assets/js/character.js"></script>

<script>
    function leave() {
        window.location.href = "/codemaxxerFrontend/game/index.html";
    }
</script>

<style>
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

.key-box {
    position: absolute;
        top: 7%;
        left: 3%;
    width: 250px;
    padding: 40px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: black;
    font-family: "DotGothic16", sans-serif;
    z-index: 99;
}

.hidden {
    display: none;
}

.controller {
    bottom: 100px;
    position: absolute;
    left: 10px;
}

#level {
    background-color: #71b9e2;
}

.key-btn {
    background-color: #71b9e2;
    z-index: 99999;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
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

.keyPopup-box {
    position: absolute;
        top: 0%;
        left: 27%;
    width: 900px;
    height: 400px;
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    border-radius: 10px;
}

.keyPopup-box h2 {
    font-size: 32px;
    font-family: "DotGothic16", sans-serif;
}

.keyPopup-box p {
    font-size: 24px;
}

.keyPopup-options {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.option {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.keyPopup-options button {
    background-color: #71b9e2;
    z-index: 99999;
    border: none;
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: "DotGothic16", sans-serif;
}

.keyPopup-options img {
    width: 120px;
    height: 120px;
}

.close-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 50%;
    font-size: 20px;
    font-family: "DotGothic16", sans-serif;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
</style>
