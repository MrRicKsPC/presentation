let jsonData = null;

// Handle file selection and read the JSON file
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                jsonData = JSON.parse(e.target.result); // Parse the JSON file
            } catch (err) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    } else {
        alert("Please upload a valid JSON file.");
    }
});

// Function to convert the JSON data into HTML and trigger download
function convertToHTML() {
    if (!jsonData) {
        alert("Please upload a valid JSON file first.");
        return;
    }

    // Create a basic HTML structure
    let htmlContent = `
        <html>
            <head>
                <title>User Data</title>
            </head>
            <body>
                <h1>User Information</h1>
                <ul>
    `;

    // Loop through JSON data and create list items for each key-value pair
    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            htmlContent += `<li><strong>${key}:</strong> ${jsonData[key]}</li>`;
        }
    }

    htmlContent += `
                </ul>
            </body>
        </html>
    `;

    // Create a Blob from the HTML string
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_data.html'; // Name of the downloaded file
    link.click();
}
