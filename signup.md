---
layout: star
search_exclude: true
permalink: signup
--- 

<script src="uri.js"></script>

<div id="popup-modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h1 id="confirmText">Sign Up Successful</h1>
    <br>
    <p id="confirmText">Thank you for signing up! You will now be redirected to the login page.</p>
  </div>
</div>

<div class="banner">
    <div class="navbar">
        <img src="images/RIFTlogo.png" class="logo">
        <ul>
            <li><a href="{{site.baseurl}}/">Home</a></li>
            <li><a href="">Info</a></li>
            <li><a href="">Player Search</a></li>
            <li><a href="">About Us</a></li>
        </ul>
    </div>
</div>

<div class="card">
    <h3 id="signUpText">Sign Up</h3>
    <h5>Email</h5>
    <input type="text" id="email" name="email"><br/><br>
    <h5>Username</h5>
    <input type="text" id="username" name="username" required><br><br>
    <h5>Password</h5>
    <input type="password" id="password" name="pw1" required>
    <br><br>
    <button onclick="visibilityToggle()" id="showHidePWButton">Show Password</button><br><br>
    <button onclick="signUp()">Sign Up</button>
</div>

<script>

    function visibilityToggle() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            document.getElementById("showHidePWButton").textContent = "Hide Password";
        } else {
            x.type = "password";
            document.getElementById("showHidePWButton").textContent = "Show Password";
        }
    }

    function clearCookie() {
        var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        credentials: 'include'
        };

        // LOCAL TESTING
        fetch(uri + "/signout", requestOptions)
        .then(response => response.text())
        .then(result => {
                console.log(result);
            })
        .catch(error => console.log('error', error));
    }

    function signUpConfirm() {
        document.getElementById('popup-modal').style.display = 'block';

        document.getElementsByClassName('close')[0].addEventListener('click', function() {
            document.getElementById('popup-modal').style.display = 'none';
            window.location.href = "login";
        });
    }

    function signUp() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'include',  // Include this line for cross-origin requests with credentials
            redirect: 'follow'
        };

        let emailInput = document.getElementById("email").value;
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;



        // LOCAL TESTING
        fetch(uri + `/api/person/post?email=${emailInput}&password=${passwordInput}&name=${usernameInput}` , requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Signup error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 400:
                        alert("Bad request. Please ensure all required fields are filled correctly.");
                        break;
                    case 401:
                        alert("Unauthorized. You do not have permission to perform this action.");
                        break;
                    case 403:
                        alert("Forbidden. Access to this resource is forbidden.");
                        break;
                    case 404:
                        alert("Resource not found. Please try again later.");
                        break;
                    case 409:
                        alert("Conflict. User with the provided credentials already exists.");
                        break;
                    case 500:
                        alert("Internal Server Error. Please try again later.");
                        break;
                    // Add more cases for other status codes as needed
                    default:
                        alert("Signup failed. Please try again later.");
                }
                return Promise.reject('Signup failed');
            }
            return response.text()
        })
        .then(result => {
            console.log(result);
            // You can redirect to a dynamic or configurable URL here
            clearCookie();
            signUpConfirm();
        })
        .catch(error => console.error('Error during signup:', error));
    }
</script>

<style>
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }

    #confirmText {
        color: black;
    }

    #signUpText {
        font-size: 2em;
        margin-bottom: 10px
    }

    .page-content {
        padding: 0px !important;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }


    .navbar {
        width: 85%;
        margin: auto;
        padding: 35px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width: 120px !important;
        height: auto !important;
    }

    .navbar ul li{
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        position: relative;
    }

    .navbar ul li a{
        font-size: 16px;
        text-decoration: none;
        color: #fff;
        text-transform: uppercase;
    }

    .navbar ul li::after{
        content: '';
        height: 3px;
        width: 0;
        background: #2f80d0;
        position: absolute;
        left: 0;
        bottom: -10px;
        transition: ease-out .5s;
    }

    .navbar ul li:hover::after{
        width: 100%;
    }

    p {
        text-align: left;
        font-size: 1.1em;
        font-weight: bold;
        color: #000000;
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
</style>