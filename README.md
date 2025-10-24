
# Online Quiz Application (Frontend + Backend)

This repository contains a full working **Online Quiz Application** packaged as two folders:
- `frontend/` - React + Vite + Tailwind UI (colorful, themed)
- `backend/`  - Node.js + Express + MongoDB (API + admin endpoints)

You asked for a single-folder project (both frontend and backend), themed like your Phase 2 design.

## Quick Overview

### Backend
- Start with `cd backend && npm install`
- Create `.env` based on `.env.example`
- Run: `npm run dev` (uses nodemon)

### Frontend
- Start with `cd frontend && npm install`
- Run: `npm run dev` (Vite dev server)

### How to run both locally (recommended in two terminals)
1. Terminal 1:
   ```
   cd /path/to/online-quiz-app/backend
   npm install
   cp .env.example .env
   # Edit .env and set MONGO_URI
   npm run dev
   ```
2. Terminal 2:
   ```
   cd /path/to/online-quiz-app/frontend
   npm install
   npm run dev
   ```

The frontend calls the backend API at `http://localhost:5000` by default. If your backend is hosted elsewhere, update `frontend/.env` accordingly.

## Files included
- backend/: server, models, routes, sample seed script
- frontend/: Vite React app with Tailwind and components (Login, Dashboard, Quiz, Admin)
- .env.example files

## Notes
- This is a starter full-stack app generated automatically from the project phases you provided.
- For production deploy, build frontend (`npm run build`) and host on Vercel/Netlify, and host backend on Render/Heroku with MongoDB Atlas.
