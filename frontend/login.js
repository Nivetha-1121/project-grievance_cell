function handleLogin(event) {
    event.preventDefault(); // Prevents form submission

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const data = {
        user_name: username,
        password: password
    }

    fetch('http://localhost:8000/app/getLoginData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((res) => {
            console.log('res', res);
            if (res.exists) {
                console.log('res', res);
                window.location.href = "form.html";
            } else {
                alert("Invalid username or password");
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