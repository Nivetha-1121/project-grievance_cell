function handleLogin(event) {
    event.preventDefault(); // Prevents form submission

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") { 
        // Example credentials
        alert("Login successful! Redirecting...");
        window.location.href = "admin.html"; 
    } else {
        alert("Invalid username or password!");
    }
}

function togglePassword() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

function goHome() {
    window.location.href = "home.html"; 
}
