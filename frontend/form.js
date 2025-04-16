function sendGrievance(event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value;
    let regNumber = document.getElementById("regNumber").value;
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let designation= document.getElementById("designation").value;
    let category = document.getElementById("category").value;
    let grievance = document.getElementById("grievance").value;

    if (!name || !regNumber || !department || !year || !designation || !category || !grievance) {
        showalert("Please fill all fields!");
        return;
    }

    // Create email content
    let emailBody = `
        Name: ${name}
        Register Number: ${regNumber}
        Department: ${department}
        Year: ${year}
        Designation:${designation}
        Category: ${category}
        Grievance: ${grievance}
    `;

    const data = {
        "name": name,
        "regNumber": regNumber,
        "department": department,
        "year": year,
        "designation":designation,
        "category": category,
        "grievance": grievance,
        "statusFlag": "P",
    }

    fetch('http://localhost:8000/app/adddata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Grievance Submitted! Admin will be notified.");
        window.location.href = "home.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting grievance. Please try again later.");
    });

}

function goHome() {
    window.location.href = "home.html"; 
}