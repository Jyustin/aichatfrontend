---
layout: profile
search_exclude: true
---

<script src="uri.js"></script>

<div id="player-cards-container" class="profilePicturesShown">
    <div class="account-card header">
        <div class="name">Name</div>
        <div class="email">Email</div>
        <div class="csaPoints">CSA Points</div>
    </div>
</div>

<script>
    window.onload = function () {
        fetchLeaderboardCSA();
    };

    function fetchLeaderboardCSA() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };

        // Fetch the top 5 players with highest CSA points
        fetch(uri + "/api/person/leaderboardCSA", requestOptions)
            .then(response => response.json())
            .then(data => {
                // Call function to generate player cards
                console.log(data);
                generatePlayerCards(data);
            })
            .catch(error => console.log('error', error));
    }

    let count = 1;

    function generatePlayerCards(playersData) {
        // Get the container element to append player cards
        var container = document.getElementById('player-cards-container');

        // Loop through each player data and create a card for them
        playersData.forEach(player => {
                        
            // Create player card elements
            var card = document.createElement('div');
            card.classList.add('account-card');

            var name = document.createElement('h2');
            name.classList.add('name');
            name.textContent = count + " " + player.name;
            count++;

            var email = document.createElement('p');
            email.textContent = player.email;
            email.classList.add('email');

            var csaPoints = document.createElement('p');
            csaPoints.textContent = player.csaPoints;
            csaPoints.classList.add('csaPoints');

            // Append elements to the card
            card.appendChild(name);
            card.appendChild(email);
            card.appendChild(csaPoints);

            // Append the card to the container
            container.appendChild(card);
        });
    }

</script>



<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

    .profilePicturesShown {
        width: 1000px;
	    height: auto;
        align-items: center;
        margin: 20px auto;
        padding: 20px;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    }
    #profPic1,
    #profPic2,
    #profPic3,
    #profPic4,
    #profPic5,
    #profPic6 {
        width: 100px;
        height: 100px;
        border-radius: 15%;
        object-fit: cover;
        margin-bottom: 20px;
    }

    #profile-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* Align items to the top */
        margin: 50px auto;
        padding: 20px;
        max-width: 800px; /* Adjust as needed */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #profile-info {
        flex: 1;
        margin-right: 20px; /* Add space between profile info and form */
        display: flex;
        flex-direction: column;
        align-items: center; /* Center items horizontally */
    }

    #profile-picture {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
    }

    #profile-name {
        margin: 0;
        font-size: 24px;
        text-align: center;
    }

    #profile-form {
        flex: 2; /* Adjust the width of the form section */
    }

    #profile-form form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    #profile-form label {
        margin-bottom: 5px;
    }

    #profile-form input {
        width: calc(100% - 20px);
        padding: 12px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 16px;
    }

    #profile-form button {
        width: calc(100% - 20px);
        padding: 12px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    #profile-form button:hover {
        background-color: #0056b3;
    }

    .page-content {
        margin-left: 270px;
    }

    #profilePicChangeButton {
        margin-top: 20px;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    #profilePicChangeButton:hover {
        background-color: #0056b3;
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
        background-color: rgba(0,0,0,0.6);
    }

    .modal-content {
        background-color: #e9e8ed;
        margin: 15% auto; 
        padding: 20px;
        border: 1px solid #888;
        width: 80%; 
        border-radius: 8px;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    #select-button {
        margin-top: 20px;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-left: 45%;
        width: 10%; 
    }

    #select-button:hover {
        background-color: #0056b3;
    }

    .header {
        font-weight: bold;
        font-size: 30px;
        font-family: "DotGothic16", sans-serif;
        border-bottom: 1px solid black;
    }

    /* Adjustments for column layout */
    .account-card {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,151,8,1) 0%, rgba(255,0,0,1) 100%);
        border-bottom: 1px solid none;
        color: #000;
    }

    .name,
    .email,
    .csaPoints {
        flex: 1;
        font-family: "DotGothic16", sans-serif;
        text-align: center;
        font-size: 16px;
    }

</style>