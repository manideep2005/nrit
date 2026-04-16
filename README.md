# NRIT - College Management System

Full-stack college management web application with React frontend and Express backend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Framer Motion, Lucide React |
| Backend | Express 5, Node.js |
| Database | PostgreSQL (Neon) |
| Driver | pg |

## Project Structure

```
nrit/
├── src/                    # React frontend
│   ├── components/
│   │   ├── layout/         # Header, Sidebar
│   │   └── pages/         # Dashboard, Auth, Admin, Academic, etc.
│   ├── services/
│   │   └── apiClient.js  # API client (simulated)
│   ├── hooks/
│   │   └── useFetchData.js
│   └── App.jsx
├── server/                 # Express backend
│   ├── index.js          # Server entry point
│   ├── db.js            # PostgreSQL connection pool
│   ├── migrate.js       # Database migration script
│   ├── schema.sql       # SQL schema definitions
│   ├── .env            # Environment variables
│   └── package.json
└── package.json          # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)

### Frontend Setup

```bash
cd nrit
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
```

Configure environment variables in `server/.env`:
```
DATABASE_URL=postgresql://...
PORT=5000
```

Run database migrations:
```bash
node migrate.js
```

Start the server:
```bash
node index.js
```

## Pages & Features

| Route | Component | Role |
|------|-----------|------|
| `/` | Dashboard | All |
| `/auth` | Auth | All |
| `/role-selection` | RoleSelection | All |
| `/admin` | Admin | Admin |
| `/academic` | Academic | Staff |
| `/admissions` | Admissions | Staff |
| `/finance` | Finance | Staff |
| `/staff` | Staff | Staff |
| `/campus` | Campus | Student |
| `/careers` | Careers | Student |
| `/comm` | Comm | Student |
| `/intelligence` | Intelligence | Student |
| `/welfare` | Welfare | Student |

## Database Schema

### Tables

- **students**: Student records (id, name, email, cgpa, attendance)
- **courses**: Course catalog (id, title, credits, instructor)
- **enrollments**: Student-course mappings

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Environment Variables

### Frontend (.env)
```
(Frontend runs on Vite dev server)
```

### Backend (.env)
```
DATABASE_URL=postgresql://neondb_owner:...
PORT=5000
```

## Available Scripts

```bash
# Frontend
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint

# Backend
node index.js   # Start server
node migrate.js # Run migrations
```

## Notes

- The API client (`src/services/apiClient.js`) currently uses simulated data with delays
- To connect to the real backend, replace simulated methods with `fetch()` or `axios()` calls
- Database uses Neon PostgreSQL with SSL required