---
layout: profile
search_exclude: true
--- 

<script src="uri.js"></script>

<script>
    window.onload = function () {
        fetchUserData();
    };

    function fetchUserData() {
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
                                window.location.href = "login";
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
                console.log(data);
                document.getElementById('profile-picture').src = "https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/"+ data.profilePicInt + ".png";;
                document.getElementById('profile-name').innerText = data.name;
                document.getElementById('email').placeholder = data.email;
                document.getElementById('name').placeholder = data.name;
                document.getElementById('id').innerText = data.id;
            })
        .then(data => {
            console.log(data);
            document.getElementById('profile-picture').src = "https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/"+ data.profilePicInt + ".png";;
            document.getElementById('profile-name').innerText = data.name;
            document.getElementById('email').placeholder = data.email;
            document.getElementById('name').placeholder = data.name;
            console.log(data.id);
            document.getElementById('id').innerText = data.id;
            })
        .catch(error => console.log('error', error));
    }

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('profilePicChangeButton').addEventListener('click', function() {
            document.getElementById('popup-modal').style.display = 'block';
        });

        document.getElementsByClassName('close')[0].addEventListener('click', function() {
            document.getElementById('popup-modal').style.display = 'none';
        });
    });

    let selectedImageNumber = 1;

    function selectedProfPic(imageNum) {
        selectedImageNumber = imageNum;
        console.log(selectedImageNumber)
        document.getElementById("profPic" + imageNum).style.border = "4px solid #007bff";
        for (var i = 1; i < 7; i++) {
            if (i != imageNum) {
                document.getElementById("profPic" + i).style.border = "none";
            }
        }
    }

    function postRequestProfPic(selectedImageNumber) {
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
        };

        // LOCAL TESTING
        fetch(uri + "/api/person/changeProfilePic?profilePicInt=" + selectedImageNumber, requestOptions)
        .then(response => {
            if (response.ok) {
                // If the response is successful, reload the window
                window.location.reload();
            } else {
                // Handle error cases
                return response.text();
            }
        })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        }


        function updateUserProfile(data) {
            // Extracting form data
            const formData = new FormData(data);
            const name = formData.get('name');
            const email = formData.get('email');
            const id = document.getElementById('id').innerHTML;

            // Constructing the request body
            const requestBody = {
            name: name,
            email: email
            };
            console.log(requestBody);
            // Making the POST request LOCAL TESTING
            fetch(uri + `/api/person/updatePerson/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            // SHOULD Redirect to the reading page after successful update BUT only if I fix email not updating
            //signout();
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
        }



  function signout() {
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
            //window.location.href = "login";
        })
      .catch(error => console.log('error', error));
  }

</script>

<div id="profile-container">
  <div id="profile-info">
    <img id="profile-picture" src="">
    <h1 id="profile-name"></h1> 
    <!-- <h1 id="id"></h1>  -->
    <button id="profilePicChangeButton">Change Profile Picture</button>
  </div>
  <div id="profile-form">
    <form onsubmit="event.preventDefault(); updateUserProfile(this);">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <button type="submit">Save Changes</button>
    </form>
  </div>
</div>

<div id="popup-modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <!-- <h2>Upload Profile Picture</h2> -->
    <!-- <input type="file" id="profile-picture-upload" accept=".png, .jpg, .jpeg"> -->
    <div class="profilePicturesShown">
        <img id="profPic1" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/1.png" onclick="selectedProfPic(1)">
        <img id="profPic2" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/2.png" onclick="selectedProfPic(2)">
        <img id="profPic3" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/3.png" onclick="selectedProfPic(3)">
        <img id="profPic4" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/4.png" onclick="selectedProfPic(4)">
        <img id="profPic5" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/5.png" onclick="selectedProfPic(5)">
        <img id="profPic6" src="https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/6.png" onclick="selectedProfPic(6)">
    </div>
    <button id="select-button" onclick="postRequestProfPic(selectedImageNumber)" >Select</button>
  </div>
</div>

<style>
    .profilePicturesShown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px auto;
        padding: 20px;
        max-width: 800px; /* Adjust as needed */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

    .account-card {
        width: 300px; /* Adjust width as needed */
        padding: 20px;
        background-color: #E5E4E2;
        border-radius: 10px;
        margin-left: 80%; /* Adjust margin to match sidebar width */
        text-align: center;
        margin-bottom: 20px; /* Adjust bottom margin as needed */
        position: absolute;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,151,8,1) 0%, rgba(255,0,0,1) 100%);
    }

</style>