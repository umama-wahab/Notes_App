# NoteFlow — Notes Management System

A full-stack MERN application for managing personal notes with JWT authentication, dark/light theme, and a responsive UI.

---

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS, React Router, Axios, React Hot Toast, React Icons  
**Backend:** Node.js, Express.js, JWT, bcryptjs  
**Database:** MongoDB Atlas + Mongoose

---

## Project Structure

```
notes-app/
├── server/          # Express API
│   ├── config/      # Database connection
│   ├── controllers/ # Route handlers
│   ├── middleware/  # Auth middleware
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   └── server.js
└── client/          # React app
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

---

## Quick Start

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

**Server** — create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/notesapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

**Client** — create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

```bash
# Terminal 1 — start API server
cd server
npm run dev

# Terminal 2 — start React app
cd client
npm run dev
```

Visit: http://localhost:5173

---

## API Reference

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Notes (all require Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |
| GET | `/api/notes/search?q=` | Search notes |

---

## Features

- ✅ JWT Authentication (register, login, logout)
- ✅ Create, Read, Update, Delete notes
- ✅ Instant search (title & content)
- ✅ Light / Dark theme (persisted)
- ✅ Responsive layout (mobile / tablet / desktop)
- ✅ Pin & Favorite notes
- ✅ Sort notes (newest, oldest, title, updated)
- ✅ Stats dashboard (total, monthly, pinned)
- ✅ Profile management
- ✅ Toast notifications & loading states
- ✅ Delete confirmation modal
- ✅ Skeleton loading

---

## Deployment

### Backend → Render
1. Push `server/` to a repo
2. Create a new Web Service on Render
3. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
4. Build command: `npm install` / Start: `node server.js`

### Frontend → Vercel
1. Push `client/` to a repo
2. Import project on Vercel
3. Set `VITE_API_URL` to your Render backend URL
4. Deploy

### Database → MongoDB Atlas
1. Create a free cluster at mongodb.com/atlas
2. Create a database user
3. Whitelist IPs (or allow all: `0.0.0.0/0`)
4. Copy the connection string into `MONGO_URI`
