// Sub-category options for filtering
const subCategoryOptions = {
    Year: ["I", "II", "III", "IV"],
    Department: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
    Designation: ["Student", "Teaching Faculty", "Non-Teaching Faculty"],
    Category: ["Academic", "Hostel", "Transport", "Canteen", "Placement", "others"]
  };
  
  // Populate sub-categories when filter type is selected
  document.getElementById("filter-main").addEventListener("change", function () {
    const subFilter = document.getElementById("filter-sub");
    const selectedCategory = this.value;
    
    subFilter.innerHTML = '<option>--Select Sub-category--</option>';
    
    if (subCategoryOptions[selectedCategory]) {
      subCategoryOptions[selectedCategory].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        subFilter.appendChild(opt);
      });
    }
  });
  
  // Fetch complaints from MongoDB
  async function fetchComplaints() {
    try {
      const response = await fetch("http://localhost:8000/app/getdata");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      return await response.json(); // Return the fetched data
    } catch (error) {
      console.error("Error fetching complaints:", error);
      return [];
    }
  }
  
  // Apply filter and display complaints
  document.querySelector(".apply-btn").addEventListener("click", async function () {
    const filterType = document.getElementById("filter-main").value;
    const filterValue = document.getElementById("filter-sub").value;
  
    const allComplaints = await fetchComplaints();
    let filteredComplaints = allComplaints;
  
    if (filterType !== "--Select--" && filterValue !== "--Select Sub-category--") {
      filteredComplaints = allComplaints.filter(complaint => complaint[filterType.toLowerCase()] === filterValue);
    }
  
    displayComplaints(filteredComplaints);
  });
  
  // Display complaints in table
  function displayComplaints(data) {
    const tableBody = document.getElementById("complaintTable");
    tableBody.innerHTML = "";
  
    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red; font-weight: bold;">No results found</td></tr>`;
      return;
    }
  
    data.forEach((complaint) => {
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
                    <option value="P" ${complaint.status === "P" ? "selected" : ""}>Pending</option>
                    <option value="X" ${complaint.status === "X" ? "selected" : ""}>Processing</option>
                    <option value="S" ${complaint.status === "S" ? "selected" : ""}>Processed</option>
                    <option value="D" ${complaint.status === "D" ? "selected" : ""}>Declined</option>
                </select>
            </td>
        </tr>`;
      tableBody.innerHTML += row;
    });
  
    document.querySelectorAll(".status-dropdown").forEach(dropdown => {
      dropdown.addEventListener("change", updateStatus);
    });
  }
  
  // Submit updated complaints
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
  
  // Event listeners
  document.getElementById("submit-btn").addEventListener("click", submitComplaints);
  document.addEventListener("DOMContentLoaded", async () => {
    const complaints = await fetchComplaints();
    displayComplaints(complaints);
  });
  
// Clear filter and show all complaints
document.querySelector(".clear-btn").addEventListener("click", async function () {
    document.getElementById("filter-main").value = "--Select--";
    document.getElementById("filter-sub").innerHTML = '<option>--Select Sub-category--</option>';
    
    // Fetch and display all complaints again
    const allComplaints = await fetchComplaints();
    displayComplaints(allComplaints);
  });
  