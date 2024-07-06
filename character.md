---
layout: profile
search_exclude: true
--- 

<script src="uri.js"></script>

<div class="scroll">
    <div id="profile-container">
        <img id="playerImage" src="game/img/player.png">
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

<style>
    .scroll {
        overflow-y: auto; /* Enable vertical scrollbar if content overflows */
    }

    .page-content {
        margin-left: 270px;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
    }

    .equipped-slot {
        margin-right: 20px;
    }

    #profile-container, #equip-spot {
        display: flex;
        align-items: flex-start; /* Align items to the top */
        margin: 50px auto;
        padding: 20px;
        max-width: 800px; /* Adjust as needed */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        animation: fade-in 1s ease-in-out; /* Apply fade-in animation */
    }

    #inventory {
        align-items: flex-start; /* Align items to the top */
        margin: 50px auto;
        padding: 20px;
        max-width: 800px; /* Adjust as needed */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        animation: fade-in 1s ease-in-out; /* Apply fade-in animation */

    }

    #equipped {
        display: flex;
        align-items: flex-start; /* Align items to the left */
        margin-right: 20px;
    }

    #playerImage {
        width: 40%;
        height: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-right: 20px;
    }

    #characterHealth,
    #characterDamage {
        color: white;
        margin-left: 0% !important;
    }

    #equip-spot {
        width: 200px;
        border: 2px dashed #ccc;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    .item-stats {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        position: absolute;
        padding: 5px;
        border-radius: 5px;
        z-index: 1; /* Ensure it's on top of other elements */
    }

    #equippedArmor {
        width: 80px;
        height: auto;
        margin-right: 10px;
    }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>

<script>
    window.onload = function() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            credentials: "include"
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
                var characterHealthElement = document.getElementById('characterHealth');
                characterHealthElement.innerHTML = '<img src="game/img/heart.png" style="width: 35px; height: auto; margin-bottom: 5px;">' + " " + (parseInt(data.statsArray[0][0]) + parseInt(data.statsArray[0][1]));
                
                var characterDamageElement = document.getElementById('characterDamage');
                characterDamageElement.innerHTML = '<img src="game/img/sword.png" style="width: 35px; height: auto; margin-bottom: 5px;">' + " " + (parseInt(data.statsArray[1][0]) + parseInt(data.statsArray[1][1]));

                // DISPLAY INVENTORY
                var inventoryDiv = document.getElementById('inventory');
                for (var i = 0; i < data.inventory.length; i++) {
                    var itemId = data.inventory[i];
                    var itemType;
                    var itemRange = Math.floor(itemId / 1000); // Determine the range based on item ID

                    if (itemRange >= 1 && itemRange < 2) {
                        itemType = 'armor';
                    } else if (itemRange >= 2 && itemRange < 3) {
                        itemType = 'weapons';
                    } else if (itemRange >= 3 && itemRange < 4) {
                        itemType = 'accessories';
                    } else {
                        // Invalid item ID
                        continue;
                    }

                    var inventorySection = document.querySelector('.inventory' + itemType.charAt(0).toUpperCase() + itemType.slice(1)); // Get corresponding inventory section
                    var itemImg = document.createElement('img');
                    itemImg.src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/" + itemType + "/" + itemId + ".png";
                    itemImg.style.width = "80px"; // Adjust the width as needed
                    itemImg.style.height = "auto"; // Adjust the height as needed
                    itemImg.style.marginRight = "10px"; // Adjust margin as needed
                    itemImg.draggable = true; // Enable dragging
                    itemImg.dataset.inventoryID = itemId; // Store item ID as data attribute

                    inventorySection.appendChild(itemImg);
                }
                // END OF DISPLAY OF INVENTORY


    

                var flexContainer = document.querySelector('.flex-container');

                // IF ARMOR IS EQUIPPED, ADD TO EQUIPPED GEAR
                if (data.armorGearIdEquipped != 0) {
                    var flexContainer = document.querySelector('.flex-container');
                    var armorDiv = document.createElement('armorDiv');
                    armorDiv.innerHTML = `
                        <div id="equippedArmorSlot" class="equipped-slot">
                            <p style="color: #ad9745">Armor</p>
                            <img id="equippedArmor" style="width: 80px; height: auto; margin-right: 10px;">
                            <br>
                            <br>
                            <button onclick="unequipArmor()">Unequip</button>
                        </div>
                    `;
                    flexContainer.appendChild(armorDiv);

                    // DISPLAY EQUIPPED ARMOR
                    var equippedArmor = document.getElementById('equippedArmor');
                    if (data.armorGearIdEquipped) {
                        equippedArmor.src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/armor/" + data.armorGearIdEquipped + ".png";
                    }
                }

                if (data.weaponGearIdEquipped != 0) {
                    // Select the flex-container element
                    var flexContainer = document.querySelector('.flex-container');
                    // Create a new div element to contain the provided HTML code
                    var weaponDiv = document.createElement('weaponDiv');
                    weaponDiv.innerHTML = `
                        <div id="equippedWeaponSlot" class="equipped-slot">
                            <p style="color: #ad9745">Weapon</p>
                            <img id="equippedWeapon" style="width: 80px; height: auto; margin-right: 10px;">
                            <br>
                            <br>
                            <button onclick="unequipWeapon()">Unequip</button>
                        </div>
                    `;
                    // Append the newly created div element to the flex-container
                    flexContainer.appendChild(weaponDiv);

                    // DISPLAY EQUIPPED WEAPON
                    var equippedWeapon = document.getElementById('equippedWeapon');
                    if (data.weaponGearIdEquipped) {
                        equippedWeapon.src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/weapons/" + data.weaponGearIdEquipped + ".png";
                    }
                }

                console.log(data);

                // Remove fade-in animation after content is loaded
                setTimeout(function() {
                    var profileContainer = document.getElementById('profile-container');
                    var inventory = document.getElementById('inventory');
                    var equipSpot = document.getElementById('equip-spot');
                    profileContainer.classList.remove('fade-in');
                    inventory.classList.remove('fade-in');
                    equipSpot.classList.remove('fade-in');
                }, 1000); // Adjust the delay time as needed
            })

            .catch(error => console.log('error', error));

        // Add event listener to the inventory container for event delegation
        document.getElementById('inventory').addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', event.target.dataset.inventoryID); // Set data to be transferred
        });
    }
</script>

<script>
    function allowDrop(event) {
        event.preventDefault();
    }

    document.getElementById('inventory').addEventListener('mouseover', function(event) {
        var target = event.target;
        var itemID = parseInt(target.dataset.inventoryID);
        if (target.tagName === 'IMG') {
            // Remove existing stats
            var existingStats = document.querySelector('.item-stats');
            if (existingStats) {
                existingStats.remove();
            }

            var stats = document.createElement('div');
            var itemType = Math.floor(itemID / 1000); // Determine the item type based on ID range
            if (itemType === 1) { // Armor
                fetchArmorStats(itemID)
                    .then(armor => {
                        stats.textContent = `${armor.name} - ${armor.healthAdded} Health`;
                    })
                    .catch(error => {
                        stats.textContent = "[Insert Armor Stats Here]";
                        console.log('error', error);
                    });
            } else if (itemType === 2) { // Weapon
                fetchWeaponStats(itemID)
                    .then(weapon => {
                        stats.textContent = `${weapon.name} - ${weapon.damageAdded} Damage`;
                    })
                    .catch(error => {
                        stats.textContent = "[Insert Weapon Stats Here]";
                        console.log('error', error);
                    });
            }
            stats.classList.add('item-stats'); // Add a class for easier identification and removal
            stats.style.top = target.offsetTop + "px";
            stats.style.left = (target.offsetLeft + target.offsetWidth + 10) + "px";
            document.body.appendChild(stats);
        }
    });


    // Update the drop function to equip weapons
    function drop(event) {
        console.log('Dropped');
        event.preventDefault();
        var itemID = parseInt(event.dataTransfer.getData('text/plain')); // Get the data transferred
        console.log('Dropped item with ID:', itemID);

        var itemType = Math.floor(itemID / 1000); // Determine the item type based on ID range
        if (itemType === 1) { // Armor
            equipArmor(itemID);
        } else if (itemType === 2) { // Weapon
            equipWeapon(itemID);
        }
    }


    // Add event listener to the inventory container for event delegation
    document.getElementById('inventory').addEventListener('mouseleave', function(event) {
        var target = event.relatedTarget || event.toElement;
        if (!target || !target.classList.contains('item-stats')) {
            var stats = document.querySelector('.item-stats');
            if (stats) {
                stats.remove();
            }
        }
    });

        // Function to equip weapons
    function equipWeapon(gearID) {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            credentials: "include"
        };

        fetch(uri + `/api/person/equipWeapon?weaponID=${gearID}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("Weapon equipped successfully.");
                    window.location.reload(); // Reload the page if successful
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error equipping weapon:', error));
    }

    function unequipWeapon() {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            credentials: "include"
        };

        fetch(uri + `/api/person/unequipWeapon`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("Gear change successful.");
                    window.location.reload(); // Reload the page if successful
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error changing gear:', error));
    }

    function equipArmor(gearID) {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            credentials: "include"
        };

        fetch(uri + `/api/person/equipArmor?armorID=${gearID}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("Gear change successful.");
                    window.location.reload(); // Reload the page if successful
                } else {
                    switch (response.status) {
                        case 401:
                            alert("Incorrect username or password");
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
            })
            .catch(error => console.error('Error changing gear:', error));
    }


    function unequipArmor() {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            credentials: "include"
        };

        fetch(uri + `/api/person/unequipArmor`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("Gear change successful.");
                    window.location.reload(); // Reload the page if successful
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error changing gear:', error));
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
                // Find weapon stats by weaponID
                const weaponStats = data.items.find(item => item.gearID === weaponID);
                if (!weaponStats) {
                    throw new Error('Weapon stats not found ');
                }
                return weaponStats;
            });
    }

    // Function to fetch armor stats
    function fetchArmorStats(armorID) {
        return fetch('gear.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch armor stats');
                }
                return response.json();
            })
            .then(data => {
                // Find armor stats by armorID
                const armorStats = data.items.find(item => item.gearID === armorID);
                if (!armorStats) {
                    throw new Error('Armor stats not found ');
                }
                return armorStats;
            });
    }

</script>

