---
toc: true
comments: true
layout: battle
title: frq editor
author: Luna I
permalink: /frq
---

<head>
  <title>Java Code Compiler</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    textarea {
      width: 60%;
      height: 200px;
    }
    button {
      margin-top: 10px;
      padding: 10px 20px;
    }
    pre {
      background-color: #f4f4f4;
      padding: 10px;
    }
  </style>
</head>
<body>
  <iframe
  src="images/ap23csa.pdf"
  width="60%"
  height="600px"
  ></iframe>
<h1>Java Code Compiler</h1>
<textarea id="code" placeholder="Enter your Java code here..."></textarea>
<button onclick="compileCode()">Run Code</button>
<h1>Output</h1>
<pre id="output"></pre>
<script>
async function compileCode() {
  const code = document.getElementById('code').value;
  try {
  const response = await fetch('http://localhost:8032/api/compile/JudgeController', { 
// fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/compile/JudgeController", requestOptions)
  method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
  body: JSON.stringify({ code: code })
});
  if (!response.ok) {
    const errorMsg = 'Compiling failed: ' + response.status;
    console.log(errorMsg);
    switch (response.status) {
    default:
     alert("Compiling failed. Please try again later.");
    }
    throw new Error('Compiling failed');
    }
    const result = await response.json();
    const outputElement = document.getElementById('output');
    if (result.output) {
      outputElement.textContent = result.output;
     } else if (result.error) {
      outputElement.textContent = result.error;
        }
} catch (error) {
  console.error('Error:', error);
  }
}
</script>
</body>

