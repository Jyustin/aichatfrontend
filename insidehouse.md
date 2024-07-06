---
layout: none
title: inside of the house
author: Vivian, Aliya
permalink: /insidehouse
---
<body>
<div>
    <button onclick="goHome()" id="homeBtn" class="homeBtn">Go Homepage</button>
    <div class="inside-container">
        <img src="{{site.baseurl}}/images/indoorRoom.png" class="houseImg"> 
        <a id="computerBtn" href="{{site.baseurl}}/compscreen"> <img class="computerBtn" ></a>
    </div>
</div>
</body>

<script>
    var homeBtn = document.getElementById("home-btn");
    function goHome() {
        window.location.href = '{{site.baseurl}}/game/index.html';
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    body {
        background-image: url("{{site.baseurl}}/images/indoorRoom.png");
    }

    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .homeBtn:hover {
        background-color: #ddd;
    }

    body {
        background-image: url("https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/pb2.jpeg");
        background-repeat: repeat;
        background-size: auto;
        background-position: center; /* optional, to center the image */
        height: 25vh;
        margin-bottom: 30px;
        background-size: 300px;
    }

    .homeBtn{
        position: absolute;
        border:  3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
    }

    .homeBtn:hover {
        background-color: #ddd;
    }

    .computerBtn {
        height: 97;
        width: 100;
        position: absolute;
            top: 27%;
            left: 28.3%;
    }

    .houseImg{
        width: 1100;
        position: absolute;
            top: 7%;
            left: 21%;
    }

</style>
