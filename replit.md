# Login & Signup Demo - Architecture Guide

## Overview

This is a simple, beginner-friendly login and signup demonstration application built with Express.js and HTML forms. The project demonstrates basic user authentication concepts including user registration, duplicate username prevention, and login verification using an in-memory database (simulating Replit DB).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Overview
A simple authentication demo built with:
- **Backend**: Express.js with TypeScript
- **Frontend**: Plain HTML forms with inline CSS
- **Database**: In-memory object (simulating Replit DB)
- **Authentication**: Basic username/password validation (plain text for demo purposes)

### Project Structure
```
server/
├── index.ts         # Main Express server with all routes
├── vite.ts          # Vite configuration (retained for development)
└── storage.ts       # (Legacy file from previous project)
```

## Key Features

### Routes
- `GET /` - Home page with login and signup forms
- `POST /signup` - Handles user registration
- `POST /login` - Handles user authentication

### User Registration (Signup)
- Validates username availability
- Prevents duplicate usernames
- Stores username/password in memory
- Shows success or error message

### User Authentication (Login)
- Validates credentials against stored users
- Shows welcome message on success
- Shows error message on failure

### Security Notes
**⚠️ This is a demo application!**
- Passwords are stored in plain text (never do this in production)
- No session management or cookies
- No password hashing or encryption
- Data is lost when server restarts

## Code Comments

The code includes detailed comments explaining:
- How Express middleware works
- Form data parsing
- Route handling
- HTML response generation
- Basic validation logic

## Running the Application

1. Start the server: `npm run dev`
2. Visit `http://localhost:5000`
3. Try creating an account and logging in

## Learning Points

This demo teaches:
- Basic Express.js routing
- HTML form handling
- Simple validation logic
- Error/success messaging
- Server-side rendering with template strings

## Recent Changes

- **Jan 28, 2025**: Converted from NFT collection app to simple login/signup demo
- Removed all React/frontend framework code
- Simplified to plain HTML forms
- Added extensive beginner-friendly comments