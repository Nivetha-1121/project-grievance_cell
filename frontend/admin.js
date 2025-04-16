async function fetchComplaints() {
  try {
    const response = await fetch("http://localhost:8000/app/getdata");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const complaints = await response.json();
    displayComplaints(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
  }
}

function displayComplaints(data) {
  const tableBody = document.getElementById("complaintTable");
  tableBody.innerHTML = "";

  data.forEach((complaint) => {
    // const savedStatus = localStorage.getItem(`status_${complaint.regNumber}`) || "Pending";
    const savedStatus = complaint.status

    const row = `<tr>
          <td>${complaint.name}</td>
          <td>${complaint.regNumber}</td>
          <td>${complaint.department}</td>
          <td>${complaint.year}</td>
          <td>${complaint.designation}</td>
          <td>${complaint.category}</td>
          <td>${complaint.grievance}</td>
          <td>
              <select class="status-dropdown" data-reg="${complaint.regNumber}">
                  <option value="P" ${savedStatus === "P" ? "selected" : ""}>Pending</option>
                  <option value="X" ${savedStatus === "X" ? "selected" : ""}>Processing</option>
                  <option value="S" ${savedStatus === "S" ? "selected" : ""}>Processed</option>
                  <option value="D" ${savedStatus === "D" ? "selected" : ""}>Declined</option>
              </select>
          </td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  document.querySelectorAll(".status-dropdown").forEach(dropdown => {
    dropdown.addEventListener("change", updateStatus);
  });
}

async function submitComplaints() {
  const tableRows = document.querySelectorAll("#complaintTable tr");

  let complaintsData = [];
  tableRows.forEach(row => {
    const cells = row.querySelectorAll("td");

    if (cells.length > 0) {
      const complaint = {
        name: cells[0].textContent.trim(),
        regNumber: cells[1].textContent.trim(),
        department: cells[2].textContent.trim(),
        year: cells[3].textContent.trim(),
        designation: cells[4].textContent.trim(),
        category: cells[5].textContent.trim(),
        grievance: cells[6].textContent.trim(),
        status: row.querySelector(".status-dropdown").value
      };
      complaintsData.push(complaint);
    }
  });

  console.log("Submitting data:", complaintsData);

  try {
    const response = await fetch("http://localhost:8000/app/submitComplaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaints: complaintsData })
    });

    if (response.ok) {
      alert("Complaints submitted successfully!");  
    } else {
      alert("Failed to submit complaints.");
    }
  } catch (error) {
    console.error("Error submitting complaints:", error);
  }
}

document.getElementById("submit-btn").addEventListener("click", submitComplaints);

document.addEventListener("DOMContentLoaded", fetchComplaints);



