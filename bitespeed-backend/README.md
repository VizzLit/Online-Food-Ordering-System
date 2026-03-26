# 🍔 BiteSpeed — Backend API

A fully featured REST API backend for the **BiteSpeed Online Food Ordering System**, built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Logging**: Morgan

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bitespeed
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Seed the Database

```bash
npm run seed
```

This creates **21 food items** across all categories and an **admin account**:
- 📧 Email: `admin@bitespeed.com`
- 🔑 Password: `Admin@123`

### 4. Start the Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 📁 Project Structure

```
src/
├── server.js                  ← Entry point
├── config/
│   └── db.js                  ← MongoDB connection
├── models/
│   ├── User.js
│   ├── FoodItem.js
│   ├── Cart.js
│   └── Order.js
├── controllers/
│   ├── authController.js
│   ├── foodController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── middleware/
│   ├── auth.js                ← JWT protect + adminOnly
│   └── errorHandler.js        ← Global error handler
└── utils/
    ├── generateToken.js
    └── seed.js
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### 🔐 Auth  `/api/auth`

| Method | Endpoint            | Access  | Description              |
|--------|---------------------|---------|--------------------------|
| POST   | `/register`         | Public  | Create a new account     |
| POST   | `/login`            | Public  | Login, get JWT token     |
| GET    | `/me`               | Private | Get own profile          |
| PUT    | `/me`               | Private | Update profile           |
| PUT    | `/change-password`  | Private | Change password          |

**Register body:**
```json
{
  "name": "Vedant",
  "email": "vedant@example.com",
  "password": "secret123",
  "phone": "9876543210"
}
```

**Login body:**
```json
{
  "email": "vedant@example.com",
  "password": "secret123"
}
```

**Login response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "_id": "...", "name": "Vedant", "role": "user" }
}
```

---

### 🍕 Foods  `/api/foods`

| Method | Endpoint        | Access       | Description              |
|--------|-----------------|--------------|--------------------------|
| GET    | `/`             | Public       | Get all foods (filterable)|
| GET    | `/categories`   | Public       | Get all categories       |
| GET    | `/:id`          | Public       | Get single food item     |
| POST   | `/`             | Admin only   | Create food item         |
| PUT    | `/:id`          | Admin only   | Update food item         |
| DELETE | `/:id`          | Admin only   | Delete food item         |

**Query params for GET /:**
```
?category=Biryani
?isVeg=true
?search=chicken
?minPrice=100&maxPrice=300
?sort=-rating
?page=1&limit=12
```

---

### 🛒 Cart  `/api/cart`

> All cart routes require `Authorization: Bearer <token>`

| Method | Endpoint          | Description                   |
|--------|-------------------|-------------------------------|
| GET    | `/`               | Get cart with totals          |
| POST   | `/`               | Add item (or increase qty)    |
| PUT    | `/:foodItemId`    | Set item quantity             |
| DELETE | `/:foodItemId`    | Remove item from cart         |
| DELETE | `/`               | Clear entire cart             |

**Add to cart body:**
```json
{
  "foodItemId": "64abc123...",
  "quantity": 2
}
```

**Cart response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "itemCount": 3,
    "subtotal": 597,
    "deliveryFee": 40,
    "total": 637
  }
}
```

---

### 📦 Orders  `/api/orders`

> Requires auth token

| Method | Endpoint          | Access     | Description              |
|--------|-------------------|------------|--------------------------|
| POST   | `/`               | Private    | Place order from cart    |
| GET    | `/my`             | Private    | Get my order history     |
| GET    | `/:id`            | Private    | Get single order         |
| PUT    | `/:id/cancel`     | Private    | Cancel an order          |
| GET    | `/`               | Admin only | Get all orders           |
| GET    | `/admin/stats`    | Admin only | Dashboard stats          |
| PUT    | `/:id/status`     | Admin only | Update order status      |

**Place order body:**
```json
{
  "deliveryAddress": {
    "street": "123 MG Road",
    "city": "Haldwani",
    "state": "Uttarakhand",
    "pincode": "263139"
  },
  "paymentMethod": "mock_upi",
  "notes": "Extra spicy please"
}
```

**Payment methods:** `mock_card` | `mock_upi` | `mock_cod`

**Order statuses:** `pending` → `confirmed` → `preparing` → `out_for_delivery` → `delivered`

---

### 🛡️ Admin  `/api/admin`

> Requires admin JWT token

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/users`              | List all users           |
| PUT    | `/users/:id/toggle`   | Activate/deactivate user |

---

## 🔑 Using Auth in Frontend

After login, store the token and send it with every private request:

```js
// Store token
localStorage.setItem("token", response.data.token);

// Send with requests
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
};

axios.get("/api/cart", config);
```

---

## 🌐 Connecting Frontend

In your React frontend, set the base URL:

```js
// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🧪 Health Check

```
GET http://localhost:5000/api/health
```

```json
{
  "success": true,
  "message": "🍔 BiteSpeed API is running!"
}
```
