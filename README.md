<h1 align="center">🚖 UCAB — Urban Cab Booking System</h1>

<p align="center">
  A full-stack cab booking web application built with the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js).
  <br/>
  Supports three roles: <strong>User</strong>, <strong>Driver</strong>, and <strong>Admin</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)

---

## 🧾 About the Project

**UCAB** is a full-featured urban cab booking platform where:
- **Users** can browse available cabs, book rides, and track their booking history.
- **Drivers** can register and log in to manage their availability.
- **Admins** can manage all users, drivers, cabs, and bookings from a dedicated dashboard.

The system supports real-time ride management with status tracking (`pending → accepted → ongoing → completed`), Google Maps integration for pickup/drop-off locations, and image upload for cab listings.

---

## ✨ Features

### 👤 User
- Register & Login with JWT authentication
- Browse available cabs by type (Sedan, SUV, etc.)
- Book a cab with pickup & drop-off location (Google Maps autocomplete)
- View & manage personal booking history
- Fare estimation based on distance

### 🚗 Driver
- Driver Registration & Login
- Dedicated driver portal

### 🛡️ Admin
- Secure Admin Register & Login
- **User Management** — View, edit, and delete users
- **Cab Management** — Add, edit, delete cab listings with image upload
- **Booking Management** — View all bookings across the platform
- Dashboard with overview stats

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Frontend     | React 19, Vite, TailwindCSS, Bootstrap 5        |
| Routing      | React Router DOM v7                             |
| HTTP Client  | Axios                                           |
| Maps         | Google Maps API (`@react-google-maps/api`)      |
| Backend      | Node.js, Express.js 5                           |
| Database     | MongoDB, Mongoose                               |
| Auth         | JWT (`jsonwebtoken`), bcryptjs                  |
| File Upload  | Multer                                          |
| Charts       | Recharts                                        |
| Dev Tools    | Nodemon, ESLint                                 |

---

## 📁 Project Structure

```
UCAB Mern stack/
├── backend/
│   ├── controllers/         # Business logic for each feature
│   ├── db/                  # MongoDB connection config
│   ├── middlewares/         # Auth middleware (JWT verification)
│   ├── models/              # Mongoose schemas
│   │   ├── AdminSchema.js
│   │   ├── CarSchema.js
│   │   ├── DriverSchema.js
│   │   ├── MyBookingSchema.js
│   │   ├── PaymentSchema.js
│   │   ├── RideSchema.js
│   │   └── UserSchema.js
│   ├── routes/              # Express route definitions
│   │   ├── adminRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── carRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/             # Uploaded cab images (served as static)
│   ├── server.js            # Express app entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # Shared components (Home, etc.)
    │   ├── pages/
    │   │   ├── Admin/       # Admin dashboard pages
    │   │   │   ├── Alogin.jsx
    │   │   │   ├── Aregister.jsx
    │   │   │   ├── Ahome.jsx
    │   │   │   ├── Acabs.jsx
    │   │   │   ├── AcabEdit.jsx
    │   │   │   ├── AddCar.jsx
    │   │   │   ├── Booking.jsx
    │   │   │   └── User/    # Admin user management
    │   │   ├── Driver/      # Driver portal
    │   │   │   ├── Dlogin.jsx
    │   │   │   └── Dregister.jsx
    │   │   └── User/        # User-facing pages
    │   │       ├── Login.jsx
    │   │       ├── Register.jsx
    │   │       ├── Uhome.jsx
    │   │       ├── Cabs.jsx
    │   │       ├── BookCab.jsx
    │   │       └── MyBooking.jsx
    │   ├── App.jsx           # Routes configuration
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ucab-mern.git
cd ucab-mern
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory (see [Environment Variables](#-environment-variables)).

```bash
npm run dev       # development with nodemon
# or
npm start         # production
```

The backend runs on **http://localhost:8000**

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📡 API Routes

### User Routes
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/register`        | Register a new user       |
| POST   | `/login`           | User login                |
| GET    | `/users`           | Get all users (admin)     |
| PUT    | `/useredit/:id`    | Edit user details         |
| DELETE | `/userdelete/:id`  | Delete a user             |

### Car Routes
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/cars`          | Get all cars          |
| POST   | `/addcar`        | Add a new car         |
| PUT    | `/caredit/:id`   | Edit car details      |
| DELETE | `/cardelete/:id` | Delete a car          |

### Booking Routes
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/book`          | Book a cab               |
| GET    | `/mybookings`    | Get bookings for a user  |
| GET    | `/bookings`      | Get all bookings (admin) |

### Driver Routes
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/dregister`      | Register a driver        |
| POST   | `/dlogin`         | Driver login             |

### Admin Routes
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/aregister`      | Register admin           |
| POST   | `/alogin`         | Admin login              |

---

## 🌐 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com) with a `vercel.json` configured to handle React Router client-side routing.
- **Backend**: Can be deployed to [Render](https://render.com), [Railway](https://railway.app), or any Node.js-compatible platform.

### Frontend `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 👨‍💻 Author

**Ansh Rajput**  
📧 Connect on [GitHub](https://github.com/your-username)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
