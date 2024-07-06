---
toc: true
comments: true
layout: base
title: map
author: rachit
permalink: /chat
---

# Chat Testing


<form id="messageForm">
    <label for="userMessage">User Message:</label>
    <input type="text" id="userMessage" name="userMessage"><br><br>
    <label for="systemMessage">System Message:</label>
    <input type="text" id="systemMessage" name="systemMessage"><br><br>
    <input type="submit" value="Send Message">
</form>
<!-- Place to display the response -->
<div id="apiResponse"></div>
<script>
    // JavaScript to handle form submission
    document.getElementById('messageForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents default form submission behavior
        // Get the input values from the form
        var userMessage = document.getElementById('userMessage').value;
        var systemMessage = document.getElementById('systemMessage').value;
        // Construct the request payload
        var data = {
            "messages": [
                {"role": "user", "content": userMessage},
                {"role": "system", "content": systemMessage}
            ]
        };
        // Send the POST request
        fetch(uri + '/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Display the response - example: get content of index 0
            document.getElementById('apiResponse').innerText = data.choices[0].message.content;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
</script>
