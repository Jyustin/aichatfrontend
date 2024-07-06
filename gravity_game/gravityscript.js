window.onload = function () {
    fetchTerm();
};

function fetchTerm() {
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };

    fetch('http://localhost:8032/api/terms/randomTerm/csp')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const term = data.term;
        const definition = data.definition;
        console.log('Term:', term);
        console.log('Definition:', definition);
        const termAndDefinition = {
            term: term,
            definition: definition
        };
        return term;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const userInput = document.getElementById("userInput");
const inputHistory = document.getElementById("inputHistory");
const closeButton = document.getElementById("closeGModal");
const playAgainButton = document.getElementById("playAgainBtnG");

let termsAndDefinitions = [
    { term: "Firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
    { term: "Encryption", definition: "The process of converting information into a code to prevent unauthorized access." },
    { term: "Phishing", definition: "A fraudulent attempt to obtain sensitive information, such as usernames, passwords, and credit card details, by disguising as a trustworthy entity in an electronic communication." },
    { term: "Malware", definition: "Malicious software designed to harm or exploit computers, networks, and users." },
    { term: "Cybersecurity", definition: "The practice of protecting systems, networks, and programs from digital attacks, theft, and damage." },
    { term: "Zero-day Exploit", definition: "An attack that targets a previously unknown vulnerability in a computer application or operating system, exploiting it before the vendor releases a patch." },
    { term: "DOS", definition: "An attack that aims to make a machine or network resource unavailable to its intended users by overwhelming it with traffic or other forms of disruption." },
    { term: "VPN", definition: "A secure and encrypted connection established over the internet, providing a private network-like environment for communication and data exchange." },
    { term: "Two-Factor Authentication", definition: "A security process in which a user provides two different authentication factors to verify their identity, usually something they know (password) and something they have (security code from a mobile app)." },
    { term: "Social Engineering", definition: "The manipulation of individuals to divulge confidential information or perform actions that may compromise security." },
    { term: "Botnet", definition: "A network of compromised computers, controlled by a single entity or attacker, used to perform malicious activities such as sending spam or launching DDoS attacks." },
    { term: "Cryptography", definition: "The practice and study of techniques for securing communication and data from adversaries." },
    { term: "Virus", definition: "A type of malicious software that self-replicates and spreads to other computers, often causing damage to data or disrupting system functionality." },
    { term: "Patch", definition: "A piece of software designed to update or fix problems with a computer program or its supporting data." },
    { term: "IoT", definition: "A network of interconnected devices embedded with sensors, software, and network connectivity, enabling them to collect and exchange data." },
    { term: "DDoS", definition: "A type of cyber attack that disrupts the normal functioning of a network or website by overwhelming it with a flood of internet traffic from multiple sources." },
    { term: "Hashing", definition: "The process of converting input data (such as passwords) into a fixed-size string of characters, typically for secure storage or verification purposes." },
    { term: "Endpoint Security", definition: "The practice of protecting computer networks accessed by remote devices such as laptops, smartphones, and tablets." },
    { term: "Cyber Threat Intelligence", definition: "Information that provides an organization with insights into potential cyber threats, helping them make informed decisions to protect against cyber attacks." },
    { term: "Biometric Authentication", definition: "A security process that uses unique biological features (such as fingerprints or facial recognition) to verify an individual's identity." },
    { term: "Incident Response", definition: "The process of responding to and managing a cybersecurity incident, including identification, containment, eradication, recovery, and lessons learned." },
];

let rocks = [];
let score = 0;
let gamePaused = false; // Flag to control game state


function newRock() {
    const termDefinitionPair = termsAndDefinitions[Math.floor(Math.random() * termsAndDefinitions.length)];
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 100;

    do {
        newX = Math.random() * (canvas.width - 450) + 105;
        newY = 0;
        attempts++;
    } while (attempts < maxAttempts && isOverlapping(newX, newY, termDefinitionPair.definition));

    if (attempts >= maxAttempts) {
        console.error('Could not place a new rock without overlapping.');
        return;
    }

    const rock = {
        term: termDefinitionPair.term,
        definition: termDefinitionPair.definition,
        x: newX,
        y: newY,
        speed: 0.5
    };
    rocks.push(rock);
    console.log("New rock position:", newX, newY);
}

function isOverlapping(newX, newY, newText) {
    const newTextHeight = drawText(newText, newX, newY, true);
    for (const rock of rocks) {
        const existingTextHeight = drawText(rock.definition, rock.x, rock.y, true);
        const xOverlap = Math.abs(newX - rock.x) < 350;
        const yOverlap = Math.abs(newY - rock.y) < (existingTextHeight + newTextHeight);

        if (xOverlap && yOverlap) {
            return true;
        }
    }
    return false;
}

function drawText(text, x, y, measureOnly = false, width = 350, fontSize = 40) {
    ctx.font = `${fontSize}px Arial Narrow`;
    ctx.fillStyle = "black";

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

    if (measureOnly) {
        return lines.length * fontSize;
    }

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * fontSize);
    }

    return lines.length * fontSize;
}

function draw() {
    if (gamePaused) return; // Skip drawing if game is paused
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const rock of rocks) {
        drawText(rock.definition, rock.x, rock.y);
        rock.y += rock.speed;
        if (rock.y > canvas.height) {
            const index = rocks.indexOf(rock);
            rocks.splice(index, 1);
            score -= 1;
        }
    }
    drawText(`Score: ${score}`, 0, 100);
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
            inputHistory.textContent = "Input History: ";
        }
    }
}

function gameLoop() {
    if (gamePaused) return; // Skip game loop if game is paused
    newRock();
    checkInput();
    setTimeout(gameLoop, 10000);
}

function resetGame() {
    rocks = [];
    score = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    userInput.value = '';
    inputHistory.textContent = '';
    console.log("Game reset.");
}

userInput.addEventListener("input", checkInput);
canvas.addEventListener("click", () => {
    gamePaused = !gamePaused; // Toggle game pause state on canvas click
    if (!gamePaused) {
        gameLoop();
        draw();
    }
});

closeButton.addEventListener("click", () => {
    gamePaused = true; // Pause the game when close button is clicked
});

playAgainButton.addEventListener("click", () => {
    resetGame(); 
    gamePaused = false;
    gameLoop();
    draw();
});

gameLoop();
draw();







