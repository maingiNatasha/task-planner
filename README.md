# Fullstack Auth Starter

A reusable, production-ready authentication starter designed to be used across multiple full-stack projects.

This repository focuses on clean architecture, secure authentication flows, and clear documentation, making it easy to plug authentication into future applications without reinventing the wheel.

---

## Project Goals

- Provide a reusable authentication module
- Implement secure, real-world auth flows
- Keep backend and frontend cleanly separated
- Serve as a starter template for future full-stack projects
- Be well-documented for long-term maintainability

---

## Tech Stack

### Backend (Implemented)
- Node.js
- Express.js
- MySQL
- JWT authentication
- bcrypt for password hashing

### Frontend
- React
- API-based authentication
- Token & session handling

---

## Architecture Overview

- RESTful API backend responsible for:
  - User registration & login
  - Password reset (forgot / reset flow)
  - Token-based authentication
- Frontend consumes the backend API
- Backend and frontend are maintained as separate, independent modules

---

## Quickstart

1. Install dependencies:
   - Backend: `cd backend` then `npm install`
   - Frontend: `cd frontend` then `npm install` (if using the UI)
2. Configure environment:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in database + JWT + SMTP values
3. Set up the database:
   - Apply schema from `backend/src/db/schema.sql`
4. Run services:
   - Backend: `npm run dev` (from `backend/`)
   - Frontend: `npm run dev` (from `frontend/`)
