# BidWise — British Auction RFQ System

### Full-Stack MERN Application

A British Auction–style RFQ (Request for Quotation) platform where buyers create auctions and suppliers compete in real-time with automatic time extensions, live L1/L2/L3 rankings, and forced close protection.

---

## 🗂 Project Structure

```
BidWise/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── rfqController.js
│   │   ├── bidController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── RFQ.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── rfqRoutes.js
│   │   ├── bidRoutes.js
│   │   └── adminRoutes.js
│   ├── socket/
│   │   └── auctionSocket.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── common/
    │   │       └── Navbar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── SocketContext.jsx
    │   ├── hooks/
    │   │   └── useCountdown.js
    │   ├── pages/
    │   │   ├── AuthPage.jsx
    │   │   ├── LandingPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── RFQPage.jsx
    │   │   ├── RFQDetailPage.jsx
    │   │   └── AdminPage.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** v16+
- **MongoDB** v6+ (local or Atlas)
- **npm** v9+

---

## 🚀 Setup & Running Locally

### 1. Clone / Extract the project

```bash
cd BidWise
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Start Backend

```bash
npm run dev     # development (with nodemon)
# or
npm start       # production
```

Backend runs on: `http://localhost:5000`

### 4. Setup & Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🔐 Role-Based Access

| Role         | Capabilities                                              |
| ------------ | --------------------------------------------------------- |
| **Admin**    | Full system access, manage users, view all RFQs and stats |
| **Buyer**    | Create RFQs, configure auction rules, manage own auctions |
| **Supplier** | Browse active RFQs, place bids, view live rankings        |

---

## 🏗 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (React)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ AuthPage │ │ HomePage │ │ RFQPage  │ │ AdminPage │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│         │            │            │             │        │
│    AuthContext   SocketContext  Hooks         api.js    │
└─────────────────────────────────────────────────────────┘
          │ HTTP REST              │ Socket.IO
          ▼                        ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js)                    │
│  ┌────────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │   Routes   │  │ Middleware│  │   Socket Handler     │ │
│  │  /api/auth │  │  JWT auth │  │  auctionSocket.js    │ │
│  │  /api/rfq  │  │  RBAC     │  │  - rfq:join/leave   │ │
│  │  /api/bids │  └──────────┘  │  - rfq:extensionChk  │ │
│  │  /api/admin│               │  - bid:new           │ │
│  └────────────┘               └──────────────────────┘ │
│         │                                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Controllers                          │   │
│  │  authController  rfqController  bidController    │   │
│  │  adminController                                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│                  MongoDB (Mongoose)                      │
│  ┌────────┐       ┌────────┐       ┌────────┐          │
│  │  User  │       │  RFQ   │       │  Bid   │          │
│  │embedded│       │embedded│       │embedded│          │
│  │activity│       │auction │       │ quote  │          │
│  │  log   │       │config, │       │ranking │          │
│  │        │       │activity│       │        │          │
│  └────────┘       └────────┘       └────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 British Auction Extension Flow

```
1. Supplier places a bid
2. Backend checks: Is current time within Trigger Window (X min before close)?
3. If YES → check Extension Trigger type:
   a. bid_received → always extend
   b. rank_change  → extend only if any ranking changed
   c. l1_change    → extend only if L1 (lowest bidder) changed
4. If trigger fires:
   → New Close Time = Current Close Time + Extension Duration (Y min)
   → BUT: New Close Time ≤ Forced Close Time (hard limit)
5. Emit socket event to all connected clients: time extended
6. Log the extension in RFQ activity log with reason
7. Repeat for every subsequent bid in the new window
```

---

## 🗄 MongoDB Schema Summary

### User

Embedded: `activityLog`

### RFQ

Embedded: `auctionConfig` (triggerWindow, extensionDuration, extensionTrigger), `item`, `invitedSuppliers`, `activityLog`, `winner`

### Bid

Embedded: `quote` (bidAmount, totalAmount auto-calculated, supplierNote, transitTime, remarks)
Tracked: `rankAtTime`, `changedL1`, `changedRank`

---

## 📡 API Reference

### Auth

| Method | Endpoint           | Access    |
| ------ | ------------------ | --------- |
| POST   | /api/auth/register | Public    |
| POST   | /api/auth/login    | Public    |
| GET    | /api/auth/me       | Protected |
| PUT    | /api/auth/profile  | Protected |

### RFQ

| Method | Endpoint              | Access       |
| ------ | --------------------- | ------------ |
| POST   | /api/rfq/create       | Buyer, Admin |
| GET    | /api/rfq/list         | Protected    |
| GET    | /api/rfq/:id          | Protected    |
| PUT    | /api/rfq/:id/status   | Buyer, Admin |
| GET    | /api/rfq/:id/activity | Protected    |

### Bids

| Method | Endpoint            | Access          |
| ------ | ------------------- | --------------- |
| POST   | /api/bids/place     | Supplier, Admin |
| GET    | /api/bids/:rfqId    | Protected       |
| GET    | /api/bids/my/:rfqId | Protected       |

### Admin

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| GET    | /api/admin/stats     | Admin  |
| GET    | /api/admin/users     | Admin  |
| PUT    | /api/admin/users/:id | Admin  |
| GET    | /api/admin/rfqs      | Admin  |

---

## 🔌 Socket.IO Events

### Client → Server

| Event                | Payload     | Description                   |
| -------------------- | ----------- | ----------------------------- |
| `rfq:join`           | `{ rfqId }` | Join RFQ live bidding channel |
| `rfq:leave`          | `{ rfqId }` | Leave RFQ channel             |
| `rfq:extensionCheck` | `{ rfqId }` | Check for auction extension   |

### Server → Client

| Event                | Payload                             | Description            |
| -------------------- | ----------------------------------- | ---------------------- |
| `bid:new`            | `{ bid, allBids, extensionResult }` | New bid placed         |
| `rfq:userJoined`     | `{ user }`                          | User joined RFQ        |
| `rfq:extensionAlert` | `{ rfqId, message }`                | Extension notification |
| `rfq:statusChanged`  | `{ status }`                        | RFQ status update      |

---

## 🎨 UI Pages

| Page           | URL        | Description                                  |
| -------------- | ---------- | -------------------------------------------- |
| Landing        | `/`        | Platform overview with feature highlights    |
| Login/Register | `/login`   | Authentication with role selection           |
| Home           | `/home`    | Dashboard with RFQ stats and active auctions |
| RFQ List       | `/rfq`     | All RFQs with filtering                      |
| RFQ Detail     | `/rfq/:id` | Live bids, L1/L2/L3 rankings, activity log   |
| Admin          | `/admin`   | User management, system stats                |

---

## 🎯 Key Features

- ✅ British Auction with 3 trigger types (bid received / rank change / L1 change)
- ✅ Configurable trigger window (X minutes) and extension duration (Y minutes)
- ✅ Auto auction extension capped at forced close time
- ✅ Real-time bidding via Socket.IO (WebSockets)
- ✅ Live L1/L2/L3 supplier ranking with instant updates
- ✅ Live countdown timers (bid close + forced close)
- ✅ Role-based access control (Admin / Buyer / Supplier)
- ✅ RFQ activity log (bids, extensions, rank changes with timestamps)
- ✅ Forced close time — hard deadline that cannot be extended past
- ✅ Admin dashboard with user and RFQ management
- ✅ Embedded MongoDB data models (no separate collections for config/logs)
- ✅ JWT authentication with protected routes

---

## 🔧 Tech Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Frontend  | React 18, React Router v6, Socket.IO Client |
| Styling   | Custom CSS (CSS Variables design system)    |
| Backend   | Node.js, Express.js                         |
| Database  | MongoDB, Mongoose ODM                       |
| Real-time | Socket.IO                                   |
| Auth      | JWT (jsonwebtoken + bcryptjs)               |
| Fonts     | Bebas Neue, DM Sans, DM Mono                |
