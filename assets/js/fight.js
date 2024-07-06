var uri;
if (location.hostname === "localhost") {
    uri = "http://localhost:8032";
} else if (location.hostname === "127.0.0.1") {
    uri = "http://localhost:8032";
} else {
    uri = "https://codemaxxers.stu.nighthawkcodingsociety.com";
}

// Define a global array to store enemy IDs
let enemyIds = []; 
// Div updates
var updateHealthEnemy = document.getElementById("EnemyHealth");
var questionBox = document.getElementById("question-box");
var updateHealth = document.getElementById("health");
var levelUpdate = document.getElementById("level");
var enemyIMG = document.getElementById("eIMG");
var playerIMG = document.getElementById("pIMG");
var controller = document.getElementById("moves");
var alert = document.getElementById("alert");
var alertBox = document.getElementById("home-btn");
var weaponMenu = document.getElementById("weaponMenu");
var enemyName = document.getElementById("EnemyName");
var updateHealth = document.getElementById("health");
var updateDamage = document.getElementById("damage");
var username = document.getElementById("userName");

var eHealth = 40;
var eAttack = 0;
var eDefense = 0;
var eName = "";
let userLevel = 1;
let totalPoints = 0;

let health = 100;
let damage = 100;
let weapon = "";
let course = "CSA";

GetLevel();
getDamage();

var baseHTML = `
<div class="move" id="ChangeATK" onclick="attackMENU()">
        <h1>Attack</h1>
    </div>
    <div class="move" id="ChangePT" onclick="potionMENU()">
        <h1>Potions</h1>
    </div>
    <div class="move" id="ChangeInv" onclick="inventoryMENU()">
        <h1>Inventory</h1>
    </div>
    <div class="move" id="run" onclick="leave()">
        <h1>Run Away</h1>
    </div>
`;

var ATKmove = `
    <div class="move" id="move1">
        <h1 id ="weaponName">Attack: <span id="weaponNameValue"></span></h1>
        <p id="damage"><b></b></p>
    </div>
    <div class="move" id="back">
        <h1>Back</h1>
    </div>
`;

var comingsoon = `
    <div class="move" id="back">
        <h1>Back</h1>
    </div>
`;

var hint = `
   <h1 id="hint-text"></h1>
`

document.getElementById("alert").addEventListener("click", function() {
    window.location.pathname = '/codemaxxerFrontend/game/index.html'
});

function inventoryMENU() {
    controller.innerHTML = comingsoon;
    weaponMenu.style.display = "block";
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
        weaponMenu.style.display = "none";
    });
}
function potionMENU() {
    controller.innerHTML = comingsoon;
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
    });
}

function attackMENU() {
    controller.innerHTML = ATKmove;
    getDamage();
    getWeapon(); // Call this function to update weapon name

    var moveDamage = document.getElementById("damage");
    moveDamage.innerHTML = `<b>Damage: ${damage}</b>`;

    document.getElementById("move1").addEventListener("click", function() {
        Battle(damage);
    });
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
    });
}

console.log(course)

// Call the function to fetch enemies when the script is loaded
GetLevel();
GetEnemy();

function fetchQuestion(attackValue) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // clear hint
    const hintText = document.getElementById("hint-text");
    hintText.innerHTML = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
        redirect: 'follow'
    };
    
    fetch(uri + `/api/questions/randomQuestion/${course}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // For debugging!
        
        console.log(result.hint); 
        currentQuestionHint = result.hint;

        // Update the question text
        document.getElementById("question-text").innerText = result.question;

        // Clear previous answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";
        totalPoints = totalPoints + result.points;

        // Dynamically create answer buttons or text for each possible answer
        for (let i = 1; i <= 4; i++) {
            let answerDiv = document.createElement("div");
            answerDiv.innerText = result[`answer${i}`];
            answerDiv.onclick = function() { checkAnswer(i, result.correctAnswer, attackValue); };
            answersDiv.appendChild(answerDiv);
        }
    })
    .catch(error => console.log('error', error));
}

function checkAnswer(selectedAnswer, correctAnswer, attackValue) {
    // Increment total points regardless of the answer
    totalPoints += attackValue;

    if (selectedAnswer === correctAnswer) {
        console.log("Correct! You attack the enemy.");
        eHealth -= attackValue;
        updateHealthEnemy.innerHTML = `Health: ${eHealth}`;
        // When an image gets hurt, you can add the flashing class to it
        enemyIMG.classList.add('flashing');

        // After a certain duration, remove the flashing class to stop the flashing effect
        setTimeout(function() {
            enemyIMG.classList.remove('flashing');
        }, 2000);
    } else {
        console.log("Incorrect. The enemy attacks you!");
        health -= eAttack;
        updateHealth.innerHTML = `Health: ${health}`;
        // When an image gets hurt, you can add the flashing class to it
        playerIMG.classList.add('flashing');

        // After a certain duration, remove the flashing class to stop the flashing effect
        setTimeout(function() {
            playerIMG.classList.remove('flashing');
        }, 2000);
    }

    // Call Battle to check for end-of-battle scenarios
    questionBox.style = " display: none;";
    controller.innerHTML = baseHTML;

    if (health <= 0) {
        alert.style = "";
        playerIMG.classList = "death";
        alertBox.innerHTML = "<b>You Lost</b><p>Go back to island</p>";
    } else if (eHealth < 1) {
        updateHealthEnemy.innerHTML = `Health: Defeated`;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };
        //Adding points to the account
        fetch(uri + `/api/person/addPoints${course}?points=${totalPoints}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //Re-direct to island
        alert.style = "";
        enemyIMG.classList = "death";
        alertBox.innerHTML = "<b>You Won</b><p>Go back to island</p>";
        return;
    }
}

function leave() {
    if (health < StartingHealth / 2) {
        alert("Running Away Failed");
    }
}

function GetEnemy() {
    console.log(userLevel);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',  // Include this line for cross-origin requests with credentials
        redirect: 'follow'
    };

    fetch(uri + "/api/enemies", requestOptions)
    .then(response => response.json()) // Convert response to JSON format
    .then(result => {
        console.log(result); // Log the result for debugging purposes

        // Filter enemies based on user's level or lower
        let filteredEnemies = result.filter(enemy => parseInt(enemy.level) <= parseInt(userLevel));

        if (filteredEnemies.length > 0) {
            // Loop through filtered enemies to populate enemyIds array and update enemy health
            filteredEnemies.forEach(enemy => {
                enemyIds.push(enemy.id); // Add enemy ID to the array
            });

            // Get a random enemy ID from the enemyIds array
            let randomEnemyIndex = Math.floor(Math.random() * filteredEnemies.length);

            // Get the random enemy object
            let randomEnemy = filteredEnemies[randomEnemyIndex];

            // Updating Values depending on the fetched enemy
            eHealth = randomEnemy.health;
            eAttack = randomEnemy.attack;
            eDefense = randomEnemy.defense;
            eName = randomEnemy.name;
            enemyName.innerHTML = `Enemy: ${eName}`;

            //Update Img
            enemyIMG.src = enemyIMG.src + `${eName}.png`
            setTimeout(function() {
                enemyIMG.classList.add('visible');
            }, 100);

            updateHealthEnemy.innerHTML = `Health: ${eHealth}`;

        } else {
            console.log("No enemies found at or below user's level.");
        }
    })
    .catch(error => console.log('error', error));
}

function Battle(attack) {
    questionBox.style = "";
    fetchQuestion(attack); // Call fetchQuestion with the attack value
    // Check if the player or enemy has been defeated
    if (health <= 0) {
        alert.style = "";
        playerIMG.classList = "death";
        alertBox.innerHTML = "<b>You Lost</b><p>Go back to island</p>";
    } else if (eHealth < 1) {
        updateHealthEnemy.innerHTML = `Enemy: Defeated`;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };
        //Adding points to the account
        fetch(uri + `/api/person/addPointsCSA?points=${totalPoints}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //Re-direct to island
        alert.style = "";
        enemyIMG.classList = "death";
        alertBox.innerHTML = "<b>You Won</b><p>Go back to island</p>";
        return;
    }
}

function GetLevel() {
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };

fetch(uri + "/api/person/jwt", requestOptions)
    .then(response => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 401:
                        alert("Please log into or make an account");
                        // window.location.href = "login";
                        break;
                    case 403:
                        alert("Access forbidden. You do not have permission to access this resource.");
                        break;
                    case 404:
                        alert("User not found. Please check your credentials.");
                        break;
                    // Add more cases for other status codes as needed
                    default:
                        alert("Login failed. Please try again later.");
                }

                return Promise.reject('Login failed');
            }
            return response.json();
            // Success!!!
        })
    .then(data => {
        userLevel = data.accountLevel; // Set the innerHTML to just the numeric value
        username.innerHTML = data.name;
        levelUpdate.innerHTML =  "Lv. " + userLevel;
        console.log(data.accountLevel);

        health = data.totalHealth;
        updateHealth.innerHTML = `Health: ${data.totalHealth}`;

        // updateDamage.innerHTML = '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/sword.png" style="width: 20px; height: auto; margin-right: 5px;">' + data.totalDamage;
        // console.log(data.totalDamage);
        // damage = data.totalDamage;
        console.log(userLevel);
        return userLevel;
    })
    .catch(error => console.log('error', error));
}

function getDamage() {
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };
    
    fetch(uri + "/api/person/jwt", requestOptions)
        .then(response => response.json()) // Convert response to JSON format
        .then(data => {
            damage = data.totalDamage;
            console.log("Fetched damage:", damage); // For debugging
            // If the element needs to be updated immediately after fetching
            updateDamage.innerHTML = `<b>Damage: ${damage}</b>`;
        })
        .catch(error => console.log('error', error));
}

function getWeapon() {
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };

    fetch(uri + "/api/person/getWeaponInventory", requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 401:
                        alert("Please log into or make an account");
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
            if (data.weaponGearIdEquipped == null || data.weaponGearIdEquipped == 0) {
                return;
            }
            fetchWeaponStats(data.weaponGearIdEquipped[0])
                .then(weapon => {
                    var weaponNameElement = document.getElementById("weaponNameValue");
                    weapon = weapon.name;
                    weaponNameElement.innerHTML = `<b>${weapon}</b>`;
                    var moveDamage = document.getElementById("damage");
                    moveDamage.innerHTML = `<b>Damage: ${weapon.damageAdded}</b>`;
                    damage = weapon.damageAdded;
                })
                .catch(error => {
                    console.log('error', error);
                });
        })
        .catch(error => console.log('error', error));
}

function fetchWeaponStats(weaponID) {
    return fetch('gear.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weapon stats');
            }
            return response.json();
        })
        .then(data => {
            const weaponStats = data.items.find(item => item.gearID === weaponID);
            if (!weaponStats) {
                throw new Error('Weapon stats not found');
            }
            return weaponStats;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials: "include"
    };

    fetch(uri + "/api/person/getWeaponInventory", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});

let numKeys = 1;

function removeKey() {
    document.getElementById("keyPopup").style.display = "block";

    if(keyNumber > 0){
        const myHeaders = new Headers();

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            credentials: 'include'
        };
        //Adding points to the account
        fetch(uri + `/api/person/removeKey?numKeys=${numKeys}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('key removed failed', error));
        return;
    }
}

function closeKeyPopup() {
    document.getElementById("keyPopup").style.display = "none";
}

let currentQuestionHint = null;

function useHint(){
    document.getElementById("keyPopup").style.display = "none";
    removeKey();
    var hintMenu = document.getElementById('hint-box');
    hintMenu.innerHTML = hint;

    document.getElementById("hint-text").innerText = currentQuestionHint;
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     credentials: 'include',
    //     redirect: 'follow'
    // };
    
    // fetch(uri + `/api/questions/QuestionById/${currentQuestionId}`, requestOptions)
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result); // debugging
    //     // update hint text
    //     console.log(result.hint);
    //     document.getElementById("hint-text").innerText = result.hint;

    // })
    // .catch(error => console.log('error', error));
}

function useSkip(){
    document.getElementById("keyPopup").style.display = "none";
    removeKey();

    fetchQuestion(damage);
    console.log("question skipped");
}

function useDmg(){
    document.getElementById("keyPopup").style.display = "none";
    removeKey();

    damage += 10;
    console.log("Damage +10, current damage: " + damage);
    
    updateDamage.innerHTML = `<b>Damage: ${damage}</b>`;
}
