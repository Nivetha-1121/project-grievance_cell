// Visitor Counter
document.addEventListener("DOMContentLoaded", () => {
    let visitorCounter = localStorage.getItem("visitorCount") || 0;
    visitorCounter++;
    localStorage.setItem("visitorCount", visitorCounter);
    document.getElementById("visitor-counter").textContent = visitorCounter;
});

// Header Image Slider
let currentIndex = 0;
const images = document.querySelectorAll(".header-image");

function slideImages() {
    images.forEach((img, index) => {
        img.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(slideImages, 3000);

// Read More Toggle
function toggleReadMore() {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("moreText");
    const btn = document.getElementById("readMoreBtn");

    if (dots.style.display === "none") {
        // Show less
        dots.style.display = "inline";
        moreText.style.display = "none";
        btn.textContent = "Read More";
    } else {
        // Show more
        dots.style.display = "none";
        moreText.style.display = "inline";
        btn.textContent = "Read Less";
    }
}


document.getElementById("register-link").addEventListener("click", function (event) {
    event.preventDefault();
    let target = document.getElementById("register-grievance");
    let headerOffset = 100; // Adjust this value if needed
    let elementPosition = target.getBoundingClientRect().top + window.scrollY;
    let offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href").substring(1); // Get the target ID
            const targetElement = document.getElementById(targetId);
            // document.querySelector(".alert-success").remove()
            if (targetElement) {
                event.preventDefault(); // Prevent default jump
                targetElement.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
            }
        });
    });
});

// Function to generate random captcha
function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.querySelector(".captcha-code").innerText = captcha;
}

// Call the function on page load
window.onload = generateCaptcha;

// Refresh captcha when needed
document.getElementById("refresh-captcha").addEventListener("click", generateCaptcha);


//Function for fectching the status dynamically
document.getElementById("submitButton").addEventListener("click", async function () {
    // Get user input
    const regNo = document.getElementById("registerNumber").value;
    const password = document.getElementById("password").value;
    const enteredCaptcha = document.getElementById("captchaInput").value;

    // Dummy Captcha Check (Replace this with your backend validation)
    const correctCaptcha = "xYw4rS"; // This should be dynamic in production
    if (enteredCaptcha !== correctCaptcha) {
        alert("Incorrect Captcha! Try again.");
        return;
    }

    try {
        // Send request to backend to fetch complaint status
        const response = await fetch(`http://localhost:8000/app/getStatus?regNo=${regNo}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        // Check if the complaint exists
        if (data.status) {
            // Show status in the UI
            document.getElementById("statusText").innerText = data.status;
            document.getElementById("statusResult").style.display = "block"; // Show status section
        } else {
            alert("No complaint found for this Register Number!");
        }

    } catch (error) {
        console.error("Error fetching complaint status:", error);
        alert("Error fetching status. Please try again.");
    }
});



function getGrivanceStatus(event) {
    // event.preventDefault(); // Prevents form submission

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const data = {
        user_name: username,
        password: password
    }

    fetch('http://localhost:8000/app/grievancestatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((res) => {
            // console.log('res', res);
            if (res && res?.status && res.sucess) {
                // console.log('res', res);
                // alert(res?.status)
                const display = document.getElementById("status")
                let add = document.createElement("div")
                add.className = "alert alert-success"
                add.style.width = "400px"
                add.innerText =  res?.status
                display.appendChild(add)
                // document.getElementById("status").innerText = res?.status
                setTimeout(() => {
                    document.getElementById("status").innerText = ""
                    document.getElementById("status").removeChild(".alert-success")
                    // let add = document.createElement("div")
                    // add.className = "alert alert-success"
                    // display.appendChild(add)
                }, 10000);
                // toastr.error(res?.status, "");
            }
            else if (res && res?.status && !res.sucess) {
                toastr.error("Complaint not found", "");
            }
            else {
                //alert("please fill the fields");
                toastr.error("Complaint not found", "");
            }
            return
        }).catch((err) => {
            console.log('err', err);
        })

    // if (username === "deepa" && password === "1234") {
    // // Example credentials
    // alert("Login successful! Redirecting...");
    // window.location.href = "form.html"; // Redirect to another page
    // } else {
    // alert("Invalid username or password!");
    // }
}