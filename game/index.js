// Declare finishedTutorial outside of the function scope
let finishedTutorial;

var uri;
if (location.hostname === "localhost") {
    uri = "http://localhost:8032";
} else if (location.hostname === "127.0.0.1") {
    uri = "http://localhost:8032";
} else {
    uri = "https://codemaxxers.stu.nighthawkcodingsociety.com";
}


function finishTutorial() {
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow'
  };
  
  fetch(uri + "/api/person/finishedTutorial", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function openTab(event, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabs = document.querySelectorAll('.tab');

    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const selectedTabContent = document.getElementById(tabName);
    selectedTabContent.style.display = 'block';
    event.currentTarget.classList.add('active');
}

function closeQuestLog() {
    document.getElementById('questLogDialog').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const defaultTab = document.querySelector('.tab');
    if (defaultTab) {
        defaultTab.classList.add('active');
        const defaultTabContentId = defaultTab.getAttribute('onclick').split("'")[1];
        const defaultTabContent = document.getElementById(defaultTabContentId);
        if (defaultTabContent) {
            defaultTabContent.style.display = 'block';
        }
    }
});



// Function to open the quest log pop-up dialog
function openQuestLog() {
  // Get the quest log dialog box element
  const questLogDialog = document.getElementById('questLogDialog');

  // Show the quest log dialog box
  questLogDialog.style.display = 'block';

    // is player level2?
    const playerLevel = localStorage.getItem("playerLevel");
    if (playerLevel >= 2) {
      console.log("PLAYER LEVEL IS 2 OR GREATER")

      var text = document.getElementById("questTwoObjective");
      text.style.textDecoration = "line-through";

      var text = document.getElementById("questTwoTabText");
      questTwoTabText.style.textDecoration = "line-through"

      document.getElementById("questTwoClaim").style.display="block";
    }

  // QUEST ONE IS DONE
  if (localStorage.getItem("completedQuestOne") == "yes") {
    document.getElementById("questOneClaim").style.display="none";
    document.getElementById("confirmClaimTextOne").style.display="block";
  }

  if (localStorage.getItem("completedQuestOne") == "no") {
    document.getElementById("questOneClaim").style.display="block";
    document.getElementById("confirmClaimTextOne").style.display="none";
  }

  if (localStorage.getItem("completedQuestTwo") == "yes") {
    document.getElementById("questTwoClaim").style.display="none";
    document.getElementById("confirmClaimTextTwo").style.display="block";
  }
}

// Function to close the quest log pop-up dialog
function closeQuestLog() {
  // Get the quest log dialog box element
  const questLogDialog = document.getElementById('questLogDialog');

  // Hide the quest log dialog box
  questLogDialog.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function(){
  // fetch JWT token for user authentication 
  var requestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };

  fetch(uri + "/api/person/characterData", requestOptions)
    .then(response => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 401:
                        alert("Please log into or make an account");
                        window.location.href = "/codemaxxerFrontend/login";
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
      // display player info on webpage
      console.log(data.finishedTutorial)
      finishedTutorial = data.finishedTutorial; // Assign the value to the global variable
      // display player health, damage, and level on webpage
      const playerHealth = document.querySelector('#playerHealth');
      if (data.armorGearIdEquipped == 0) {
        playerHealth.innerHTML = '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/heart.png" style="width: 35px; height: auto; margin-right: 5px;">' + data.totalHealth;
      } else {
        playerHealth.innerHTML = '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/heart.png" style="width: 35px; height: auto; margin-right: 5px;">' + data.totalHealth + " - " + '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/armor/' + data.armorGearIdEquipped + '.png" style="width: 50px; height: auto;">';
      }

      const playerDamage = document.querySelector('#playerDamage');
      if (data.weaponGearIdEquipped == 0) {
        playerDamage.innerHTML = '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/sword.png" style="width: 35px; height: auto; margin-right: 5px;">' + data.totalDamage;
      } else {
        playerDamage.innerHTML = '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/sword.png" style="width: 35px; height: auto; margin-right: 5px;">' + data.totalDamage + " - " + '<img src="https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/weapons/' + data.weaponGearIdEquipped + '.png" style="width: 50px; height: auto;">';
      }

      // PLAYER LEVEL
      const playerLevel = document.querySelector('#playerLevel');
      playerLevel.innerHTML = 'Level ' + data.accountLevel;
        // SAVE AS LOCAL STROAGE FOR QUEST CHECKING
        localStorage.setItem("playerLevel", data.accountLevel);
        console.log("player level: " + localStorage.getItem("playerLevel"));
      // PLAYER LEVEL

      // QUEST LOG CHECKING IF QUEST ONE IS CLAIMED
        if (data.inventory.includes(2000)) {
            console.log("ID 2000 is in the inventory.");
            localStorage.setItem("completedQuestOne", "yes")
        } else {
            console.log("ID 2000 is not in the inventory.");
            localStorage.setItem("completedQuestOne", "no")
        }
      // QUEST LOG CHECKING IF QUEST ONE IS CLAIMED
    
      // QUEST LOG CHECKING IF QUEST TWO IS CLAIMED
      if (data.inventory.includes(1000)) {
        console.log("ID 1000 is in the inventory.");
        localStorage.setItem("completedQuestTwo", "yes")
      } else {
        console.log("ID 1000 is not in the inventory.");
        localStorage.setItem("completedQuestTwo", "no")
      }
      // QUEST LOG CHECKING IF QUEST TWO IS CLAIMED

      // PLAYER XP BAR
      const currentXP = data.accountPoints;
      const nextLevelXP = data.nextLevelXPThreshold;
      const previousLevelXP = data.previousLevelXPThreshold;

      const rightside = (nextLevelXP - previousLevelXP);
      const leftside = (currentXP - previousLevelXP)

      console.log("XP NEEDED FOR NEXT LEVEL: " + rightside)
      console.log("XP PROGRESS TOWARDS NEXT LEVEL: " + leftside)

      const xpBar = document.querySelector('#xp-bar-progress');
      const progress = (leftside / rightside) * 100; // Calculate progress percentage

      xpBar.style.width = `${progress}%`;
      // PLAYER XP BAR


      if (finishedTutorial === false) { // Corrected comparison operator
          document.querySelector('.battle').style.display = 'none';
          let dialogCounter = 0; // Initialize dialogCounter to 0

          const messages = ["Welcome to RIFT! (Press space)", "Rift is a turned based RPG game in which your coding knowledge will be tested.", "The game is simple. Progess through single player islands = get cool gear and level up.", "The more you prove you know, the stronger you'll get.", "After powering up, go fight your friends in multiplayer!", "Soon you'll be able to use w, a, s, d to move around the map."]; // Array of messages

          function displayMessage() {
              if (dialogCounter < messages.length) {
                  document.querySelector('#tutorialDialogueBox').innerHTML = messages[dialogCounter];
                  dialogCounter++;
              } else {
                  // If all messages have been displayed, you can handle it here.
                  // For example, you can reset the dialogCounter or hide the dialogue box.
                  finishTutorial();
                  document.querySelector('#tutorialDialogueBox').style.display = 'none';
                  finishedTutorial = true;
                  console.log("finishedTutorial is " + finishedTutorial);
                  document.querySelector('.battle').style.display = 'flex';
              }
          }

          // Display the first message initially
          displayMessage();

          // Listen for keypress event
          document.addEventListener('keypress', function(event) {
            // user press space to move through tutorial 
            if (event.key === ' ' && finishedTutorial === false) {
                displayMessage(); // Call function to display the next message
            }
          });

          document.querySelector('#tutorialDialogueBox').style.display = 'flex';
      }
      console.log(data);
  })
});

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// adjust canvas size to window dimensions 
canvas.width = window.innerWidth - 120;
canvas.height = 540;

//process collision maps, battle zones, and characters' positions
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

// initialize boundary objects based on collision map
const boundaries = []
const offset = {
  x: -715,
  y: -650
}

const storedXPosition = localStorage.getItem('playerPositionX');
const storedYPosition = localStorage.getItem('playerPositionY');
let resetOriginalPosition = localStorage.getItem('resetPosition');


if (resetOriginalPosition == "true") {
  console.log('YAYAYAY')
}
if (storedXPosition && storedYPosition) {
  offset.x = parseFloat(storedXPosition);
  offset.y = parseFloat(storedYPosition);
  console.log('Loaded player position from localStorage');
} else {
  console.log('No player position found in localStorage, using defaults');
}

// what is 1025!!
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

// initialize characters 
const characters = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 1026 === villager
    if (symbol === 1026) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          animate: true,
          dialogue: ['...', 'Hey mister, Answer my question to gain points!']
        })
      )
    }
    // 1031 === oldMan
    else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          dialogue: ['My bones hurt.']
        })
      )
    }

    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

// initialize background and foreground images
const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

// player sprites for diff directions
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'



// initialize player sprite 
const player = new Sprite({
  position: {
    x: (canvas.width - 192 / 4) / 2, // Centering the player horizontally
    y: (canvas.height - 68 / 2 + 100) / 2 // Centering the player vertically
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

// initialize background, foreground, and keys state
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters
]
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground
]

const battle = {
  initiated: false
}

// animation function for rendering game elements and handling user input
function animate() {
  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId)

        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()

        battle.initiated = true

        // animate overlappingDiv to indicate batle initiation
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })
        break
      }
    }
  }

  if (keys.w.pressed && lastKey === 'w' && finishedTutorial) {
    player.animate = true
    player.image = player.sprites.up

    // check collision w/character
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 }
    })

    // check collision w/boundaries
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    //update positions if not colliding 
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a' && finishedTutorial) {
    // left movement
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's' && finishedTutorial) {
   // down movement 
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd' && finishedTutorial) {
    // right movement
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}
// animate()

// if user presses space to interact with NPC 
let lastKey = ''
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          // display next dialogue message 
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    window.location.href = "/codemaxxerFrontend/fight";
    return
  }

  // player is not interacting (user uses w, a, s, d)
  switch (e.key) {
    case ' ':
      if (!player.interactionAsset) return

      // beginning the conversation
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.isInteracting = true
      break
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

// checks which key was released and updates corresponding property in keys object
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

// flag to track whether user has clicked 
let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})

function savePlayerPosition() {
  localStorage.clear();
  localStorage.setItem('playerPositionX', background.position.x);
  localStorage.setItem('playerPositionY', background.position.y);
}

window.addEventListener('unload', savePlayerPosition);


function savePlayerPositionToBackend(x, y) {
  const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify({
      playerPositionX: x,
      playerPositionY: y
    })
  };

  fetch(uri + "/api/savePlayerPosition", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save player position');
      }
      console.log('Player position saved successfully');
    })
    .catch(error => {
      console.error('Error saving player position:', error);
    });
}


savePlayerPositionToBackend(localStorage.getItem('playerPositionX'), localStorage.getItem('playerPositionY'));