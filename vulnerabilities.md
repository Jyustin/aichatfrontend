---
layout: none
permalink: /vulnerabilities
---

<html>

<head>
    <style>
        .tooltip {
            position: relative;
            display: inline-block;
            cursor: pointer;
        }
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 300px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            margin-bottom: 0px;
            left: 100%;
            margin-left: -140px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        body {
            margin: 0;
            padding: 0;
        }
        h1 {
            margin-top: 50px;
            text-align: center;
        }
        #result {
            padding: 20px;
        }
        table {
            margin: 0;
            padding: 0;
            font-size: 12.35px;
        }
        td {
            padding: 10px;
        }
        #fetchButton,
        #osFilter,
        #osDropdown {
            display: block;
            margin: 10px auto;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            font-family: "Poppins", sans-serif;
        }
        #fetchButton {
            background-color: purple;
            color: white;
        }
        #osFilter {
            text-align: center;
        }
        #osDropdown {
            width: 150px;
        }
        #searchInput {
            display: none; /* Initially hide search bar */
            padding: 8px;
            margin-right: 10px;
            font-size: 14px;
            border: 2px solid black;
            border-radius: 4px;
            margin-top: 10px;
        }
        #securityControlsLabel {
            display: none;  /* Initially hide the label */
            margin-top: 20px;
            font-size: 16px;
            font-family: "Poppins", sans-serif;
        }
        .button {
            padding: .5rem 2rem;
            color: var(--white) !important;
            background-color: var(--primary-color);
            border-radius: 5px;
            border: none;
            }   
        .button-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
        }

    </style>
</head>

<body>
    <h1>Vulnerability Runtime</h1>
    <div id="osFilter">
        <label for="osDropdown">Select your operating system:</label>
        <select id="osDropdown">
            <option value="ubu20">Ubuntu</option>
            <option value="microsoft10">Microsoft Windows</option>
            <option value="googlechromebrowser">Google Chrome Browser</option>
            <option value="AppleMacOS13">Apple MacOS</option>
        </select>
        <button class="button" id="fetchButton">Fetch Info</button>
        <label id="securityControlsLabel">What security controls are you interested in?</label>
        <input type="text" id="searchInput" placeholder="Search...">
    </div>
    <div id="result"></div>
</body>

<div class="button-container">
    <a href="{{ site.baseurl }}/leaderboard" class="button">Continue</a>
  </div>

</html>

<script>
    document.getElementById('fetchButton').addEventListener('click', fetchInfo);

    function fetchInfo() {
        const baseURL = "http://localhost:8013/api/vulnerability/software";
        const osDropdown = document.getElementById('osDropdown');
        const category = osDropdown.options[osDropdown.selectedIndex].value;
        console.log(category)
        const url = `${baseURL}/${category}`;
        console.log(url);

        // Fetch data from API 
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            // Check if the response from the server is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Create an HTML table header
            let table = "<table border='1' cellspacing='3'><tr><th>ID</th><th>Title</th><th>Severity</th><th>Description</th><th>Fix Text</th><th>Check Text</th></tr>";

            // Insert data from the API into the table rows
            data.forEach(item => {
                table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.severity}</td>
                    <td>${item.description}</td>
                    <td>${item.fixtext}</td>
                    <td>${item.checktext}</td>
                </tr>`;
            });

            // Close the HTML table
            table += "</table>";

            // Display the generated table in the 'result' element
            document.getElementById('result').innerHTML = table;

            filterTableRows();
            // Add tooltips to the column
            addTooltipToIdColumn();
            
            document.getElementById('searchInput').style.display = 'inline-block';
            document.getElementById('securityControlsLabel').style.display = 'block';
            document.getElementById('searchInput').addEventListener('input', function() {
                filterTableRows();
               });
        })

        // Log and display an error message if there is a problem with the fetch operation
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('result').textContent = 'Error: ' + error.message;
        });
    }


    function filterTableRows() {
    const searchInput = document.getElementById('searchInput');
    const filterValue = searchInput.value.toUpperCase(); // Convert input to uppercase for case-insensitive comparison

    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');

    // Loop through all table rows and hide those that do not match the search input
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the table header
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        let rowContainsSearchTerm = false;

        // Check each cell in the row for a match
        cells.forEach(cell => {
            const cellText = cell.textContent || cell.innerText; // Get cell text content
            if (cellText.toUpperCase().indexOf(filterValue) > -1) {
                rowContainsSearchTerm = true;
            }
        });

        // Show or hide the row based on whether it contains the search term
        if (rowContainsSearchTerm) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}



    function addTooltipToIdColumn() {
        const idColumn = document.querySelectorAll('td:first-child');
        const titleColumn = document.querySelectorAll('td:nth-child(2)');
        const severityColumn = document.querySelectorAll('td:nth-child(3)');
        const descriptionColumn = document.querySelectorAll('td:nth-child(4)');
        const fixTextColumn = document.querySelectorAll('td:nth-child(5)');
        const checkTextColumn = document.querySelectorAll('td:nth-child(6)');

        idColumn.forEach((idCell) => {
            // Wrap the content of the ID cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const idContent = idCell.innerHTML;
            idCell.innerHTML = '';
            tooltipContainer.innerHTML = idContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'This is a unique alphanumeric code assigned to each security control. It provides a consistent way to identify and reference each control specific to the operating system!';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the ID cell
            idCell.appendChild(tooltipContainer);
        });

        titleColumn.forEach((titleCell) => {
            // Wrap the content of the title cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const titleContent = titleCell.innerHTML;
            titleCell.innerHTML = '';
            tooltipContainer.innerHTML = titleContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'This column describes the security control in a concise manner.';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the title cell
            titleCell.appendChild(tooltipContainer);
        });

        severityColumn.forEach((severityCell) => {
            // Wrap the content of the severity cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const severityContent = severityCell.innerHTML;
            severityCell.innerHTML = '';
            tooltipContainer.innerHTML = severityContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'The level of risk for each security control is categorized into low, medium, and high. Factors that impact severity is ease of explotation & potential conquences like unauthorized access, data breaches, and system outrages';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the severity cell
            severityCell.appendChild(tooltipContainer);
        });

        descriptionColumn.forEach((descriptionCell) => {
            // Wrap the content of the description cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const descriptionContent = descriptionCell.innerHTML;
            descriptionCell.innerHTML = '';
            tooltipContainer.innerHTML = descriptionContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'Additional details on the security control & explaining the rationale of why this requirement is IMPORTANT in context of potential risks';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the description cell
            descriptionCell.appendChild(tooltipContainer);
        });

        fixTextColumn.forEach((fixTextCell) => {
            // Wrap the content of the fixText cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const fixTextContent = fixTextCell.innerHTML;
            fixTextCell.innerHTML = '';
            tooltipContainer.innerHTML = fixTextContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'Details the steps or actions required to remediate or fix the security control!';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the fixText cell
            fixTextCell.appendChild(tooltipContainer);
        });

        checkTextColumn.forEach((checkTextCell) => {
            // Wrap the content of the checkText cell with a tooltip container
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip';
            const checkTextContent = checkTextCell.innerHTML;
            checkTextCell.innerHTML = '';
            tooltipContainer.innerHTML = checkTextContent;

            // Create the tooltip text and append it to the tooltip container
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltiptext';
            tooltipText.textContent = 'Specifies the criteria to verify whether the security control has been properly implemented';
            tooltipContainer.appendChild(tooltipText);

            // Append the tooltip container to the checkText cell
            checkTextCell.appendChild(tooltipContainer);
        });
    }

</script>








