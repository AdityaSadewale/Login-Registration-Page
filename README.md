Full-Stack Login & Registration System
A robust authentication system built using the MERN Stack (MongoDB, Express, React, Node.js). This project features a modern UI/UX for user onboarding, secure password handling, and a protected dashboard for authenticated users.

🚀 Features
User Authentication: Secure Sign-up and Login functionality.

Protected Routes: Dashboard access restricted to authorized users only.

Modern UI: Responsive design built with React and custom CSS.

Secure Backend: Password hashing and secure API communication.

Form Validation: Client-side and server-side checks for data integrity.

🛠️ Tech Stack
Frontend:

React.js

CSS3 (Custom styling)

Fetch API for backend communication

Backend:

Node.js & Express.js

MongoDB (Database)

Zod (Schema validation)

📁 Project Structure
Plaintext
├── client/           # React frontend
│   ├── src/
│   │   ├── api/      # API configurations
│   │   ├── pages/    # Login, Signup, and Dashboard components
│   │   └── index.css # Global styles
├── server/           # Express backend
│   ├── index.js      # Main server entry point
│   └── .env.example  # Template for environment variables
└── package.json      # Project dependencies
⚙️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/AdityaSadewale/Login-Registration-Page.git
cd Login-Registration-Page
Setup the Server:

Bash
cd server
npm install
Create a .env file in the server directory.

Add your PORT and MONGODB_URI.

Setup the Client:

Bash
cd ../client
npm install
Run the Application:

Start the backend: npm start (inside /server)

Start the frontend: npm start (inside /client)

📝 Future Enhancements
[ ] Integration of JWT (JSON Web Tokens) for persistent sessions.

[ ] Password reset functionality via email.

[ ] Google OAuth integration.

👤 Author
Aditya Sadewale

GitHub: @AdityaSadewale

Role: Full-Stack & AI Developer
