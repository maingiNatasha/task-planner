# Task Planner Backend API

Backend service for the Task Planner application.

This API handles:
- authentication
- password reset by email
- profile management
- authenticated task CRUD

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- express-validator
- cookie-parser
- cors

## Responsibilities

- Register and authenticate users
- Manage session/auth cookies
- Handle forgot/reset password flows
- Store and retrieve user profile data
- Create, read, update, and delete tasks
- Validate request payloads before controller logic

## Architecture

The backend follows a layered structure:

- `routes/`: endpoint definitions
- `controllers/`: request/response orchestration
- `services/`: business rules
- `models/`: database operations
- `middleware/`: auth + validation handling
- `validators/`: request schema rules
- `db/`: connection and schema assets
- `utils/`: shared helpers

## Folder Structure

```text
backend/
|-- src/
|   |-- controllers/
|   |-- db/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   |-- validators/
|   `-- app.js
|-- server.js
|-- package.json
`-- README.md
```

## API Base URL

Routes are mounted under:

- `/api`

## Endpoint Map

### Auth (`/api/auth`)

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /user` (protected)
- `POST /password/forgot`
- `POST /password/reset`

### Profile (`/api/profile`)

- `GET /` (protected)
- `POST /` (protected, create/update profile)

### Tasks (`/api/tasks`)

- `GET /` (protected)
- `POST /` (protected)
- `PATCH /:id` (protected)
- `DELETE /:id` (protected)
- `DELETE /` (protected, bulk delete)

## Authentication Model

- Protected routes use `authMiddleware`.
- Frontend and backend are configured for credentialed requests.
- CORS `origin` is read from `FRONTEND_URL`.

## Password Reset Flow

1. Client calls `POST /api/auth/password/forgot` with email.
2. Server generates a reset token and stores a hashed token with expiry.
3. Reset link is sent via SMTP.
4. Client submits `token + new password` to `POST /api/auth/password/reset`.
5. Server validates token, updates password, and invalidates token.

Security behavior:
- Forgot-password responses are generic to reduce account enumeration.
- Passwords are hashed before storage.

## Environment Variables

Create `backend/.env` and provide values for your environment.

Common variables used by this backend:

- `PORT`
- `FRONTEND_URL`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `RESET_TOKEN_EXPIRES_MINUTES`
- `FRONTEND_RESET_URL`
- `APP_NAME`
- `APP_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM_NAME`
- `EMAIL_FROM_ADDRESS`

Do not commit `.env`.

## Database

Apply schema from:

- `src/db/schema.sql`

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Configure `backend/.env`.

3. Apply database schema.

4. Run dev server:

```bash
npm run dev
```

Default server port is `5000` when `PORT` is not set.

## Scripts

- `npm run dev`: start with nodemon
- `npm test`: placeholder (if tests are not configured)

## Notes

- Validation middleware is applied on auth, profile, and task mutation endpoints.
- Profile write endpoint is `POST /api/profile` (not `PUT`).
- API route prefixes include `/api` from app-level mounting.
