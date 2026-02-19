# Backend - Authentication API

This is the backend authentication service for the **Fullstack Auth Starter** project.

It provides a **secure, production-ready REST API** handling user authentication flows such as registration, login, and password recovery. The backend is designed to be **reusable**, **well-structured**, and **framework-agnostic** with respect to the frontend.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- bcrypt

---

## Responsibilities

The backend is responsible for:

- User registration
- User login
- Password hashing and verification
- Token-based authentication
- Password reset (forgot / reset flow)
- Database interaction and validation

---

## Architecture Overview

The backend follows a layered architecture with clear separation of concerns:

- **Routes** - Define API endpoints and map requests to controllers
- **Controllers** - Handle request/response logic
- **Services** - Contain core business logic
- **Models** - Handle database queries and persistence
- **Middleware** - Authentication and request validation
- **Validators** - Input validation schemas
- **Utils** - Shared helper functions
- **DB** - Database connection and configuration

This structure improves maintainability, testability, and reusability.

---

## Folder Structure
```
backend/
|-- src/
|   |-- controllers/ # Request handling logic
|   |-- routes/ # API route definitions
|   |-- services/ # Business logic
|   |-- models/ # Database queries
|   |-- middleware/ # Auth & validation middlewares
|   |-- db/ # Database connection & config
|   |-- validators/ # Request validation schemas
|   |-- utils/ # Helpers and utilities
|   `-- app.js # Express app setup
|
|-- server.js # Application entry point
|-- .env.example # Environment variable template
|-- package.json
`-- README.md
```
---

## Authentication Flow

### 1. Registration
- User submits registration details
- Password is hashed using bcrypt
- User record is stored in the database

### 2. Login
- User credentials are validated
- Password hash is compared
- JWT is issued on successful authentication

### 3. Protected Routes
- Client sends JWT in the `Authorization` header
- Token is verified via middleware
- Access is granted or denied accordingly

### 4. Password Reset
- User requests password reset
- Reset token is generated and stored
- User resets password using valid token
- Token is invalidated after use

---

## Email Scenario (Password Reset)

The password reset flow sends an email containing a one-time reset token:

1. `POST /auth/password/forgot` is called with the user's email.
2. The API generates a reset token, stores a hashed version in the database, and sets an expiry.
3. An email is sent via SMTP (see `.env` SMTP settings).
4. The user clicks the link in the email and submits a new password to `POST /auth/password/reset` along with the token.
5. The token is validated, the password is updated, and the token is marked used.

Notes:
- Email delivery currently uses a Mailtrap sandbox (development-only) until a production provider is configured.
- The API responds with success for unknown emails to avoid user enumeration.
- If SMTP fails, the API still returns success so attackers cannot probe for valid accounts.

Example Mailtrap sandbox settings (replace with your Mailtrap values):
```
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
```
You can find these credentials in your Mailtrap inbox under SMTP Settings.

Switching providers:
- Update `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` in `.env` to match your SMTP provider.
- Keep `EMAIL_FROM_NAME` and `EMAIL_FROM_ADDRESS` aligned with your provider's verified sender settings.

---

## Environment Variables

Create a `.env` file using `.env.example` as a reference.

| Variable | Description |
| --- | --- |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRES_IN` | JWT expiry (e.g., `15m`) |
| `RESET_TOKEN_EXPIRES_MINUTES` | Password reset token TTL (minutes) |
| `FRONTEND_RESET_URL` | Reset URL used in emails |
| `APP_NAME` | App display name |
| `APP_URL` | App base URL |
| `SMTP_HOST` | SMTP host |
| `SMTP_PORT` | SMTP port |
| `SMTP_SECURE` | Use TLS (`true`/`false`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password/app password |
| `EMAIL_FROM_NAME` | From name for emails |
| `EMAIL_FROM_ADDRESS` | From email address |

Never commit your `.env` file.

---

## Database Schema

The database schema is provided in:

- `src/db/schema.sql`

This file is generated using `mysqldump` and contains tables, indexes, and constraints only (no data).

---

## Quickstart

1. Install dependencies:
   `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env`
   - Fill in values listed above
3. Set up the database:
   - Apply `src/db/schema.sql`
4. Start the dev server:
   `npm run dev`

---

## Scripts

- `npm run dev` - Run the API with nodemon
- `npm test` - Placeholder (no tests configured)

---

## API Endpoints

Use `Authorization: Bearer <token>` for protected routes.

### Quick curl example

Register a user:

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"Passw0rd!\"}"
```

### Authentication
All routes are prefixed with `/auth`.

| Method | Endpoint                | Description |
|--------|-------------------------|------------|
| POST   | /auth/register          | Register a new user |
| POST   | /auth/login             | Authenticate a user |
| GET    | /auth/user              | Get current user |
| POST   | /auth/password/forgot   | Request password reset |
| POST   | /auth/password/reset    | Reset user password |

### Profile
All routes are prefixed with `/profile`.

| Method | Endpoint        | Description |
|--------|-----------------|------------|
| GET    | /profile        | Get authenticated user profile |
| PUT    | /profile        | Update authenticated user profile |

---

## Postman Collection

All API endpoints are documented and testable via Postman.

**Postman Collection:**
https://www.postman.com/natashamaingi/my-workspace/collection/27984211-9c21d450-0564-4363-b222-a90ae0d9c843/?action=share&creator=27984211&active-environment=27984211-a3483cb7-b307-4533-9550-5518a8bd2a7f

Import the collection into Postman to:
- Test authentication flows
- Explore available endpoints
- View request/response examples

> The collection includes authentication and profile endpoints.

---

## Security Considerations

- Passwords are never stored in plain text
- bcrypt is used for password hashing
- JWT secrets are stored securely in environment variables
- Protected routes require valid tokens
- Password reset tokens are time-limited

---

## Reusability

This backend is designed as a standalone authentication module and can be reused across different applications and architectures.
