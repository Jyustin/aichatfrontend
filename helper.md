---
toc: true
comments: true
layout: post
title: Helper AI
author: Finn C
---
<p>Note: everything works, but backend needs to be ran locally, also change token in backend, gonna figure out a different way but for rn follow this guide <a href="https://github.com/LarryDpk/Google-Bard?tab=readme-ov-file#get-the-token-from-browser">link</a></p>

<div class="chatbox">
    <div class="chat" id="chat">
        <p class="AI">lorem</p>
        <p class="User">lorem</p>
    </div>
    <div class="question">
        <input class="AI-input" id="question">
        <button class="send" id="send" onclick="Send()">Send</button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked@2.0.3/marked.min.js"></script>


<script>
    async function Send() {
        var input = document.getElementById('question').value;
        // Check if there is no input
        if (!input) {
            return;
        }

        var Chat = document.getElementById("chat");
        var UserChat = `<p class="User">${input}</p>`;
        Chat.innerHTML = Chat.innerHTML + UserChat;

        // Info needed for the request
        const AI_URL = "http://localhost:8085/api/bard/ask";
        const fetch_data = {
            "question": input
        };
        const Headers = {
            method: "POST",
            cache: 'no-cache',
            credentials: 'include',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetch_data)
        };

        input.innerHTML = "";

        // Post
        await fetch(AI_URL, Headers)
            .then(response => response.text())
            .then(data => {
                // Convert Markdown to HTML using marked
                var AIChat = `<p class="AI">${marked(data)}</p>`;
                // Append the AI response to the existing chat content
                Chat.innerHTML = Chat.innerHTML + AIChat;
            });
    }
</script>
