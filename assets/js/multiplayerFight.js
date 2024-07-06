var uri;
if (location.hostname === "localhost") {
    uri = "http://localhost:8032";
} else if (location.hostname === "127.0.0.1") {
    uri = "http://localhost:8032";
} else {
    uri = "https://codemaxxers.stu.nighthawkcodingsociety.com";
}


var baseHTML = `
<div class="move" id="ChangeATK" onclick="attackMENU()">
        <h1>Attack</h1>
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

function leave() {
    if (health < StartingHealth / 2) {
        alert("Running Away Failed");
    }
}


console.log(course)

// Call the function to fetch enemies when the script is loaded
// GetLevel();
// GetEnemy();

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
        console.log(result); // For debugging

        currentQuestionId = result.id;

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