# 🛒 E-Commerce Backend API

A complete backend for an **E-Commerce application** built with **Node.js, Express, MongoDB**, featuring **cart, orders, admin management, Razorpay payments**, and **Swagger API documentation**.

---

## 🚀 Features

### 👤 User

* User management
* User-specific cart
* Address management
* Order placement & order history

### 🛒 Cart

* Get cart by username
* Increment / Decrement / Remove cart items
* Save full cart
* Clear cart after checkout

### 📦 Orders

* Create order (COD / Razorpay)
* Fetch orders by user
* Admin fetch all orders
* Admin update order status
* Admin delete orders

### 👮 Admin

* Admin dashboard analytics
* Manage users
* Delete user with cascading cleanup:

  * Cart
  * Orders
  * Address
* Manage all orders

### 💳 Payments

* Razorpay order creation
* Razorpay payment verification
* Secure signature validation
* Auto clear cart after successful payment

### 📄 API Documentation

* Swagger UI for all APIs
* File upload support
* JWT-ready security structure

---

## 🧱 Tech Stack

### Frontend
- React
- Redux Toolkit
- Redux Thunk
- Material UI

### Backend
* Node.js
* Express.js
* MongoDB + Mongoose
* Swagger (OpenAPI 3.0)
* Razorpay
* JWT (Admin/Auth ready)
* Multer (Image upload)
  
### Payments
- Razorpay

### Tools
- JWT Authentication
- Multer (Image Upload)
---

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   └── Address.js
│
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── addressRoutes.js
│   ├── paymentRoutes.js
│   ├── adminRoutes.js
│   ├── adminUserRoutes.js
│   └── adminDashboardRoutes.js
│
├── middleware/
│   ├── adminAuth.js
│   └── upload.js
│
├── swagger/
│   └── swagger.js
│
├── uploads/
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## ▶️ Running the Project

### Install dependencies

```bash
npm install
```

### Start server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 📘 Swagger API Documentation

Swagger UI is enabled for **all routes**.

Open in browser:

```
http://localhost:5000/api-docs
```

Features:

* Test APIs directly
* Upload images (multipart/form-data)
* View request & response schemas
* JWT Authorize button (for admin APIs)

---

## 🔐 Authentication & Authorization

* Admin routes are protected using `adminAuth` middleware
* JWT-based authentication structure is ready
* Swagger supports Bearer Token authorization

---

## 🛍️ Order Flow

1. User adds items to cart
2. User selects payment method:

   * COD → Direct order creation
   * Razorpay → Payment gateway
3. On successful payment:

   * Order is saved
   * Cart is cleared automatically

---

## 📊 Admin Dashboard Analytics

Admin dashboard API provides:

* Monthly user growth
* Monthly orders count
* Product distribution by category

Used for charts in admin panel.

---

## 🧹 Data Integrity Rules

* Admin users **cannot be deleted**
* Deleting a user also deletes:

  * Cart
  * Orders
  * Address
* Cart auto-clears after successful order

---

## ✅ API Modules Covered

| Module              | Status |
| ------------------- | ------ |
| Products            | ✅      |
| Cart                | ✅      |
| Orders              | ✅      |
| Address             | ✅      |
| Payments (Razorpay) | ✅      |
| Admin Users         | ✅      |
| Admin Orders        | ✅      |
| Admin Dashboard     | ✅      |
| Swagger Docs        | ✅      |

---

## 📌 Future Improvements

* Role-based access (Admin / Staff / User)
* Refresh tokens
* Order invoice generation
* Pagination & filtering
* Redis caching
* Deployment-ready Swagger JSON

---

## 👨‍💻 Author

E-Commerce Backend Project
Built with ❤️ using Node.js, Express & MongoDB
