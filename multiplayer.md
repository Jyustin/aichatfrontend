---
layout: menulayout
search_exclude: true
---
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap">
<script src="uri.js"></script>

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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0; /* Change background color as needed */
        margin-top: 10%;
        font-family: 'Noto Sans Mono', sans-serif !important; /* Applying the font to the whole body */
        flex-direction: column; /* Align items vertically */
    }

    .button {
        width: 90%;
        padding: 50px; /* Increased padding for bigger buttons */
        margin: 20px 0;
        font-size: 3.5em; /* Increased font size for bigger buttons */
        color: white;
        background-color: #333;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color .3s ease-in-out;
        margin-left: 5%;
    }


    .button:hover {
        background-color: #555;
    }
</style>

<div class="fadeAnimation">
    <a href="dashboard"><i class="bx bx-arrow-back" id="backIcon"></i></a>
    <button class="button" onclick="location.href='createLobby'">Create Lobby</button>
    <button class="button" onclick="location.href='joinLobby'">Join Lobby</button>
</div>

<script>
    document.getElementById("backIcon").addEventListener("mouseover", function() {
        document.getElementById("backIcon").style.color = "#f0f0f0";
    });

    document.getElementById("backIcon").addEventListener("mouseout", function() {
        document.getElementById("backIcon").style.color = "white";
    });
</script>
