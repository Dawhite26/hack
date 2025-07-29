import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite";

const app = express();

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory database (simulating Replit DB)
// In production, you would use the actual Replit DB
const users: { [username: string]: string } = {};

// Route: Home page with login and signup forms
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login & Signup Demo</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f0f0f0;
        }
        .container {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .form-section {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex: 1;
          min-width: 300px;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        h2 {
          color: #555;
          margin-bottom: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          font-weight: bold;
          color: #555;
        }
        input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
        .message {
          padding: 10px;
          margin: 10px 0;
          border-radius: 4px;
          text-align: center;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to the Login & Signup Demo</h1>
      
      <div class="container">
        <!-- Sign Up Form -->
        <div class="form-section">
          <h2>Sign Up</h2>
          <form action="/signup" method="POST">
            <div>
              <label for="signup-username">Username:</label>
              <input 
                type="text" 
                id="signup-username" 
                name="username" 
                required 
                placeholder="Choose a username"
              >
            </div>
            
            <div>
              <label for="signup-password">Password:</label>
              <input 
                type="password" 
                id="signup-password" 
                name="password" 
                required 
                placeholder="Choose a password"
              >
            </div>
            
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <!-- Login Form -->
        <div class="form-section">
          <h2>Login</h2>
          <form action="/login" method="POST">
            <div>
              <label for="login-username">Username:</label>
              <input 
                type="text" 
                id="login-username" 
                name="username" 
                required 
                placeholder="Enter your username"
              >
            </div>
            
            <div>
              <label for="login-password">Password:</label>
              <input 
                type="password" 
                id="login-password" 
                name="password" 
                required 
                placeholder="Enter your password"
              >
            </div>
            
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Route: Handle signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  
  // Check if username already exists
  if (users[username]) {
    // Username already taken
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
          }
          .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Signup Failed</h1>
        <div class="error">
          <p>Username "${username}" is already taken. Please choose a different username.</p>
        </div>
        <a href="/">← Back to Home</a>
      </body>
      </html>
    `);
    return;
  }
  
  // Save the new user (in real app, hash the password!)
  users[username] = password;
  
  // Success message
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Signup Successful</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          text-align: center;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          padding: 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>Signup Successful!</h1>
      <div class="success">
        <p>Welcome, ${username}! Your account has been created successfully.</p>
        <p>You can now login with your credentials.</p>
      </div>
      <a href="/">← Back to Home</a>
    </body>
    </html>
  `);
});

// Route: Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Check if user exists and password matches
  if (users[username] && users[username] === password) {
    // Login successful
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome ${username}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
          }
          .welcome {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            padding: 30px;
            border-radius: 4px;
            margin: 20px 0;
          }
          h1 {
            color: #155724;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="welcome">
          <h1>Welcome back, ${username}!</h1>
          <p>You have successfully logged in to your account.</p>
          <p>This is a simple demo, so there's not much to do here yet!</p>
        </div>
        <a href="/">← Logout</a>
      </body>
      </html>
    `);
  } else {
    // Login failed
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
          }
          .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Login Failed</h1>
        <div class="error">
          <p>Invalid username or password. Please try again.</p>
        </div>
        <a href="/">← Back to Home</a>
      </body>
      </html>
    `);
  }
});

(async () => {
  const server = createServer(app);

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[express] Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the login/signup forms`);
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
})();