# Task Planner Frontend

React client for the Task Planner application.

This frontend handles authentication UX, protected routing, profile/session-aware navigation, and task-facing user flows via the backend API.

## Stack

- React 19
- Vite 7
- React Router 7
- Axios
- Tailwind CSS 4
- React Toastify

## What It Does

- Registration, login, logout, and session restore
- Protected routes with auth guards
- Forgot-password and reset-password flows
- Global toast feedback for success/error states
- Centralized API client with normalized error handling

## Prerequisites

- Node.js 18+
- npm
- Running backend API

Default API base fallback:

- `http://localhost:5000/api`

## Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Configure environment in `frontend/.env` or `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

`src/api/client.js` reads this value for Axios `baseURL`.

## Scripts

- `npm run dev`: start local dev server
- `npm run build`: create production bundle
- `npm run preview`: preview production build
- `npm run lint`: run ESLint

## App Structure

Startup flow:

- `src/main.jsx`: mounts `BrowserRouter` + `AuthProvider` + `App`
- `src/App.jsx`: route table and global `ToastContainer`

Auth layer:

- `src/auth/AuthContext.jsx`: auth context
- `src/auth/AuthProvider.jsx`: auth state + actions
- `src/auth/useAuth.js`: safe context hook
- `src/auth/RequireAuth.jsx`: route guard
- `src/auth/authEvents.js`: unauthorized event channel

Networking:

- `src/api/client.js`: shared Axios instance + interceptor
- `src/api/auth.js`: auth endpoint wrappers

Routing helper:

- `src/routes/HomeRedirect.jsx`: root redirect logic

## Routes

Defined in `src/App.jsx`:

- `/` -> `HomeRedirect`
- `/login` -> public
- `/register` -> public
- `/forgot-password` -> public
- `/reset-password` -> public
- `/home` -> protected
- `*` -> `NotFound`

## Core Behavior

Session restore:

1. `AuthProvider` boots with `loading = true`.
2. Calls `refreshUser()` (`GET /api/auth/user`).
3. Hydrates `user` when session is valid; otherwise clears it.
4. Turns off loading and allows route decisions.

Auth operations:

- Login calls `POST /api/auth/login`, then re-fetches current user.
- Register calls `POST /api/auth/register`, then redirects to login.
- Logout calls `POST /api/auth/logout`, then clears local auth state.

Password recovery:

- Forgot password: `POST /api/auth/password/forgot`.
- Reset password: `POST /api/auth/password/reset` with `?token=` flow.

Unauthorized handling:

- Axios interceptor normalizes API errors.
- Relevant `401` responses trigger one coordinated auth event.
- Provider clears stale session and redirects to `/login` when needed.

## Backend Contract

Expected backend endpoints (mounted under `/api`):

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/user`
- `POST /api/auth/password/forgot`
- `POST /api/auth/password/reset`

Backend requirements:

- Credentialed cookie auth support
- CORS configured for frontend origin with credentials
- Consistent JSON error responses

## Troubleshooting

If auth or session behavior fails:

1. Verify `VITE_API_BASE_URL`.
2. Verify backend CORS origin + credentials settings.
3. Confirm browser cookie acceptance.
4. Inspect normalized API error payloads (`status`, `message`, `data`).
5. Confirm reset token exists in `/reset-password?token=...`.
