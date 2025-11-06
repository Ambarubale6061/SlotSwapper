# SlotSwapper

## Overview

Enhanced version of SlotSwapper with FullCalendar integration, modal animations, and day detail view.

### Features

- FullCalendar with interactive weekly/monthly view
- Framer Motion animated modals
- TailwindCSS polished UI
- Toast notifications for swaps
- Works seamlessly with MongoDB backend (JWT + Mongoose)

## Setup Instructions

### Backend

```bash
cd backend
cp .env.example .env  # Update MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env  # Update VITE_API_URL=http://localhost:4000
npm install
npm run dev
```

### Run tests

```bash
cd backend
npm test
```

Enjoy!
