require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

// Create Server
const server = http.createServer(async (req, res) => {
    if (req.method === "POST" && req.url === "/api/register") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const { username, password } = JSON.parse(body);

                if (!username || !password) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "All fields are required" }));
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ username, password: hashedPassword });
                await newUser.save();

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User registered successfully" }));
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Error registering user" }));
            }
        });
    } 

    else if (req.method === "POST" && req.url === "/api/login") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const { username, password } = JSON.parse(body);
                const user = await User.findOne({ username });

                if (!user || !(await bcrypt.compare(password, user.password))) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "Invalid credentials" }));
                }

                const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Login successful", token }));
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Server error" }));
            }
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

const port = 8000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
