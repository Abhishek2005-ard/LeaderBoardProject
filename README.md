# Smart Leads

A MERN stack lead tracking system built with TypeScript. It implements complete multi-user data isolation, so users can only see, create, edit, search, and export their own leads.

## Local Setup (Docker)

To start the entire stack (frontend, backend, and local MongoDB):

```bash
docker compose up --build
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1
- **Local DB**: mongodb://localhost:27017/leaderboard

To stop all services:
```bash
docker compose down
```

## Features

* **Data Isolation**: All database queries are filtered by your logged-in user ID (`createdBy`). You cannot view or modify other users' leads.
* **Stats Cards**: Displays Total Leads, New, Contacted, Qualified, and Conversion Rate dynamically based on your leads.
* **Debounced Search**: Search input has a 500ms debounce buffer using a custom React hook so it doesn't spam backend requests.
* **CSV Export**: Securely downloads a CSV file containing your leads.
* **Auth**: Middleware using JWT to protect routes and handle Sales User / Admin roles.

## Ports and Development

* **Frontend**: 5173 (uses Vite dev server for HMR; served via Nginx in production).
* **Backend**: 5000 (runs with ts-node-dev for automatic restart on file edits).
* **db**: 27017 (MongoDB using `mongo_data` docker volume for persistence).
