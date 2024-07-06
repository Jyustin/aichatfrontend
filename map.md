---
toc: true
comments: true
layout: base
title: map
author: luna and tanisha 
permalink: /map
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Map</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        .map {
            position: relative;
            width: 100vw;
            height: 100vh;
            background-color: #87CEEB; /* Blue color for the ocean background */
            cursor: pointer;
        }

        .island {
            position: absolute;
            width: 100px;
            height: 100px;
            background-image: url('images/island.png'); /* Path to your island image */
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .island-name {
            color: rgb(89, 59, 7); /* Black text color */
            font-family:'Courier New', Courier, monospace;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            position: absolute;
            bottom: -20px; /* Adjust the distance between the island and the name */
            width: 100%; /* Ensure full width */
            transition: color 0.3s;
        }

        .island-name a {
            color: inherit;
            text-decoration: none;
        }

        .island:hover {
            /* Add hover styles if needed */
        }

        .island:hover .island-name {
            color: #CD853F; /* Change text color on hover */
        }
    </style>
</head>
<body>
    <div class="map">
        <div class="island" style="top: 100px; left: 150px;">
            <div class="island-name"><a href="https://codemaxxers.github.io/codemaxxerFrontend/islandmap">Chemistry Island</a></div>
        </div>
        <div class="island" style="top: 250px; left: 400px;">
            <div class="island-name"><a href="https://codemaxxers.github.io/codemaxxerFrontend/islandmap">Calculus Island</a></div>
        </div>
        <div class="island" style="top: 400px; left: 250px;">
            <div class="island-name"><a href="http://127.0.0.1:5501/game/index.html">CSA Island</a></div>
        </div>
        <div class="island" style="top: 600px; left: 500px;">
            <div class="island-name"><a href="https://codemaxxers.github.io/codemaxxerFrontend/islandmap">Physics Island</a></div>
        </div>
        <!-- <div class="island" style="top: px; left: px;">
            <div class="island-name"><a href="https://codemaxxers.github.io/codemaxxerFrontend/islandmap">Cybersecurity Island</a></div>
        </div> -->
    </div>
</body>
</html>
