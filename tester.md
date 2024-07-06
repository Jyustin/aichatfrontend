---
toc: true
comments: true
layout: battle
title: test everything
author: Finn C
permalink: /tester
---

<script>

    var uri;
if (location.hostname === "localhost") {
    uri = "http://localhost:8032";
} else if (location.hostname === "127.0.0.1") {
    uri = "http://localhost:8032";
} else {
    uri = "https://codemaxxers.stu.nighthawkcodingsociety.com";
}
    function GetDamage() {
    var d = 0;

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
                        // window.location.href = "login";
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
        d = data.totalDamage;
        console.log(d);
    })
    .catch(error => console.log('error', error));
}

GetDamage();
</script>