# Lead Management System (Smart Leads)

A secure, multi-tenant lead management and tracking application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. 

The application implements full multi-user data isolation, meaning users can only view, create, edit, search, and export leads that they have registered/created themselves.

---

## Technical Features

* **Multi-User Data Isolation**: Every database query is scoped to the authenticated user's ID (`createdBy = req.user._id`), preventing data cross-leakage.
* **Dynamic Pipeline Statistics**: Live KPIs (Total Leads, New, Contacted, Qualified, and Qualified Conversion Rate) are dynamically calculated via MongoDB aggregations for the active session.
* **Debounced Search**: Typing queries into the fuzzy search input is buffered by 500ms using a custom React hook to prevent network flooding.
* **Isolated CSV Export**: Custom utility to download filtered, user-specific data into a standard CSV format securely.
* **Role-Based Access Control**: Clean JWT middleware protecting backend routes and supporting standard Sales User and Admin role workflows.

---

## Local Development Setup with Docker

The application is fully containerized. Persistent volumes ensure database state is saved locally, and bind-mount volumes are configured to enable hot-reloading (frontend HMR and backend auto-restart) when you modify the local files.

### Commands

1. **Start all services**:
   ```bash
   docker compose up --build
   ```
   This command installs dependencies, builds the Docker images, starts MongoDB, and launches the frontend and backend services.

2. **Access Points**:
   - **Frontend Interface**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000/api/v1`
   - **Local MongoDB**: `mongodb://localhost:27017/leaderboard`

3. **Stop all services**:
   ```bash
   docker compose down
   ```

---

## Port Mappings & Services

* **frontend**: Served on port `5173` (Nginx is used for production static serving, while Vite dev server with host binding is used in development for hot-reloading).
* **backend**: Runs on port `5000` (uses `ts-node-dev` in development to watch file changes).
* **db**: MongoDB instance running on port `27017` utilizing volume `mongo_data` for persistence.
