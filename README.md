# MERN Authentication System with Silent Refresh 🔐


A production-ready, highly secure authentication system built with the MERN stack (MongoDB, Express, React, Node.js). This project implements the **"Silent Refresh"** token strategy to provide a seamless user experience while maintaining high security standards.

## ✨ Key Features

-   **Silent Refresh Strategy**: Automatically updates Access Tokens in the background without user intervention.
-   **Security First**:
    -   **HTTP-Only Cookies**: Refresh Tokens are stored in secure, HTTP-Only cookies to prevent XSS.
    -   **Token Rotation**: Every refresh cycle issues a new pair of tokens, invalidating the old ones.
    -   **JWT Authentication**: Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d).
    -   **Password Hashing**: Uses BcryptJS with 10 salt rounds.
    -   **Zod Validation**: Strict request body validation on the backend.
    -   **Helmet & CORS**: Hardened HTTP headers and secure cross-origin configuration.
-   **Premium UI/UX**:
    -   Modern **Glassmorphism** design using Tailwind CSS.
    -   Real-time form validation and loading states.
    -   **Axios Interceptors**: Intelligent handling of token expiration and retries.
    -   **React Context API**: Global authentication state management.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16+)
-   MongoDB (Local or Atlas)
-   npm or yarn

### Backend Setup

1.  Navigate to the server directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file (see `.env.example`)
4.  Start the server: `npm start` (or `node index.js`)

### Frontend Setup

1.  Navigate to the client directory: `cd client`
2.  Install dependencies: `npm install`
3.  Create a `.env` file (see `.env.example`)
4.  Start the development server: `npm run dev`

## 🛠️ Technical Flow

1.  **Login**: User submits credentials. Server verifies and issues an **Access Token** (body) and a **Refresh Token** (HTTP-Only Cookie).
2.  **Accessing Protected Routes**: The frontend attaches the Access Token to the `Authorization` header via an Axios request interceptor.
3.  **Token Expiration**: When the Access Token expires, the server returns a 401.
4.  **Silent Refresh**: The Axios response interceptor detects the 401, calls `/auth/refresh`, receives a new token pair, and retries the original request.
5.  **Logout**: Clears the HTTP-Only cookie and removes the Refresh Token from the database.

## 📁 Project Structure

```text
/server
  /config      - JWT and DB configuration
  /controllers - Auth logic (Register, Login, Refresh)
  /middleware  - JWT verification (isAuth)
  /models      - User schema
  /routes      - API endpoints
/client
  /src/api     - Axios instance + Interceptors
  /src/context - Global Auth State
  /src/components - ProtectedRoute wrapper
  /src/pages   - Login, Signup, Dashboard
```

## 🛡️ Security Constraints
- **NO localStorage**: Access tokens are stored in-memory; Refresh tokens are in secure cookies.
- **CSRF Protection**: SameSite cookie attribute is set to `Strict`.
