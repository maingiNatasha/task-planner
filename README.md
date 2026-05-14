# Task Planner

Task Planner is a full-stack productivity app for managing personal tasks with secure authentication, profile management, and a protected task API.

## What This Project Includes

- `backend/`: Express + MySQL API
- `frontend/`: React + Vite client

The architecture is intentionally split so the API and UI can evolve independently.

## Features

- Authentication:
  - Register
  - Login / logout
  - Current-session user lookup
  - Forgot-password and reset-password flows
- Profile:
  - Retrieve authenticated user profile
  - Create or update profile details
- Tasks:
  - List tasks
  - Create tasks
  - Update tasks
  - Delete a single task
  - Bulk delete tasks

## Stack

Backend:
- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- express-validator

Frontend:
- React
- Vite
- React Router
- Axios
- Tailwind CSS

## Repository Layout

```text
task-planner/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- services/
|   |   `-- validators/
|   |-- server.js
|   `-- README.md
|-- frontend/
|   |-- src/
|   `-- README.md
`-- README.md
```

## Getting Started

1. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Configure environment:
- Create `backend/.env`
- Set database, JWT, SMTP, and app/frontend values
- (Optional) set `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Initialize database:
- Apply `backend/src/db/schema.sql` to your MySQL instance

4. Run both apps:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Surface

Base prefix: `/api`

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/user`
- `POST /api/auth/password/forgot`
- `POST /api/auth/password/reset`

Profile:
- `GET /api/profile`
- `POST /api/profile`

Tasks:
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `DELETE /api/tasks`

## Notes

- Backend CORS uses `FRONTEND_URL` with credentials enabled.
- Frontend API requests use credentialed cookie auth.
- Validation middleware is enforced across auth, profile, and task routes.

## More Documentation

- Backend guide: `backend/README.md`
- Frontend guide: `frontend/README.md`
