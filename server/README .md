# Promptfy API

A RESTful API for Promptfy application with comprehensive user authentication including register, login, email verification, forgot password, and reset password functionality.

## Features

- User registration with email verification
- User login with JWT authentication
- Password reset functionality
- Role-based access control (User/Admin)
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/promptfy
   JWT_SECRET=your_jwt_secret_key
   JWT_LIFETIME=1d
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_password
   EMAIL_FROM=noreply@promptfy.com
   FRONTEND_URL=http://localhost:3000
   ```

4. Seed an admin user:

   ```bash
   npm run seed:admin
   ```

   or

   ```bash
   bun run seed:admin
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   bun run dev
   ```

### API Endpoints

#### Authentication

- **POST /api/v1/auth/register** - Register a new user
- **POST /api/v1/auth/verify-email** - Verify user email
- **POST /api/v1/auth/login** - Login with email and password
- **POST /api/v1/auth/forgot-password** - Request password reset
- **POST /api/v1/auth/reset-password** - Reset password with token
- **GET /api/v1/auth/me** - Get current user details (requires authentication)

## License

ISC
