# SlotSwapper

Full-Stack Peer-to-Peer Time Slot Scheduling Application

## Project Overview

SlotSwapper is a peer-to-peer calendar application that allows users to swap time slots efficiently. Users can mark their events as SWAPPABLE, view other users’ available slots, and request swaps. Once accepted, the events are exchanged automatically.

### Design Choices:

React + Vite for a modern, fast frontend.

Node.js + Express backend for API handling.

MongoDB database for scalable document-based storage.

JWT Authentication for secure session management.

FullCalendar integration for a rich, interactive calendar view.

Glassmorphic UI with neon-glow events for a high-end dashboard feel.

### Three-column layout:

Left: Sidebar for calendars and event creation

Center: Main calendar grid (week/day view)

Right: Task/event detail panel with live updates

## Folder Structure
SlotSwapper/
├── backend/
│   ├── models/         # Mongoose models (User, Event, SwapRequest)
│   ├── routes/         # API routes
│   ├── controllers/    # Logic for CRUD and swap handling
│   ├── middleware/     # JWT auth middleware
│   ├── index.js        # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── CalendarView.jsx
│   │   │   ├── TaskPanel.jsx
│   │   │   └── EventModal.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   └── package.json
└── README.md

### Setup Instructions 

1. Clone the Repository
git clone https://github.com/yourusername/SlotSwapper.git
cd SlotSwapper

2. Setup Backend
cd backend
npm install


Create a .env file in /backend:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>


Start backend server:

npm run dev

Server runs on http://localhost:5000

3. Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend runs on http://localhost:5173

Make sure backend is running for API calls to work.

### API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login user and return JWT
GET	/api/events	Get all events of logged-in user
POST	/api/events	Create a new event
PUT	/api/events/:id	Update an existing event
DELETE	/api/events/:id	Delete an event
GET	/api/swappable-slots	Get all swappable slots from other users
POST	/api/swap-request	Request a swap (mySlotId, theirSlotId)
POST	/api/swap-response/:id	Accept/Reject a swap request

All protected routes require Authorization: Bearer <JWT_TOKEN> header.

## Assumptions & Challenges

### Assumptions:

Each user can have multiple events but only one SWAPPABLE per time slot.

Swap requests automatically set the slots’ status to SWAP_PENDING.

Accepted swaps update owner IDs and statuses atomically.

### Challenges:

Ensuring atomic swap logic to prevent race conditions.

Integrating FullCalendar with dynamic state updates after swap.

Creating high-end UI that is responsive, visually appealing, and interactive.

### Future Enhancements

Real-time notifications using WebSockets.

Deployment to Vercel (frontend) and Render/Heroku (backend).

Unit and integration tests for backend APIs.

Multi-user calendar sharing and color-coded team calendars.

### Author: Ambar Ubale
